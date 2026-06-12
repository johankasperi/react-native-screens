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
  // The screen the source is registered with and the tag it is registered under, kept so we can
  // re-register if `transitionTag` changes after the initial registration.
  __weak RNSStackScreenComponentView *_Nullable _registeredStackScreen;
  NSString *_Nullable _registeredTag;
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
  _registeredStackScreen = nil;
  _registeredTag = nil;
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

  [stackScreen.controller registerZoomTransitionSourceView:self forTag:_transitionTag];
  _registeredStackScreen = stackScreen;
  _registeredTag = _transitionTag;
}

// Re-registers the source under the current `transitionTag` if it changed after the initial
// registration, clearing the previous tag so it no longer resolves to this view.
- (void)maybeReregisterAfterTagChange
{
  if (!_hasAttemptedRegistration) {
    return;
  }

  RNSStackScreenComponentView *stackScreen = _registeredStackScreen;
  if (stackScreen == nil) {
    return;
  }

  [stackScreen.controller unregisterZoomTransitionSourceView:self forTag:_registeredTag];
  [stackScreen.controller registerZoomTransitionSourceView:self forTag:_transitionTag];
  _registeredTag = _transitionTag;
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

  NSString *newTransitionTag = RCTNSStringFromStringNilIfEmpty(newComponentProps.transitionTag);
  BOOL tagChanged = !(_transitionTag == newTransitionTag || [_transitionTag isEqualToString:newTransitionTag]);
  _transitionTag = newTransitionTag;

  if (tagChanged) {
    [self maybeReregisterAfterTagChange];
  }

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
