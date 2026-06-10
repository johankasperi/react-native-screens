import React from 'react';
import ZoomTransitionSourceNativeComponent from '../../../fabric/gamma/transition/ZoomTransitionSourceNativeComponent';
import type { ZoomTransitionSourceProps } from './ZoomTransitionSource.types';

/**
 * EXPERIMENTAL API, MIGHT CHANGE W/O ANY NOTICE
 *
 * Wraps a "source" view (e.g. a thumbnail). When the screen containing this
 * component pushes another screen, that push zooms out of the wrapped view.
 *
 * @platform ios (iOS 18+; older iOS falls back to the default push animation)
 */
export function ZoomTransitionSource(props: ZoomTransitionSourceProps) {
  return (
    <ZoomTransitionSourceNativeComponent collapsable={false} {...props}>
      {props.children}
    </ZoomTransitionSourceNativeComponent>
  );
}
