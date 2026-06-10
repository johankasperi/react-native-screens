import React from 'react';
import { View } from 'react-native';
import type { ZoomTransitionSourceProps } from './ZoomTransitionSource.types';

/**
 * EXPERIMENTAL API, MIGHT CHANGE W/O ANY NOTICE
 *
 * Zoom transitions are an iOS-only feature. On Android the component renders
 * its children as a passthrough `View`.
 */
export function ZoomTransitionSource({
  transitionTag: _transitionTag,
  ...rest
}: ZoomTransitionSourceProps) {
  return (
    <View collapsable={false} {...rest}>
      {rest.children}
    </View>
  );
}
