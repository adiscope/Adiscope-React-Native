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

interface RewardedVideoState {
  showWithLoadRewardedVideo4Adiscope: any;
  loadedRewardedVideo4Adiscope: any;
  failedToLoadRewardedVideo4Adiscope: any;
  openedRewardedVideo4Adiscope: any;
  closedRewardedVideo4Adiscope: any;
  rewardedRewardedVideo4Adiscope: any;
  failedToShowRewardedVideo4Adiscope: any;
}

const initialState: RewardedVideoState = {
  showWithLoadRewardedVideo4Adiscope: undefined,
  loadedRewardedVideo4Adiscope: undefined,
  failedToLoadRewardedVideo4Adiscope: undefined,
  openedRewardedVideo4Adiscope: undefined,
  closedRewardedVideo4Adiscope: undefined,
  rewardedRewardedVideo4Adiscope: undefined,
  failedToShowRewardedVideo4Adiscope: undefined,
};

export default function useRewardedVideo4Adiscope(unitId?: string): any {
  const [stateRewardedVideo4Adiscope, setStateRewardedVideo4Adiscope] = useReducer<
    Reducer<RewardedVideoState, Partial<RewardedVideoState>>
  >((prevState, newState) => ({ ...prevState, ...newState }), initialState);

  const showWithLoadRewardedVideo4Adiscope = useCallback(async (unitIdOverride?: string) => {
    const effectiveUnitId = unitIdOverride || unitId;
    return AdiscopeReactNativeModule.showWithLoad(effectiveUnitId)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId]);

  const loadRewardedVideo4Adiscope = useCallback(async (unitIdOverride?: string) => {
    const effectiveUnitId = unitIdOverride || unitId;
    return AdiscopeReactNativeModule.load(effectiveUnitId)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId]);

  const isLoadedRewardedVideo4Adiscope = useCallback(async (unitIdOverride?: string) => {
    const effectiveUnitId = unitIdOverride || unitId;
    return AdiscopeReactNativeModule.isLoaded(effectiveUnitId)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId]);

  const showRewardedVideo4Adiscope = useCallback(async () => {
    return AdiscopeReactNativeModule.show()
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, []);

  useEffect(() => {
    const listeners = [
      eventEmitter.addListener('onRewardedVideoAdLoaded', (loadedRewardedVideo4Adiscope) => {
        setStateRewardedVideo4Adiscope({ loadedRewardedVideo4Adiscope });
      }),
      eventEmitter.addListener('onRewardedVideoAdFailedToLoad', (failedToLoadRewardedVideo4Adiscope) =>
        setStateRewardedVideo4Adiscope({ failedToLoadRewardedVideo4Adiscope })
      ),
      eventEmitter.addListener('onRewardedVideoAdOpened', (openedRewardedVideo4Adiscope) => {
        setStateRewardedVideo4Adiscope({ openedRewardedVideo4Adiscope });
      }),
      eventEmitter.addListener('onRewardedVideoAdClosed', (closedRewardedVideo4Adiscope) => {
        setStateRewardedVideo4Adiscope({ closedRewardedVideo4Adiscope });
      }),
      eventEmitter.addListener('onRewarded', (rewardedRewardedVideo4Adiscope) => {
        setStateRewardedVideo4Adiscope({ rewardedRewardedVideo4Adiscope });
      }),
      eventEmitter.addListener('onRewardedVideoAdFailedToShow', (failedToShowRewardedVideo4Adiscope) =>
        setStateRewardedVideo4Adiscope({ failedToShowRewardedVideo4Adiscope })
      ),
    ];

    return () => {
      listeners.forEach((listener) => listener?.remove());
    };
  }, []);
  return {
    ...stateRewardedVideo4Adiscope,
    showWithLoadRewardedVideo4Adiscope,
    loadRewardedVideo4Adiscope,
    isLoadedRewardedVideo4Adiscope,
    showRewardedVideo4Adiscope,
  };
}
