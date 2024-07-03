//
//  AdiscopeReactNativeModule.swift
//  Adiscope
//
//  Created by 심경보 on 2024/06/18.
//  Copyright © 2024 Neowiz-NPS-Adiscope. All rights reserved.
//

import Foundation
import Adiscope

@objc (AdiscopeReactNativeModule)
class AdiscopeReactNativeModule: RCTEventEmitter {
    var hasListeners = false
    var adiscope = AdiscopeInterface.sharedInstance()!
    var resolveCallback: RCTPromiseResolveBlock?
    var rejectCallback: RCTPromiseRejectBlock?

    override func startObserving() {
        hasListeners = true
    }

    override func stopObserving() {
        hasListeners = false
    }

    override func supportedEvents() -> [String]? {
        return [
            "onOfferwallAdOpened",
            "onOfferwallAdClosed",
            "onOfferwallAdFailedToShow",
            "onRewardedVideoAdLoaded",
            "onRewardedVideoAdFailedToLoad",
            "onRewardedVideoAdOpened",
            "onRewardedVideoAdClosed",
            "onRewarded",
            "onRewardedVideoAdFailedToShow",
            "onInterstitialAdLoaded",
            "onInterstitialAdFailedToLoad",
            "onInterstitialAdOpened",
            "onInterstitialAdClosed",
            "onInterstitialAdFailedToShow",
            "onRewardedInterstitialAdSkip",
            "onRewardedInterstitialAdOpened",
            "onRewardedInterstitialAdClosed",
            "onRewardedInterstitialAdRewarded",
            "onRewardedInterstitialAdFailedToShow"
        ]
    }


    @objc
    func onInitialized(_ isSuccess: Bool) {
        let result = ["isSuccess": isSuccess]
        resolveCallback?(result)
    }

    @objc(initialize:mediaSecret:callBackTag:childYN:resolver:rejecter:)
    func initialize(_ mediaId: String?, mediaSecret: String?, callBackTag: String?, childYN: String?, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        resolveCallback = resolve
        rejectCallback = reject
        adiscope.setMainDelegate(self)
        if ((mediaId != nil) && (mediaSecret != nil) && (callBackTag != nil)) {
            adiscope.initialize(mediaId, mediaSecret: mediaSecret, callBackTag: nil)
        } else if ((mediaId != nil) && (mediaSecret != nil)) {
            adiscope.initialize(mediaId, mediaSecret: mediaSecret)
        } else if ((callBackTag != nil)) {
            adiscope.initialize(callBackTag)
        } else {
            adiscope.initialize()
        }
    }

    @objc(isInitialize:rejecter:)
    func isInitialize(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        let result = adiscope.isInitialized()
        resolve(result)
    }


    @objc(setUserId:resolver:rejecter:)
    func setUserId(_ userId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        let result = adiscope.setUserId(userId)
        resolve(result)
    }

    @objc(getSDKVersion:rejecter:)
    func getSDKVersion(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        let result = adiscope.getSDKVersion()
        resolve(result)
    }

    @objc(getNetworksVersions:rejecter:)
    func getNetworksVersions(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        let result = adiscope.networkVersions
        resolve(result)
    }


    @objc
    func onResponsedUnitStatus(_ status: AdiscopeUnitStatus!) {
        let result = ["live": status.live, "active": status.active]
        resolveCallback?(result)
    }

    @objc(getUnitStatus:resolver:rejecter:)
    func getUnitStatus(_ unitId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        resolveCallback = resolve
        rejectCallback = reject
        adiscope.getUnitStatus(unitId)
    }


    @objc(showMaxMediationDebugger:rejecter:)
    func showMaxMediationDebugger(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        DispatchQueue.main.async {
            self.adiscope.showMaxMediationDebugger()
            resolve(true)
        }
    }

    @objc(showAdmobMediationDebugger:rejecter:)
    func showAdmobMediationDebugger(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        DispatchQueue.main.async {
            self.adiscope.showAdmobMediationDebugger()
            resolve(true)
        }
    }

    @objc(setVolumeOff:resolver:rejecter:)
    func setVolumeOff(_ isOn: Bool, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        if (isOn) {
            adiscope.setVolumeOff()
        } else {
            adiscope.setVolumeOn()
        }
        resolve(true)
    }


    @objc
    func onOfferwallAdOpened(_ unitID: String!) {
        sendEvent(withName: "onOfferwallAdOpened", body: ["unitId": unitID])
    }

    @objc
    func onOfferwallAdClosed(_ unitID: String!) {
        sendEvent(withName: "onOfferwallAdClosed", body: ["unitId": unitID])
    }

    @objc
    func onOfferwallAdFailed(toShow unitID: String!, Error error: AdiscopeError!) {
        sendEvent(withName: "onOfferwallAdFailedToShow", body: ["unitId": unitID, "errorDescription": error.description, "errorXB3TraceID": error.getXB3TraceID() ?? ""])
    }

    @objc(showOfferwall:excludeAdTypeList:resolver:rejecter:)
    func showOfferwall(_ unitId: String, excludeAdTypeList: Array<String>, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        DispatchQueue.main.async {
            let result = self.adiscope.showOfferwall(unitId)
            resolve(result)
        }
    }

    @objc(showOfferwallDetail:detailId:excludeAdTypeList:resolver:rejecter:)
    func showOfferwallDetail(_ unitId: String, detailId: String, excludeAdTypeList: Array<String>, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        DispatchQueue.main.async {
            let result = self.adiscope.showOfferwallDetail(unitId, offerwallItemId: detailId)
            resolve(result)
        }
    }

    @objc(showOfferwallDetailFromUrl:resolver:rejecter:)
    func showOfferwallDetailFromUrl(_ url: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        DispatchQueue.main.async {
            let result = self.adiscope.showOfferwallDetail(url)
            resolve(result)
        }
    }


    @objc
    func onRewardedVideoAdLoaded(_ unitID: String!) {
        sendEvent(withName: "onRewardedVideoAdLoaded", body: ["unitId": unitID])
    }

    @objc
    func onRewardedVideoAdFailed(toLoad unitID: String!, Error error: AdiscopeError!) {
        sendEvent(withName: "onRewardedVideoAdFailedToLoad", body: ["unitId": unitID, "errorDescription": error.description, "errorXB3TraceID": error.getXB3TraceID() ?? ""])
    }

    @objc
    func onRewardedVideoAdOpened(_ unitID: String!) {
        sendEvent(withName: "onRewardedVideoAdOpened", body: ["unitId": unitID])
    }

    @objc
    func onRewardedVideoAdClosed(_ unitID: String!) {
        sendEvent(withName: "onRewardedVideoAdClosed", body: ["unitId": unitID])
    }

    @objc
    func onRewarded(_ unitID: String!, Item item: AdiscopeRewardItem!) {
        sendEvent(withName: "onRewarded", body: ["unit": item.unit ?? "", "amount": item.amount])
    }

    @objc
    func onRewardedVideoAdFailed(toShow unitID: String!, Error error: AdiscopeError!) {
        sendEvent(withName: "onRewardedVideoAdFailedToShow", body: ["unitId": unitID, "errorDescription": error.description, "errorXB3TraceID": error.getXB3TraceID() ?? ""])
    }

    @objc(load:resolver:rejecter:)
    func load(_ unitId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        adiscope.load(unitId)
        resolve(true)
    }

    @objc(isLoaded:resolver:rejecter:)
    func isLoaded(_ unitId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        let result = adiscope.isLoaded(unitId)
        resolve(result)
    }

    @objc(show:rejecter:)
    func show(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        DispatchQueue.main.async {
            let result = self.adiscope.show()
            resolve(result)
        }
    }


    @objc
    func onInterstitialAdLoaded(_ unitID: String!) {
        sendEvent(withName: "onInterstitialAdLoaded", body: ["unitId": unitID])
    }

    @objc
    func onInterstitialAdFailed(toLoad unitID: String!, Error error: AdiscopeError!) {
        sendEvent(withName: "onInterstitialAdFailedToLoad", body: ["unitId": unitID, "errorDescription": error.description, "errorXB3TraceID": error.getXB3TraceID() ?? ""])
    }

    @objc
    func onInterstitialAdOpened(_ unitID: String!) {
        sendEvent(withName: "onInterstitialAdOpened", body: ["unitId": unitID])
    }

    @objc
    func onInterstitialAdClosed(_ unitID: String!) {
        sendEvent(withName: "onInterstitialAdClosed", body: ["unitId": unitID])
    }

    @objc
    func onInterstitialAdFailed(toShow unitID: String!, Error error: AdiscopeError!) {
        sendEvent(withName: "onInterstitialAdFailedToShow", body: ["unitId": unitID, "errorDescription": error.description, "errorXB3TraceID": error.getXB3TraceID() ?? ""])
    }

    @objc(loadInterstitial:resolver:rejecter:)
    func loadInterstitial(_ unitId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        adiscope.loadInterstitial(unitId)
        resolve(true)
    }

    @objc(isLoadedInterstitial:resolver:rejecter:)
    func isLoadedInterstitial(_ unitId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        let result = adiscope.isLoadedInterstitialUnitID(unitId)
        resolve(result)
    }

    @objc(showInterstitial:rejecter:)
    func showInterstitial(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        DispatchQueue.main.async {
            self.adiscope.showInterstitial()
            resolve(true)
        }
    }


    @objc
    func onRewardedInterstitialResponsedUnitStatus(_ status: AdiscopeUnitStatus!) {
        let result = ["live": status.live, "active": status.active]
        resolveCallback?(result)
    }

    @objc
    func onRewardedInterstitialAdSkip(_ unitID: String!) {
        sendEvent(withName: "onRewardedInterstitialAdSkip", body: ["unitId": unitID])
    }

    @objc
    func onRewardedInterstitialAdOpened(_ unitID: String!) {
        sendEvent(withName: "onRewardedInterstitialAdOpened", body: ["unitId": unitID])
    }

    @objc
    func onRewardedInterstitialAdClosed(_ unitID: String!) {
        sendEvent(withName: "onRewardedInterstitialAdClosed", body: ["unitId": unitID])
    }

    @objc
    func onRewardedInterstitialAdRewarded(_ unitID: String!, item: AdiscopeRewardItem!) {
        sendEvent(withName: "onRewardedInterstitialAdRewarded", body: ["unit": item.unit ?? "", "amount": item.amount])
    }

    @objc
    func onRewardedInterstitialAdFailed(toShow unitID: String!, Error error: AdiscopeError!) {
        sendEvent(withName: "onRewardedInterstitialAdFailedToShow", body: ["unitId": unitID, "errorDescription": error.description, "errorXB3TraceID": error.getXB3TraceID() ?? ""])
    }

    @objc(getUnitStatusRewardedInterstitial:resolver:rejecter:)
    func getUnitStatusRewardedInterstitial(_ unitId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        resolveCallback = resolve
        rejectCallback = reject
        adiscope.getRewardedInterstitialUnitStatus(unitId)
    }

    @objc(preLoadAllRewardedInterstitial:rejecter:)
    func preLoadAllRewardedInterstitial(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        self.adiscope.preLoadAllRewardedInterstitial()
        resolve(true)
    }

    @objc(preLoadRewardedInterstitial:resolver:rejecter:)
    func preLoadRewardedInterstitial(_ unitIds: Array<String>, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        adiscope.preLoadRewardedInterstitial(unitIds)
        resolve(true)
    }

    @objc(showRewardedInterstitial:resolver:rejecter:)
    func showRewardedInterstitial(_ unitId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock ) -> Void {
        DispatchQueue.main.async {
            let result = self.adiscope.showRewardedInterstitial(unitId)
            resolve(result)
        }
    }
}
