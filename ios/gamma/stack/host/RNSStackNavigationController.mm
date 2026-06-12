#import "RNSStackNavigationController.h"
#import "RNSLog.h"
#import "RNSStackOperation.h"
#import "RNSStackScreenController.h"
#import "RNSViewFrameChangeDelegate.h"
#import "React/RCTAssert.h"

@implementation RNSStackNavigationController {
  NSMutableArray<RNSPushOperation *> *_Nonnull _pendingPushOperations;
  NSMutableArray<RNSPopOperation *> *_Nonnull _pendingPopOperations;
}

- (instancetype)init
{
  if (self = [super init]) {
    _navigationBarCoordinator = [RNSStackNavigationBarCoordinator new];
    [_navigationBarCoordinator initializeNavigationBarOfNavigationController:self];
    [self initState];
  }
  return self;
}

- (void)initState
{
  _pendingPushOperations = [NSMutableArray array];
  _pendingPopOperations = [NSMutableArray array];
}

- (BOOL)hasPendingOperations
{
  return _pendingPushOperations.count > 0 || _pendingPopOperations.count > 0;
}

- (void)enqueuePushOperation:(nonnull RNSStackScreenComponentView *)stackScreen
{
  RNSPushOperation *operation = [[RNSPushOperation alloc] initWithScreen:stackScreen];
  [_pendingPushOperations addObject:operation];
}

- (void)enqueuePopOperation:(nonnull RNSStackScreenComponentView *)stackScreen
{
  RNSPopOperation *operation = [[RNSPopOperation alloc] initWithScreen:stackScreen];
  [_pendingPopOperations addObject:operation];
}

- (void)performContainerUpdateIfNeeded
{
  // NOTE: We consider UINavigationController.viewControllers to be part of
  // the internal state of our stack implementation and expect it to be
  // *synchronously* updated by UIKit while we perform our pop and push operations
  //
  // The assertions below work under this assumption

  if (![self hasPendingOperations]) {
    return;
  }

  for (RNSPopOperation *op in _pendingPopOperations) {
    UIViewController *controller = static_cast<UIViewController *>(op.stackScreen.controller);
    RCTAssert([self.viewControllers count] > 1, @"[RNScreens] Attempt to pop last screen from the stack");
    RCTAssert(self.topViewController == controller, @"[RNScreens] Attempt to pop non-top screen");
    [self popViewControllerAnimated:YES];
  }

  for (RNSPushOperation *op in _pendingPushOperations) {
    UIViewController *controller = static_cast<UIViewController *>(op.stackScreen.controller);
    [self maybeConfigureZoomTransitionForPushedController:controller
                                           fromController:self.topViewController
                                                  withTag:op.stackScreen.zoomTransitionSourceTag];
    [self pushViewController:controller animated:YES];
  }

  RCTAssert([self.viewControllers count] > 0, @"[RNScreens] Stack should never be empty after updates");

  [self dumpStackModel];

  [_pendingPopOperations removeAllObjects];
  [_pendingPushOperations removeAllObjects];
}

#pragma mark - Zoom transition

/**
 * If the pushed screen has a `zoomTransitionSourceTag` (`tag`) and the screen being pushed *from*
 * (`sourceController`) has a zoom transition source view registered under that tag, configure the
 * pushed controller to use UIKit's zoom transition out of that view. When `tag` is `nil` or no
 * source matches it, the default stack push transition is used. Available on iOS 18+; on older
 * versions this is a no-op and the default push animation is used.
 */
- (void)maybeConfigureZoomTransitionForPushedController:(UIViewController *)pushedController
                                         fromController:(nullable UIViewController *)sourceController
                                                withTag:(nullable NSString *)tag
{
  if (@available(iOS 18.0, *)) {
    if (tag == nil) {
      return;
    }

    if (![sourceController isKindOfClass:RNSStackScreenController.class]) {
      return;
    }

    RNSStackScreenController *sourceScreenController = static_cast<RNSStackScreenController *>(sourceController);
    if ([sourceScreenController zoomTransitionSourceViewForTag:tag] == nil) {
      return;
    }

    pushedController.preferredTransition = [UIViewControllerTransition
           zoomWithOptions:nil
        sourceViewProvider:^UIView *_Nullable(UIZoomTransitionSourceViewProviderContext *context) {
          UIViewController *resolvedSource = context.sourceViewController;
          if ([resolvedSource isKindOfClass:RNSStackScreenController.class]) {
            return [static_cast<RNSStackScreenController *>(resolvedSource) zoomTransitionSourceViewForTag:tag];
          }
          return nil;
        }];
  }
}

#pragma mark - Layout

- (void)viewDidLayoutSubviews
{
  [super viewDidLayoutSubviews];
  [_navigationBarFrameChangeDelegate viewFrameDidChange:self.navigationBar];
}

#pragma mark - Debug

- (void)dumpStackModel
{
  RNSLog(@"[RNScreens] StackContainer [%ld] MODEL BEGIN", self.view.tag);
  for (UIViewController *viewController in self.viewControllers) {
    RNSLog(@"[RNScreens] %@", static_cast<RNSStackScreenComponentView *>(viewController.view).screenKey);
  }
}

@end
