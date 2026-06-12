import type { ViewProps } from 'react-native';

export interface ZoomTransitionSourceProps {
  children?: ViewProps['children'] | undefined;
  style?: ViewProps['style'] | undefined;

  /**
   * Identifies this source for tag-based matching with a destination. When a screen is pushed with
   * a `zoomTransitionSourceTag` equal to this value, the transition zooms out of this view. Lets
   * several sources on one screen push the same destination, each zooming from its own view.
   * Requires iOS 18+; ignored on earlier versions and other platforms.
   *
   * @platform ios
   */
  transitionTag: string;
}
