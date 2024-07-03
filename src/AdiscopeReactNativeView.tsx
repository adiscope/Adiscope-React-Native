import React, { useEffect, useRef } from 'react';
import { UIManager, PixelRatio, findNodeHandle } from 'react-native';
import { AdiscopeReactNativeViewManager } from './AdiscopeReactNativeViewManager';

const createFragment = (viewId: any) =>
  UIManager.dispatchViewManagerCommand(viewId, 'test', [viewId]);

export const AdiscopeReactNativeView = (props: any) => {
  const ref = useRef(null);
  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  const _onChange = (event: any) => {
    if (!props.onChangeMessage) {
      return;
    }
    props.onChangeMessage(event.nativeEvent.message);
  };
  return (
    <AdiscopeReactNativeViewManager
      {...props}
      onChange={_onChange}
      style={{
        // converts dpi to px, provide desired height
        height: PixelRatio.getPixelSizeForLayoutSize(120),
        // converts dpi to px, provide desired width
        width: PixelRatio.getPixelSizeForLayoutSize(120),
      }}
      ref={ref}
    />
  );
};
