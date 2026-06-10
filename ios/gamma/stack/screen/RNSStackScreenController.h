#pragma once

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class RNSStackScreenComponentView;
@class RNSStackController;
@class RNSStackScreenHeaderCoordinator;

@interface RNSStackScreenController : UIViewController

@property (nonatomic, strong, readonly, nonnull) RNSStackScreenHeaderCoordinator *headerCoordinator;

/**
 * The view registered by a descendant `RNSZoomTransitionSourceComponentView`, if any.
 * When non-nil, pushing the next screen from this one zooms out of this view (iOS 18+).
 */
@property (nonatomic, weak, nullable, readonly) UIView *zoomTransitionSourceView;

- (instancetype)initWithComponentView:(RNSStackScreenComponentView *)componentView;

- (void)registerZoomTransitionSourceView:(UIView *)view;

@end

NS_ASSUME_NONNULL_END
