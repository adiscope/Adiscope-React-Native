//
//  AdiscopeReactNativeModule.m
//  Adiscope
//
//  Created by 심경보 on 2024/06/18.
//  Copyright © 2024 Neowiz-NPS-Adiscope. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AdiscopeReactNativeModule, RCTEventEmitter)

RCT_EXTERN_METHOD(
    initialize: (NSString *) mediaId
    mediaSecret: (NSString *) mediaSecret
    callBackTag: (NSString *) callBackTag
    childYN: (NSString *) childYN
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    setUserId: (NSString *) userId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    setRewardedCheckParam: (NSString *) param
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    isInitialize: (RCTPromiseResolveBlock *) resolve
    rejecter: (RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    getSDKVersion: (RCTPromiseResolveBlock *) resolve
    rejecter: (RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    getNetworksVersions: (RCTPromiseResolveBlock *) resolve
    rejecter: (RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    getUnitStatus: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showMaxMediationDebugger: (RCTPromiseResolveBlock *) resolve
    rejecter: (RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showAdmobMediationDebugger: (RCTPromiseResolveBlock *) resolve
    rejecter: (RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    setVolumeOff: (BOOL) isOn
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    setShowWithLoad2BackgroundColor: (NSString *) red
    green: (NSString *) green
    blue: (NSString *) blue
    alpha: (NSString *) alpha
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    setShowWithLoad2IndicatorStyleMedium: (BOOL) isMedium
    isHidden: (BOOL) isHidden
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    setShowWithLoad2ErrorAlertMsg: (NSString *) msg
    isHidden: (BOOL) isHidden
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showOfferwall: (NSString *) unitId
    excludeAdTypeList: (NSArray<NSString> *) excludeAdTypeList
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showOfferwallDetail: (NSString *) unitId
    detailId: (NSString *) detailId
    excludeAdTypeList: (NSArray<NSString> *) excludeAdTypeList
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showOfferwallDetailFromUrl: (NSString *) url
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showAdEvent: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showWithLoad: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    load: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    isLoaded: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    show: (RCTPromiseResolveBlock *) resolve
    rejecter: (RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showWithLoadInterstitial: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    loadInterstitial: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    isLoadedInterstitial: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showInterstitial: (RCTPromiseResolveBlock *) resolve
    rejecter: (RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    getUnitStatusRewardedInterstitial: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    preLoadAllRewardedInterstitial: (RCTPromiseResolveBlock *) resolve
    rejecter: (RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    preLoadRewardedInterstitial: (NSArray<NSString> *) unitIds
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

RCT_EXTERN_METHOD(
    showRewardedInterstitial: (NSString *) unitId
    resolver: (RCTPromiseResolveBlock *) resolve
    rejecter:(RCTPromiseRejectBlock *) reject
)

@end
