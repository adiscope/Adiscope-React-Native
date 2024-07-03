import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@adiscope.ad/adiscope-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AdiscopeReactNativeModule = NativeModules.AdiscopeReactNativeModule
  ? NativeModules.AdiscopeReactNativeModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const initialize4Adiscope = (
  callbackTag?: string,
  childYN?: string,
  mediaId?: string,
  mediaSecret?: string,
) => {
  return AdiscopeReactNativeModule.initialize(mediaId, mediaSecret, callbackTag, childYN)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const isInitialize4Adiscope = () => {
  return AdiscopeReactNativeModule.isInitialize()
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setUserId4Adiscope = (userId: string) => {
  return AdiscopeReactNativeModule.setUserId(userId)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const getSDKVersion4Adiscope = () => {
  return AdiscopeReactNativeModule.getSDKVersion()
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const getNetworksVersions4Adiscope = () => {
  return AdiscopeReactNativeModule.getNetworksVersions()
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const getUnitStatus4Adiscope = (unitId: string) => {
  return AdiscopeReactNativeModule.getUnitStatus(unitId)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const showMaxMediationDebugger4Adiscope = () => {
  return AdiscopeReactNativeModule.showMaxMediationDebugger()
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const showAdmobMediationDebugger4Adiscope = () => {
  return AdiscopeReactNativeModule.showAdmobMediationDebugger()
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setVolumeOff4Adiscope = (isOn: boolean) => {
  return AdiscopeReactNativeModule.setVolumeOff(isOn)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}
