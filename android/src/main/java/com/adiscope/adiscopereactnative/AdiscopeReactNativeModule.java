package com.adiscope.adiscopereactnative;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.nps.adiscope.AdiscopeError;
import com.nps.adiscope.AdiscopeSdk;
import com.nps.adiscope.model.IUnitStatus;
import com.nps.adiscope.model.UnitStatus;
import com.nps.adiscope.listener.AdiscopeInitializeListener;
import com.nps.adiscope.offerwall.OfferwallAd;
import com.nps.adiscope.offerwall.OfferwallAdListener;
import com.nps.adiscope.reward.RewardItem;
import com.nps.adiscope.reward.RewardedVideoAd;
import com.nps.adiscope.reward.RewardedVideoAdListener;
import com.nps.adiscope.interstitial.InterstitialAd;
import com.nps.adiscope.interstitial.InterstitialAdListener;
import com.nps.adiscope.rewardedinterstitial.RewardedInterstitialAd;
import com.nps.adiscope.rewardedinterstitial.RewardedInterstitialAdShowListener;

import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.Context;

@ReactModule(name = AdiscopeReactNativeModule.NAME)
public class AdiscopeReactNativeModule extends ReactContextBaseJavaModule {
  public static final String NAME = "AdiscopeReactNativeModule";
  private static final String TAG = AdiscopeReactNativeModule.class.getName();

  private static ReactContext mContext;

  private static OfferwallAd mOfferwallAd;
  private static RewardedVideoAd mRewardedVideoAd;
  private static InterstitialAd mInterstitialAd;
  private static RewardedInterstitialAd mRewardedInterstitialAd;

  public AdiscopeReactNativeModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mContext = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void addListener(String eventName) {
  }

  @ReactMethod
  public void removeListeners(Integer count) {
  }

  public static void sendEvent(String eventName, @Nullable WritableMap params) {
    mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }

  @ReactMethod
  public void initialize(String mediaId, String mediaSecret, String callbackTag, String childYN, Promise promise) {
    if(!mContext.hasActiveCatalystInstance()) {
      WritableMap result = Arguments.createMap();
      result.putBoolean("isSuccess", false);
      promise.resolve(result);
      return;
    }

    AdiscopeInitializeListener initializeListener = new AdiscopeInitializeListener() {
      @Override
      public void onInitialized(boolean isSuccess) {
        if (isSuccess) {
          mOfferwallAd = AdiscopeSdk.getOfferwallAdInstance(getCurrentActivity());
          mOfferwallAd.setOfferwallAdListener(mOfferwallAdListener());
          mRewardedVideoAd = AdiscopeSdk.getRewardedVideoAdInstance(getCurrentActivity());
          mRewardedVideoAd.setRewardedVideoAdListener(mRewardedVideoAdListener());
          mInterstitialAd = AdiscopeSdk.getInterstitialAdInstance(getCurrentActivity());
          mInterstitialAd.setInterstitialAdListener(mInterstitialAdListener());
          mRewardedInterstitialAd = AdiscopeSdk.getRewardedInterstitialAdInstance(getCurrentActivity());
          mRewardedInterstitialAd.setRewardedInterstitialAdListener(mRewardedInterstitialAdListener());
        }

        WritableMap result = Arguments.createMap();
        result.putBoolean("isSuccess", isSuccess);
        promise.resolve(result);
      }
    };

    if (mediaId != null && mediaId.length() > 0 && mediaSecret != null && mediaSecret.length() > 0 && callbackTag != null && callbackTag.length() > 0 && childYN != null && childYN.length() > 0) {
      AdiscopeSdk.initialize(getCurrentActivity(), mediaId, mediaSecret, callbackTag, childYN, initializeListener);
    } else if (mediaId != null && mediaId.length() > 0 && mediaSecret != null && mediaSecret.length() > 0 && callbackTag != null && callbackTag.length() > 0) {
      AdiscopeSdk.initialize(getCurrentActivity(), mediaId, mediaSecret, callbackTag, initializeListener);
    } else if (mediaId != null && mediaId.length() > 0 && mediaSecret != null && mediaSecret.length() > 0) {
      AdiscopeSdk.initialize(getCurrentActivity(), mediaId, mediaSecret, initializeListener);
    } else if (callbackTag != null && callbackTag.length() > 0 && childYN != null && childYN.length() > 0) {
      AdiscopeSdk.initialize(getCurrentActivity(), initializeListener, callbackTag, childYN);
    } else if (callbackTag != null && callbackTag.length() > 0) {
      AdiscopeSdk.initialize(getCurrentActivity(), initializeListener, callbackTag);
    } else {
      AdiscopeSdk.initialize(getCurrentActivity(), initializeListener);
    }
  }

  @ReactMethod
  public void isInitialize(Promise promise) {
    boolean result = AdiscopeSdk.isInitialize();
    promise.resolve(result);
  }

  @ReactMethod
  public void setUserId(String userId, Promise promise) {
    AdiscopeSdk.setUserId(userId);
    promise.resolve(true);
  }


  @ReactMethod
  public void getSDKVersion(Promise promise) {
    String result = AdiscopeSdk.getSDKVersion();
    promise.resolve(result);
  }

  @ReactMethod
  public void getNetworksVersions(Promise promise) {
    String result = AdiscopeSdk.getNetworksVersions();
    promise.resolve(result);
  }

  @ReactMethod
  public void getUnitStatus(String unitId, Promise promise) {
    AdiscopeSdk.getUnitStatus(unitId, new IUnitStatus() {
      @Override
      public void onResult(AdiscopeError error, UnitStatus unitStatus) {
        WritableMap result = Arguments.createMap();
        result.putBoolean("live", unitStatus != null && unitStatus.isLive());
        result.putBoolean("active", unitStatus != null && unitStatus.isActive());
        result.putString("error", error != null ? error.getDescription() : null);
        promise.resolve(result);
      }
    });
  }

  @ReactMethod
  public void showMaxMediationDebugger(Promise promise) {
    try {
      Class<?> clazz = Class.forName("com.nps.adiscope.adapter.max.MaxAdapter");
      java.lang.reflect.Method instanceMethod = clazz.getDeclaredMethod("showDebug", Activity.class);
      instanceMethod.invoke(null, getCurrentActivity());
      promise.resolve(true);
    } catch (Exception e) {
      System.out.println(e.getLocalizedMessage());
      promise.resolve(false);
    }
  }

  @ReactMethod
  public void showAdmobMediationDebugger(Promise promise) {
    try {
      Class<?> clazz = Class.forName("com.nps.adiscope.adapter.admob.AdMobAdapter");
      java.lang.reflect.Method instanceMethod = clazz.getDeclaredMethod("showDebug", Activity.class);
      instanceMethod.invoke(null, getCurrentActivity());
      promise.resolve(true);
    } catch (Exception e) {
      System.out.println(e.getLocalizedMessage());
      promise.resolve(false);
    }
  }

  @ReactMethod
  public void setVolumeOff(boolean isOn, Promise promise) {
    Activity currentActivity = getCurrentActivity();
    if (currentActivity != null) {
      AdiscopeSdk.getOptionSetterInstance(currentActivity).setVolumeOff(isOn);
      promise.resolve(true);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not Acitivy");
    }
  }


  public OfferwallAdListener mOfferwallAdListener() {
    return new OfferwallAdListener() {
      @Override
      public void onOfferwallAdOpened(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onOfferwallAdOpened", payload);
      }
      @Override
      public void onOfferwallAdFailedToShow(String unitId, AdiscopeError adiscopeError) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        payload.putString("errorDescription", adiscopeError.getDescription());
        payload.putString("errorXB3TraceID", adiscopeError.getXb3TraceId());
        sendEvent("onOfferwallAdFailedToShow", payload);
      }
      @Override
      public void onOfferwallAdClosed(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onOfferwallAdClosed", payload);
      }
    };
  }

  @ReactMethod
  public void showOfferwall(String unitId, ReadableArray excludeAdTypeList, Promise promise) {
    Activity currentActivity = getCurrentActivity();
    if (currentActivity != null && mOfferwallAd != null) {
      List<String> list = new ArrayList<>();
      if (excludeAdTypeList != null) {
        for (int i = 0; i < excludeAdTypeList.size(); i++) {
          if (excludeAdTypeList.getType(i) == ReadableType.String) {
            list.add(excludeAdTypeList.getString(i));
          }
        }
      }
      String[] excludeAdTypes = list.toArray(new String[0]);
      mOfferwallAd.show(currentActivity, unitId, excludeAdTypes);
      promise.resolve(true);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not Acitivy or OfferwallAd");
    }
  }

  @ReactMethod
  public void showOfferwallDetail(String unitId, String detailId, ReadableArray excludeAdTypeList, Promise promise) {
    Activity currentActivity = getCurrentActivity();
    if (currentActivity != null && mOfferwallAd != null) {
      List<String> list = new ArrayList<>();
      if (excludeAdTypeList != null) {
        for (int i = 0; i < excludeAdTypeList.size(); i++) {
          if (excludeAdTypeList.getType(i) == ReadableType.String) {
            list.add(excludeAdTypeList.getString(i));
          }
        }
      }
      String[] excludeAdTypes = list.toArray(new String[0]);
      int detailIdInt = Integer.parseInt(detailId);
      mOfferwallAd.showDetail(currentActivity, unitId, excludeAdTypes, detailIdInt);
      promise.resolve(true);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not Acitivy or OfferwallAd");
    }
  }

  @ReactMethod
  public void showOfferwallDetailFromUrl(String url, Promise promise) {
    Activity currentActivity = getCurrentActivity();
    if (currentActivity != null && mOfferwallAd != null) {
      mOfferwallAd.showDetail(currentActivity, url);
      promise.resolve(true);
    } else {
      promise.reject("exception", "not Acitivy or OfferwallAd");
    }
  }


  public RewardedVideoAdListener mRewardedVideoAdListener() {
    return new RewardedVideoAdListener() {
      @Override
      public void onRewardedVideoAdLoaded(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onRewardedVideoAdLoaded", payload);
      }
      @Override
      public void onRewardedVideoAdFailedToLoad(String unitId, AdiscopeError adiscopeError) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        payload.putString("errorDescription", adiscopeError.getDescription());
        payload.putString("errorXB3TraceID", adiscopeError.getXb3TraceId());
        sendEvent("onRewardedVideoAdFailedToLoad", payload);
      }
      @Override
      public void onRewardedVideoAdOpened(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onRewardedVideoAdOpened", payload);
      }
      @Override
      public void onRewardedVideoAdClosed(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onRewardedVideoAdClosed", payload);
      }
      @Override
      public void onRewarded(String unitId, RewardItem rewardItem) {
        WritableMap rewarded = Arguments.createMap();
        rewarded.putString("unit", rewardItem.getType());
        rewarded.putInt("amount", (int)rewardItem.getAmount());
        sendEvent("onRewarded", rewarded);
      }
      @Override
      public void onRewardedVideoAdFailedToShow(String unitId, AdiscopeError adiscopeError) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        payload.putString("errorDescription", adiscopeError.getDescription());
        payload.putString("errorXB3TraceID", adiscopeError.getXb3TraceId());
        sendEvent("onRewardedVideoAdFailedToShow", payload);
      }
    };
  }

  @ReactMethod
  public void load(String unitId, Promise promise) {
    if (mRewardedVideoAd != null) {
      mRewardedVideoAd.load(unitId);
      promise.resolve(true);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not RewardedVideoAd");
    }
  }

  @ReactMethod
  public void isLoaded(String unitId, Promise promise) {
    if (mRewardedVideoAd != null) {
      boolean result = mRewardedVideoAd.isLoaded(unitId);
      promise.resolve(result);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not RewardedVideoAd");
    }
  }
 
  @ReactMethod
  public void show(Promise promise) {
    if (mRewardedVideoAd != null) {
      boolean result = mRewardedVideoAd.show();
      promise.resolve(result);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not RewardedVideoAd");
    }
  }


  public InterstitialAdListener mInterstitialAdListener() {
    return new InterstitialAdListener() {
      @Override
      public void onInterstitialAdLoaded() {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", "");
        sendEvent("onInterstitialAdLoaded", payload);
      }
      @Override
      public void onInterstitialAdFailedToLoad(AdiscopeError adiscopeError) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", "");
        payload.putString("errorDescription", adiscopeError.getDescription());
        payload.putString("errorXB3TraceID", adiscopeError.getXb3TraceId());
        sendEvent("onInterstitialAdFailedToLoad", payload);
      }
      @Override
      public void onInterstitialAdOpened(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onInterstitialAdOpened", payload);
      }
      @Override
      public void onInterstitialAdClosed(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onInterstitialAdClosed", payload);
      }
      @Override
      public void onInterstitialAdFailedToShow(String unitId, AdiscopeError adiscopeError) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        payload.putString("errorDescription", adiscopeError.getDescription());
        payload.putString("errorXB3TraceID", adiscopeError.getXb3TraceId());
        sendEvent("onInterstitialAdFailedToShow", payload);
      }
    };
  }

  @ReactMethod
  public void loadInterstitial(String unitId, Promise promise) {
    if (mInterstitialAd != null) {
      mInterstitialAd.load(unitId);
      promise.resolve(true);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not InterstitialAd");
    }
  }

  @ReactMethod
  public void isLoadedInterstitial(String unitId, Promise promise) {
    if (mInterstitialAd != null) {
      boolean result = mInterstitialAd.isLoaded(unitId);
      promise.resolve(result);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not InterstitialAd");
    }
  }
 
  @ReactMethod
  public void showInterstitial(Promise promise) {
    if (mInterstitialAd != null) {
      boolean result = mInterstitialAd.show();
      promise.resolve(result);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not InterstitialAd");
    }
  }


  public RewardedInterstitialAdShowListener mRewardedInterstitialAdListener() {
    return new RewardedInterstitialAdShowListener() {
      @Override
      public void onRewardedInterstitialAdSkipped(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onRewardedInterstitialAdSkip", payload);
      }
      @Override
      public void onRewardedInterstitialAdOpened(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onRewardedInterstitialAdOpened", payload);
      }
      @Override
      public void onRewardedInterstitialAdClosed(String unitId) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        sendEvent("onRewardedInterstitialAdClosed", payload);
      }
      @Override
      public void onRewardedInterstitialAdRewarded(String unitId, RewardItem rewardItem) {
        WritableMap rewarded = Arguments.createMap();
        rewarded.putString("unit", rewardItem.getType());
        rewarded.putInt("amount", (int)rewardItem.getAmount());
        sendEvent("onRewardedInterstitialAdRewarded", rewarded);
      }
      @Override
      public void onRewardedInterstitialAdFailedToShow(String unitId, AdiscopeError adiscopeError) {
        WritableMap payload = Arguments.createMap();
        payload.putString("unitId", unitId);
        payload.putString("errorDescription", adiscopeError.getDescription());
        payload.putString("errorXB3TraceID", adiscopeError.getXb3TraceId());
        sendEvent("onRewardedInterstitialAdFailedToShow", payload);
      }
    };
  }

  @ReactMethod
  public void getUnitStatusRewardedInterstitial(String unitId, Promise promise) {
    if (mRewardedInterstitialAd != null) {
      mRewardedInterstitialAd.getUnitStatus(unitId, new IUnitStatus() {
        @Override
        public void onResult(AdiscopeError error, UnitStatus unitStatus) {
          WritableMap result = Arguments.createMap();
          result.putBoolean("live", unitStatus != null && unitStatus.isLive());
          result.putBoolean("active", unitStatus != null && unitStatus.isActive());
          result.putString("error", error != null ? error.getDescription() : null);
          promise.resolve(result);
        }
      });
    } else {
      promise.resolve(false);
      promise.reject("exception", "not InterstitialAd");
    }
  }

  @ReactMethod
  public void preLoadAllRewardedInterstitial(Promise promise) {
    if (mRewardedInterstitialAd != null) {
      mRewardedInterstitialAd.preloadAll();
      promise.resolve(true);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not RewardedInterstitialAd");
    }
  }

  @ReactMethod
  public void preLoadRewardedInterstitial(ReadableArray unitIdList, Promise promise) {
    if (mRewardedInterstitialAd != null) {
      List<String> list = new ArrayList<>();
      if (unitIdList != null) {
        for (int i = 0; i < unitIdList.size(); i++) {
          if (unitIdList.getType(i) == ReadableType.String) {
            list.add(unitIdList.getString(i));
          }
        }
      }
      String[] unitIds = list.toArray(new String[0]);
      mRewardedInterstitialAd.preloadUnit(unitIds);
      promise.resolve(true);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not RewardedInterstitialAd");
    }
  }

  @ReactMethod
  public void showRewardedInterstitial(String unitId, Promise promise) {
    if (mRewardedInterstitialAd != null) {
      mRewardedInterstitialAd.show(unitId);
      promise.resolve(true);
    } else {
      promise.resolve(false);
      promise.reject("exception", "not RewardedInterstitialAd");
    }
  }
}
