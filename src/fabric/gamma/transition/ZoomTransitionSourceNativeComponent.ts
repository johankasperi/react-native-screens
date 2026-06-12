'use client';

import type { ViewProps } from 'react-native';
import { codegenNativeComponent } from 'react-native';

interface NativeProps extends ViewProps {
  // Identifies this source; a push whose `zoomTransitionSourceTag` matches zooms out of this view.
  transitionTag: string;
}

export default codegenNativeComponent<NativeProps>('RNSZoomTransitionSource');
