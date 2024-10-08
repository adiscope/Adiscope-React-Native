import { useCallback, useEffect, useReducer, type Reducer } from 'react';
import { NativeModules, Platform, NativeEventEmitter } from 'react-native';

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

const eventEmitter = new NativeEventEmitter(AdiscopeReactNativeModule);

interface AdEventState {
  openedAdEvent4Adiscope: any;
  closedAdEvent4Adiscope: any;
  failedToShowAdEvent4Adiscope: any;
}

const initialState: AdEventState = {
  openedAdEvent4Adiscope: undefined,
  closedAdEvent4Adiscope: undefined,
  failedToShowAdEvent4Adiscope: undefined,
};

export default function useAdEvent4Adiscope(unitId?: string): any {
  const [stateAdEvent4Adiscope, setStateAdEvent4Adiscope] = useReducer<
    Reducer<AdEventState, Partial<AdEventState>>
  >((prevState, newState) => ({ ...prevState, ...newState }), initialState);

  const showAdEvent4Adiscope = useCallback(async (unitIdOverride?: string) => {
    const effectiveUnitId = unitIdOverride || unitId;
    return AdiscopeReactNativeModule.showAdEvent(effectiveUnitId)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId]);

  useEffect(() => {
    const listeners = [
      eventEmitter.addListener('onAdEventOpened', (openedAdEvent4Adiscope) => {
        setStateAdEvent4Adiscope({ openedAdEvent4Adiscope });
      }),
      eventEmitter.addListener('onAdEventClosed', (closedAdEvent4Adiscope) => {
        setStateAdEvent4Adiscope({ closedAdEvent4Adiscope });
      }),
      eventEmitter.addListener('onAdEventFailedToShow', (failedToShowAdEvent4Adiscope) => {
        setStateAdEvent4Adiscope({ failedToShowAdEvent4Adiscope })
      }),
    ];

    return () => {
      listeners.forEach((listener) => listener?.remove());
    };
  }, []);
  return {
    ...stateAdEvent4Adiscope,
    showAdEvent4Adiscope
  };
}
