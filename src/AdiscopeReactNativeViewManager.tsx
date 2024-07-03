import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package '@adiscope.ad/adiscope-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type AdiscopeReactNativeProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'AdiscopeReactNativeViewManager';

export const AdiscopeReactNativeViewManager =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<AdiscopeReactNativeProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
