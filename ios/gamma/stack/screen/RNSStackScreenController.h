#pragma once

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class RNSStackScreenComponentView;
@class RNSStackController;
@class RNSStackScreenHeaderCoordinator;

@interface RNSStackScreenController : UIViewController

@property (nonatomic, strong, readonly, nonnull) RNSStackScreenHeaderCoordinator *headerCoordinator;

- (instancetype)initWithComponentView:(RNSStackScreenComponentView *)componentView;

/**
 * Registers a view declared by a descendant `RNSZoomTransitionSourceComponentView` under its
 * `transitionTag`. A single screen may register several sources under different tags; pushing the
 * next screen zooms out of the source whose tag matches the pushed screen's
 * `zoomTransitionSourceTag` (iOS 18+). A `nil` tag is ignored.
 */
- (void)registerZoomTransitionSourceView:(UIView *)view forTag:(nullable NSString *)tag;

/**
 * Removes the registration for `tag`, but only if it currently points to `view`. Used when a
 * source's `transitionTag` changes, so the previous tag does not keep resolving to the same view.
 */
- (void)unregisterZoomTransitionSourceView:(UIView *)view forTag:(nullable NSString *)tag;

/**
 * Returns the source view registered under `tag`, or `nil` if `tag` is `nil`, no source is
 * registered under it, or the view has been deallocated.
 */
- (nullable UIView *)zoomTransitionSourceViewForTag:(nullable NSString *)tag;

@end

NS_ASSUME_NONNULL_END
