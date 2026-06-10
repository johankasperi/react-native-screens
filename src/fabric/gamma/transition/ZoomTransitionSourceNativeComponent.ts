'use client';

import type { ViewProps } from 'react-native';
import { codegenNativeComponent } from 'react-native';

interface NativeProps extends ViewProps {
  // Reserved for future tag-based matching; currently ignored by the native side.
  transitionTag?: string | undefined;
}

export default codegenNativeComponent<NativeProps>('RNSZoomTransitionSource');
