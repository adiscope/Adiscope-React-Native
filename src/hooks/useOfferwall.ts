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

interface OfferwallState {
  openedOfferwall4Adiscope: any;
  closedOfferwall4Adiscope: any;
  failedToShowOfferwall4Adiscope: any;
}

const initialState: OfferwallState = {
  openedOfferwall4Adiscope: undefined,
  closedOfferwall4Adiscope: undefined,
  failedToShowOfferwall4Adiscope: undefined,
};

export default function useOfferwall4Adiscope(unitId?: string, detailId?: string, detailUrl?: string, excludeAdTypeList?: string[]): any {
  const [stateOfferwall4Adiscope, setStateOfferwall4Adiscope] = useReducer<
    Reducer<OfferwallState, Partial<OfferwallState>>
  >((prevState, newState) => ({ ...prevState, ...newState }), initialState);

  const showOfferwall4Adiscope = useCallback(async (unitIdOverride?: string, excludeAdTypeListOverride?: string[]) => {
    const effectiveUnitId = unitIdOverride || unitId;
    const effectiveExcludeAdTypeList = excludeAdTypeListOverride || excludeAdTypeList;
    return AdiscopeReactNativeModule.showOfferwall(effectiveUnitId, effectiveExcludeAdTypeList)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId, excludeAdTypeList]);

  const showOfferwallDetail4Adiscope = useCallback(async (unitIdOverride?: string, detailIdOverride?: string, excludeAdTypeListOverride?: string[]) => {
    const effectiveUnitId = unitIdOverride || unitId;
    const effectiveDetailId = detailIdOverride || detailId;
    const effectiveExcludeAdTypeList = excludeAdTypeListOverride || excludeAdTypeList;
    return AdiscopeReactNativeModule.showOfferwallDetail(effectiveUnitId, effectiveDetailId, effectiveExcludeAdTypeList)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [unitId, detailId, excludeAdTypeList]);

  const showOfferwallDetailFromUrl4Adiscope = useCallback(async (detailUrlOverride?: string) => {
    const effectiveDetailUrl = detailUrlOverride || detailUrl;
    return AdiscopeReactNativeModule.showOfferwallDetailFromUrl(effectiveDetailUrl)
      .then((data: any) => data)
      .catch((error: any) => {
        console.log(JSON.stringify(error), 'error');
      });
  }, [detailUrl]);

  useEffect(() => {
    const listeners = [
      eventEmitter.addListener('onOfferwallAdOpened', (openedOfferwall4Adiscope) => {
        setStateOfferwall4Adiscope({ openedOfferwall4Adiscope });
      }),
      eventEmitter.addListener('onOfferwallAdClosed', (closedOfferwall4Adiscope) => {
        setStateOfferwall4Adiscope({ closedOfferwall4Adiscope });
      }),
      eventEmitter.addListener('onOfferwallAdFailedToShow', (failedToShowOfferwall4Adiscope) => {
        setStateOfferwall4Adiscope({ failedToShowOfferwall4Adiscope })
      }),
    ];

    return () => {
      listeners.forEach((listener) => listener?.remove());
    };
  }, []);
  return {
    ...stateOfferwall4Adiscope,
    showOfferwall4Adiscope,
    showOfferwallDetail4Adiscope,
    showOfferwallDetailFromUrl4Adiscope,
  };
}
