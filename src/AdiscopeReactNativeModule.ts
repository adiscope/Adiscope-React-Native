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

export const setUserIdChild4Adiscope = (userId: string, child: number) => {
  return AdiscopeReactNativeModule.setUserIdChild(userId, child)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setRewardedCheckParam4Adiscope = (param: string) => {
  return AdiscopeReactNativeModule.setRewardedCheckParam(param)
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

export const setShowWithLoad2BackgroundColor4Adiscope = (red: string, green: string, blue: string, alpha: string) => {
  return AdiscopeReactNativeModule.setShowWithLoad2BackgroundColor(red, green, blue, alpha)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setShowWithLoad2IndicatorStyleMedium4Adiscope = (isMedium: boolean, isHidden: boolean) => {
  return AdiscopeReactNativeModule.setShowWithLoad2IndicatorStyleMedium(isMedium, isHidden)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setShowWithLoad2ErrorAlertMsg4Adiscope = (msg: string, isHidden: boolean) => {
  return AdiscopeReactNativeModule.setShowWithLoad2ErrorAlertMsg(msg, isHidden)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const showLuckyEvent4Adiscope = () => {
  return AdiscopeReactNativeModule.showLuckyEvent()
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setLuckyEventAppId4Adiscope = (appId: string, pubId: string) => {
  return AdiscopeReactNativeModule.setLuckyEventAppId(appId, pubId)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setLuckyEventUseSafeAreaWebView4Adiscope = (useSafeArea: boolean) => {
  return AdiscopeReactNativeModule.setLuckyEventUseSafeAreaWebView(useSafeArea)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setLuckyEventHashMark4Adiscope = (hashMark: string) => {
  return AdiscopeReactNativeModule.setLuckyEventHashMark(hashMark)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setLuckyEventBaseUrl4Adiscope = (baseUrl: string) => {
  return AdiscopeReactNativeModule.setLuckyEventBaseUrl(baseUrl)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}

export const setLuckyEventExtraParam4Adiscope = (key: string, value: string) => {
  return AdiscopeReactNativeModule.setLuckyEventExtraParam(key, value)
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(JSON.stringify(error), 'error');
    });
}
