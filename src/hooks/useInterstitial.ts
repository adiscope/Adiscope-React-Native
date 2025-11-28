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

interface InterstitialState {
  showWithLoadInterstitial4Adiscope: any;
  loadedInterstitial4Adiscope: any;
  failedToLoadInterstitial4Adiscope: any;
  openedInterstitial4Adiscope: any;
  closedInterstitial4Adiscope: any;
  failedToShowInterstitial4Adiscope: any;
}

const initialState: InterstitialState = {
  showWithLoadInterstitial4Adiscope: undefined,
  loadedInterstitial4Adiscope: undefined,
  failedToLoadInterstitial4Adiscope: undefined,
  openedInterstitial4Adiscope: undefined,
  closedInterstitial4Adiscope: undefined,
  failedToShowInterstitial4Adiscope: undefined,
};

export default function useInterstitial4Adiscope(unitId?: string): any {
  const [stateInterstitial4Adiscope, setStateInterstitial4Adiscope] = useReducer<
    Reducer<InterstitialState, Partial<InterstitialState>>
  >((prevState, newState) => ({ ...prevState, ...newState }), initialState);

  const showWithLoadInterstitial4Adiscope = useCallback(async (unitIdOverride?: string) => {
    const effectiveUnitId = unitIdOverride || unitId;
    return AdiscopeReactNativeModule.showWithLoadInterstitial(effectiveUnitId)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId]);

  const loadInterstitial4Adiscope = useCallback(async (unitIdOverride?: string) => {
    const effectiveUnitId = unitIdOverride || unitId;
    return AdiscopeReactNativeModule.loadInterstitial(effectiveUnitId)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId]);

  const isLoadedInterstitial4Adiscope = useCallback(async (unitIdOverride?: string) => {
    const effectiveUnitId = unitIdOverride || unitId;
    return AdiscopeReactNativeModule.isLoadedInterstitial(effectiveUnitId)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId]);

  const showInterstitial4Adiscope = useCallback(async () => {
    return AdiscopeReactNativeModule.showInterstitial()
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, []);

  useEffect(() => {
    const listeners = [
      eventEmitter.addListener('onInterstitialAdLoaded', (loadedInterstitial4Adiscope) => {
        setStateInterstitial4Adiscope({ loadedInterstitial4Adiscope });
      }),
      eventEmitter.addListener('onInterstitialAdFailedToLoad', (failedToLoadInterstitial4Adiscope) =>
        setStateInterstitial4Adiscope({ failedToLoadInterstitial4Adiscope })
      ),
      eventEmitter.addListener('onInterstitialAdOpened', (openedInterstitial4Adiscope) => {
        setStateInterstitial4Adiscope({ openedInterstitial4Adiscope });
      }),
      eventEmitter.addListener('onInterstitialAdClosed', (closedInterstitial4Adiscope) => {
        setStateInterstitial4Adiscope({ closedInterstitial4Adiscope });
      }),
      eventEmitter.addListener('onInterstitialAdFailedToShow', (failedToShowInterstitial4Adiscope) =>
        setStateInterstitial4Adiscope({ failedToShowInterstitial4Adiscope })
      ),
    ];

    return () => {
      listeners.forEach((listener) => listener?.remove());
    };
  }, []);
  return {
    ...stateInterstitial4Adiscope,
    showWithLoadInterstitial4Adiscope,
    loadInterstitial4Adiscope,
    isLoadedInterstitial4Adiscope,
    showInterstitial4Adiscope,
  };
}
