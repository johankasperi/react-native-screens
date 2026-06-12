import { NativeSyntheticEvent, ViewProps } from 'react-native';

export type OnDismissEventPayload = {
  isNativeDismiss: boolean;
};

export type EmptyEventPayload = Record<string, never>;

export type OnDismissEvent = NativeSyntheticEvent<OnDismissEventPayload>;

export type StackScreenActivityMode = 'detached' | 'attached';

export type StackScreenEventHandler = (
  event: NativeSyntheticEvent<EmptyEventPayload>,
) => void;

export type StackScreenProps = {
  children?: ViewProps['children'] | undefined;

  // Control
  activityMode: StackScreenActivityMode;
  screenKey: string;

  // Events
  onWillAppear?: StackScreenEventHandler | undefined;
  onDidAppear?: StackScreenEventHandler | undefined;
  onWillDisappear?: StackScreenEventHandler | undefined;
  onDidDisappear?: StackScreenEventHandler | undefined;

  onDismiss?: ((screenKey: string) => void) | undefined;
  onNativeDismiss?: ((screenKey: string) => void) | undefined;
  onNativeDismissPrevented?: StackScreenEventHandler | undefined;

  // Configuration
  preventNativeDismiss?: boolean | undefined;

  /**
   * When this screen is pushed, the transition zooms out of the `ZoomTransitionSource` on the
   * previous screen whose `transitionTag` equals this value. Lets several sources on one screen
   * push the same destination, each zooming from its own view. When undefined (or no source
   * matches), the default stack push transition is used. Requires iOS 18+; ignored on earlier
   * versions and other platforms.
   *
   * @platform ios
   */
  zoomTransitionSourceTag?: string | undefined;
};
