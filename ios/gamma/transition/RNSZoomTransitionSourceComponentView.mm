#import "RNSZoomTransitionSourceComponentView.h"
#import "RNSStackScreenComponentView.h"
#import "RNSStackScreenController.h"

#import <React/RCTConversions.h>
#import <react/renderer/components/rnscreens/ComponentDescriptors.h>
#import <react/renderer/components/rnscreens/Props.h>

namespace react = facebook::react;

@implementation RNSZoomTransitionSourceComponentView {
  BOOL _hasAttemptedRegistration;
  NSString *_Nullable _transitionTag;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    [self initState];
  }
  return self;
}

#pragma mark - Private

- (void)initState
{
  [self resetProps];
  _hasAttemptedRegistration = NO;
}

- (void)resetProps
{
  static const auto defaultProps = std::make_shared<const react::RNSZoomTransitionSourceProps>();
  _props = defaultProps;
  _transitionTag = nil;
}

- (nullable RNSStackScreenComponentView *)findStackScreenAncestor
{
  UIView *superview = self.superview;
  while (superview != nil) {
    if ([superview isKindOfClass:RNSStackScreenComponentView.class]) {
      return static_cast<RNSStackScreenComponentView *>(superview);
    }
    superview = superview.superview;
  }
  return nil;
}

- (void)maybeRegisterWithStackScreenAncestor
{
  if (_hasAttemptedRegistration) {
    return;
  }
  _hasAttemptedRegistration = YES;

  RNSStackScreenComponentView *stackScreen = [self findStackScreenAncestor];
  if (stackScreen == nil) {
    return;
  }

  [stackScreen.controller registerZoomTransitionSourceView:self];
}

#pragma mark - Override

- (void)didMoveToWindow
{
  [super didMoveToWindow];
  [self maybeRegisterWithStackScreenAncestor];
}

#pragma mark - RCTComponentViewProtocol

- (void)updateProps:(const facebook::react::Props::Shared &)props
           oldProps:(const facebook::react::Props::Shared &)oldProps
{
  const auto &newComponentProps = *std::static_pointer_cast<const react::RNSZoomTransitionSourceProps>(props);

  _transitionTag = RCTNSStringFromStringNilIfEmpty(newComponentProps.transitionTag);

  [super updateProps:props oldProps:oldProps];
}

+ (BOOL)shouldBeRecycled
{
  return NO;
}

+ (react::ComponentDescriptorProvider)componentDescriptorProvider
{
  return react::concreteComponentDescriptorProvider<react::RNSZoomTransitionSourceComponentDescriptor>();
}

#pragma mark - Dynamic frameworks support

// Needed because of this: https://github.com/facebook/react-native/pull/37274
#ifdef RCT_DYNAMIC_FRAMEWORKS
+ (void)load
{
  [super load];
}
#endif // RCT_DYNAMIC_FRAMEWORKS

@end

Class<RCTComponentViewProtocol> RNSZoomTransitionSourceCls(void)
{
  return RNSZoomTransitionSourceComponentView.class;
}
