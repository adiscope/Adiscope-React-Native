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

interface RewardedInterstitialState {
  skipRewardedInterstitial4Adiscope: any;
  openedRewardedInterstitial4Adiscope: any;
  closedRewardedInterstitial4Adiscope: any;
  rewardedRewardedInterstitial4Adiscope: any;
  failedToShowRewardedInterstitial4Adiscope: any;
}

const initialState: RewardedInterstitialState = {
  skipRewardedInterstitial4Adiscope: undefined,
  openedRewardedInterstitial4Adiscope: undefined,
  closedRewardedInterstitial4Adiscope: undefined,
  rewardedRewardedInterstitial4Adiscope: undefined,
  failedToShowRewardedInterstitial4Adiscope: undefined,
};

export default function useRewardedInterstitial4Adiscope(unitId?: string, unitIds?: string[]): any {
  const [stateRewardedInterstitial4Adiscope, setStateRewardedInterstitial4Adiscope] = useReducer<
    Reducer<RewardedInterstitialState, Partial<RewardedInterstitialState>>
  >((prevState, newState) => ({ ...prevState, ...newState }), initialState);

  const getUnitStatusRewardedInterstitial4Adiscope = useCallback(async (unitId?: string) => {
    return AdiscopeReactNativeModule.getUnitStatusRewardedInterstitial(unitId)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId]);

  const preLoadAllRewardedInterstitial4Adiscope = useCallback(async () => {
    return AdiscopeReactNativeModule.preLoadAllRewardedInterstitial()
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, []);

  const preLoadRewardedInterstitial4Adiscope = useCallback(async (unitIdsOverride?: string[]) => {
    const effectiveUnitIds = unitIdsOverride || unitIds;
    return AdiscopeReactNativeModule.preLoadRewardedInterstitial(effectiveUnitIds)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitIds]);

  const showRewardedInterstitial4Adiscope = useCallback(async (unitId?: string) => {
    return AdiscopeReactNativeModule.showRewardedInterstitial(unitId)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId]);

  useEffect(() => {
    const listeners = [
      eventEmitter.addListener('onRewardedInterstitialAdSkip', (skipRewardedInterstitial4Adiscope) => {
        setStateRewardedInterstitial4Adiscope({ skipRewardedInterstitial4Adiscope });
      }),
      eventEmitter.addListener('onRewardedInterstitialAdOpened', (openedRewardedInterstitial4Adiscope) => {
        setStateRewardedInterstitial4Adiscope({ openedRewardedInterstitial4Adiscope });
      }),
      eventEmitter.addListener('onRewardedInterstitialAdClosed', (closedRewardedInterstitial4Adiscope) => {
        setStateRewardedInterstitial4Adiscope({ closedRewardedInterstitial4Adiscope });
      }),
      eventEmitter.addListener('onRewardedInterstitialAdRewarded', (rewardedRewardedInterstitial4Adiscope) => {
        setStateRewardedInterstitial4Adiscope({ rewardedRewardedInterstitial4Adiscope });
      }),
      eventEmitter.addListener('onRewardedInterstitialAdFailedToShow', (failedToShowRewardedInterstitial4Adiscope) =>
        setStateRewardedInterstitial4Adiscope({ failedToShowRewardedInterstitial4Adiscope })
      ),
    ];

    return () => {
      listeners.forEach((listener) => listener?.remove());
    };
  }, []);
  return {
    ...stateRewardedInterstitial4Adiscope,
    getUnitStatusRewardedInterstitial4Adiscope,
    preLoadAllRewardedInterstitial4Adiscope,
    preLoadRewardedInterstitial4Adiscope,
    showRewardedInterstitial4Adiscope,
  };
}
