export declare const initialize4Adiscope: () => Promise<boolean>;
export declare const isInitialize4Adiscope: () => Promise<boolean>;
export declare const setUserId4Adiscope: (userId: string) => Promise<boolean>;
export declare const getSDKVersion4Adiscope: () => Promise<boolean>;
export declare const getNetworksVersions4Adiscope: () => Promise<boolean>;
export declare const getUnitStatus4Adiscope: (unitId: string) => Promise<boolean>;
export declare const showMaxMediationDebugger4Adiscope: () => Promise<boolean>;
export declare const showAdmobMediationDebugger4Adiscope: () => Promise<boolean>;
export declare const setVolumeOff4Adiscope: (isOn: boolean) => Promise<boolean>;
export declare const useOfferwall4Adiscope: (unitId?: string, detailId?: string, detailUrl?: string, excludeAdTypeList?: string[]) => {
  showOfferwall4Adiscope: (unitId: string, excludeAdTypeList: string[]) => Promise<boolean>;
  showOfferwallDetail4Adiscope: (unitId: string, detailId: string, excludeAdTypeList: string[]) => Promise<boolean>;
  showOfferwallDetailFromUrl4Adiscope: (detailUrl: string) => Promise<boolean>;
  openedOfferwall4Adiscope: any;
  closedOfferwall4Adiscope: any;
  failedToShowOfferwall4Adiscope: any;
};
export declare const useRewardedVideo4Adiscope: (unitId?: string) => {
  loadRewardedVideo4Adiscope: (unitId: string) => Promise<boolean>;
  isLoadedRewardedVideo4Adiscope: (unitId: string) => Promise<boolean>;
  showRewardedVideo4Adiscope: () => Promise<boolean>;
  loadedRewardedVideo4Adiscope: any;
  failedToLoadRewardedVideo4Adiscope: any;
  openedRewardedVideo4Adiscope: any;
  closedRewardedVideo4Adiscope: any;
  rewardedRewardedVideo4Adiscope: any;
  failedToShowRewardedVideo4Adiscope: any;
};
export declare const useInterstitial4Adiscope: (unitId?: string) => {
  loadInterstitial4Adiscope: (unitId: string) => Promise<boolean>;
  isLoadedInterstitial4Adiscope: (unitId: string) => Promise<boolean>;
  showInterstitial4Adiscope: () => Promise<boolean>;
  loadedInterstitial4Adiscope: any;
  failedToLoadInterstitial4Adiscope: any;
  openedInterstitial4Adiscope: any;
  closedInterstitial4Adiscope: any;
  failedToShowInterstitial4Adiscope: any;
};
export declare const useRewardedInterstitial4Adiscope: (unitId?: string, unitIds?: string[]) => {
  getUnitStatusRewardedInterstitial4Adiscope: (unitId: string) => Promise<boolean>;
  preLoadAllRewardedInterstitial4Adiscope: () => Promise<boolean>;
  preLoadRewardedInterstitial4Adiscope: (unitIds: string[]) => Promise<boolean>;
  showRewardedInterstitial4Adiscope: (unitId: string) => Promise<boolean>;
  skipRewardedInterstitial4Adiscope: any;
  openedRewardedInterstitial4Adiscope: any;
  closedRewardedInterstitial4Adiscope: any;
  rewardedRewardedInterstitial4Adiscope: any;
  failedToShowRewardedInterstitial4Adiscope: any;
};
