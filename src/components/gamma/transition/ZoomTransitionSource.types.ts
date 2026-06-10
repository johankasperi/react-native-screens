import type { ViewProps } from 'react-native';

export interface ZoomTransitionSourceProps {
  children?: ViewProps['children'] | undefined;
  style?: ViewProps['style'] | undefined;

  /**
   * Reserved for future tag-based matching between a source and a destination.
   * Currently ignored by the native side.
   *
   * @platform ios
   */
  transitionTag?: string | undefined;
}
