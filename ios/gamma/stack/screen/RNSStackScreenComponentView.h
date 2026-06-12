#pragma once

#import "RNSReactBaseView.h"
#import "RNSStackHeaderData.h"
#import "RNSStackScreenComponentEventEmitter.h"

NS_ASSUME_NONNULL_BEGIN

@class RNSStackScreenController;
@class RNSStackHostComponentView;
@class RNSStackHeaderConfigComponentView;

typedef NS_ENUM(int, RNSStackScreenActivityMode) {
  RNSStackScreenActivityModeDetached = 0,
  RNSStackScreenActivityModeAttached = 1,
};

@interface RNSStackScreenComponentView : RNSReactBaseView

@property (nonatomic, weak, readwrite, nullable) RNSStackHostComponentView *stackHost;
@property (nonatomic, strong, readonly, nonnull) RNSStackScreenController *controller;
@property (nonatomic) BOOL isNativelyDismissed;

@end

#pragma mark - Props

@interface RNSStackScreenComponentView ()

@property (nonatomic, strong, readonly, nullable) NSString *screenKey;
@property (nonatomic, readonly) RNSStackScreenActivityMode activityMode;

/**
 * When this screen is pushed, the transition zooms out of the source view registered on the
 * previous screen under a matching `transitionTag` (iOS 18+). `nil` matches an untagged source.
 */
@property (nonatomic, strong, readonly, nullable) NSString *zoomTransitionSourceTag;

@end

#pragma mark - Events

@interface RNSStackScreenComponentView ()

/**
 * Use returned object to emit appropriate React Events to Element Tree.
 */
- (nonnull RNSStackScreenComponentEventEmitter *)reactEventEmitter;

@end

NS_ASSUME_NONNULL_END
