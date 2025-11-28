import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Platform, View } from 'react-native';
// 초기 실행
import { initialize4Adiscope, isInitialize4Adiscope, setUserId4Adiscope, setRewardedCheckParam4Adiscope } from '@adiscope.ad/adiscope-react-native';
// Offerwall, AdEvent, RewardedVideo, Interstitial, RewardedInterstitial
import { useOfferwall4Adiscope, useAdEvent4Adiscope, useRewardedVideo4Adiscope, useInterstitial4Adiscope,
  useRewardedInterstitial4Adiscope } from '@adiscope.ad/adiscope-react-native';
// Other
import { getSDKVersion4Adiscope, getNetworksVersions4Adiscope, getUnitStatus4Adiscope, setVolumeOff4Adiscope, 
  showAdmobMediationDebugger4Adiscope, showMaxMediationDebugger4Adiscope, setShowWithLoad2BackgroundColor4Adiscope,
  setShowWithLoad2IndicatorStyleMedium4Adiscope, setShowWithLoad2ErrorAlertMsg4Adiscope } from '@adiscope.ad/adiscope-react-native';

export default function App() {

  const [text, setText] = useState('');
  useEffect(() => {}, [text])
  const setLogText = (newText: string) => {
    if (text.length > 0) {
      setText((preText) => newText + '\n' + preText);
    } else {
      setText(newText);
    }
  };

  const mediaId: string = Platform.OS === 'android' ? '' : '';
  const mediaSecret: string = Platform.OS === 'android' ? '' : '';
  const customData: string = '';
  const userId: string = 'React_Native_Tester_User';
  const subDomain: string = '';
  const offerwallId: string = Platform.OS === 'android' ? '' : '';
  const offerwallDetailId: string = Platform.OS === 'android' ? '' : '';
  const adEventUnitId: string = Platform.OS === 'android' ? '' : '';
  const rvUnitId: string = Platform.OS === 'android' ? '' : '';
  const itUnitId: string = Platform.OS === 'android' ? '' : '';
  const riUnitId: string = Platform.OS === 'android' ? '' : '';
  const riUnitId1: string = Platform.OS === 'android' ? '' : '';
  const riUnitId2: string = Platform.OS === 'android' ? '' : '';
  const riUnitId3: string = Platform.OS === 'android' ? '' : '';
  const riUnitId4: string = Platform.OS === 'android' ? '' : '';
  const riUnitId5: string = Platform.OS === 'android' ? '' : '';
  const bgColorRed: string = '0';
  const bgColorGreen: string = '0';
  const bgColorBlue: string = '0';
  const bgColorAlpha: string = '0.3';
  const alertMsg: string = '';

  // Start Set User Id
  const [strUserId, setStrUserId] = useState(userId);
  const userIdTextChange = (newText: string) => {
    setStrUserId(newText);
  };
  const btnSetUserId = async () => {
    const result = await setUserId4Adiscope(strUserId);
    setLogText('Set User Id =>' + strUserId + ' / ' + result);
  };
  // End Set User Id
  
  const [strCallbackTag, setStrCallbackTag] = useState('');
  const callbackTagTextChange = (newText: string) => {
    setStrCallbackTag(newText);
  };
  const [strChildYN, setStrChildYN] = useState('');
  const childYNTextChange = (newText: string) => {
    setStrChildYN(newText);
  };

  // Start Set CustomData
  const [strCustomData, setStrCustomData] = useState(customData);
  const customDataTextChange = (newText: string) => {
    setStrCustomData(newText);
  };
  const btnSetCustomData = async () => {
    const result = await setRewardedCheckParam4Adiscope(strCustomData);
    setLogText('Set CustomData =>' + strCustomData + ' / ' + result);
  };
  // End Set CustomData
  
  // Start Initialize
  const [statusInitialize, setStatusInitialize] = useState({
    isSuccess: false,
  });
  const btnInitialize0 = async () => {
    const resultUserId = await setUserId4Adiscope(strUserId);
    setLogText('Set User Id =>' + strUserId + ' / ' + resultUserId);
    const result = await initialize4Adiscope();
    setStatusInitialize(result);
  };
  const btnInitialize1 = async () => {
    const resultUserId = await setUserId4Adiscope(strUserId);
    setLogText('Set User Id =>' + strUserId + ' / ' + resultUserId);
    const result = await initialize4Adiscope(strCallbackTag);
    setStatusInitialize(result);
  };
  const btnInitialize2 = async () => {
    const resultUserId = await setUserId4Adiscope(strUserId);
    setLogText('Set User Id =>' + strUserId + ' / ' + resultUserId);
    const result = await initialize4Adiscope(strCallbackTag, strChildYN);
    setStatusInitialize(result);
  };
  const btnInitialize3 = async () => {
    const resultUserId = await setUserId4Adiscope(strUserId);
    setLogText('Set User Id =>' + strUserId + ' / ' + resultUserId);
    const result = await initialize4Adiscope(undefined, undefined, mediaId, mediaSecret);
    setStatusInitialize(result);
  };
  const btnInitialize4 = async () => {
    const resultUserId = await setUserId4Adiscope(strUserId);
    setLogText('Set User Id =>' + strUserId + ' / ' + resultUserId);
    const result = await initialize4Adiscope(strCallbackTag, undefined, mediaId, mediaSecret);
    setStatusInitialize(result);
  };
  const btnInitialize5 = async () => {
    const resultUserId = await setUserId4Adiscope(strUserId);
    setLogText('Set User Id =>' + strUserId + ' / ' + resultUserId);
    const result = await initialize4Adiscope(strCallbackTag, strChildYN, mediaId, mediaSecret);
    setStatusInitialize(result);
  };

  const btnIsInitialize = async () => {
    const result = await isInitialize4Adiscope();
    setLogText('isInitialize => ' + result);
  };
  // End Initialize

  const btnGetSDKVersion = async () => {
    const result = await getSDKVersion4Adiscope();
    setLogText('getSDKVersion => ' + result);
  }

  const btnGetNetworkVersion = async () => {
    const result = await getNetworksVersions4Adiscope();
    setLogText('getNetworksVersions => ' + result);
  }

  const [strUnitStatusUnitId, setStrUnitStatusUnitId] = useState('');
  const unitStatusUnitIdTextChange = (newText: string) => {
    setStrUnitStatusUnitId(newText);
  };
  const [statusUnitStatus, setStatusUnitStatus] = useState({
    live: null,
    active: null,
    error: null,
  });
  const btnGetUnitStatus = async () => {
    const result = await getUnitStatus4Adiscope(strUnitStatusUnitId);
    setStatusUnitStatus(result);
  }

  const btnShowMaxMediationDebugger = async () => {
    const result = await showMaxMediationDebugger4Adiscope();
    setLogText('Show Max Mediation Debugger => ' + result);
  }

  const btnShowAdmobMediationDebugger = async () => {
    const result = await showAdmobMediationDebugger4Adiscope();
    setLogText('Show Admob Mediation Debugger => ' + result);
  }

  const btnSetVolumeOn = async () => {
    const result = await setVolumeOff4Adiscope(false);
    setLogText('Ad Sound On => ' + result);
  }

  const btnSetVolumeOff = async () => {
    const result = await setVolumeOff4Adiscope(true);
    setLogText('Ad Sound Off => ' + result);
  }

  const [strBgColorRed, setStrBgColorRed] = useState(bgColorRed);
  const bgColorRedTextChange = (newText: string) => {
    setStrBgColorRed(newText);
  };
  const [strBgColorGreen, setStrBgColorGreen] = useState(bgColorGreen);
  const bgColorGreenTextChange = (newText: string) => {
    setStrBgColorGreen(newText);
  };
  const [strBgColorBlue, setStrBgColorBlue] = useState(bgColorBlue);
  const bgColorBlueTextChange = (newText: string) => {
    setStrBgColorBlue(newText);
  };
  const [strBgColorAlpha, setStrBgColorAlpha] = useState(bgColorAlpha);
  const bgColorAlphaTextChange = (newText: string) => {
    setStrBgColorAlpha(newText);
  };

  const btnSetShowWithLoad2BackgroundColor = async () => {
    const result = await setShowWithLoad2BackgroundColor4Adiscope(strBgColorRed, strBgColorGreen, strBgColorBlue, strBgColorAlpha);
    setLogText('Show With Load Background Color => ' + result);
  }

  const [isStyleMedium, setIsStyleMedium] = useState(false);
  const [isStyleHidden, setIsStyleHidden] = useState(false);

  const btnSetShowWithLoad2IndicatorStyleMedium = async () => {
    const newValue = !isStyleMedium;
    setIsStyleMedium(newValue);

    const result = await setShowWithLoad2IndicatorStyleMedium4Adiscope(newValue, isStyleHidden);
    setLogText('Show With Load Indicator Style Medium => ' + result);
  }

  const btnSetShowWithLoad2IndicatorisStyleHidden = async () => {
    const newValue = !isStyleHidden;
    setIsStyleHidden(newValue);

    const result = await setShowWithLoad2IndicatorStyleMedium4Adiscope(isStyleMedium, newValue);
    setLogText('Show With Load Indicatoris Style Hidden => ' + result);
  }

  const [strAlertMsg, setStrAlertMsg] = useState(alertMsg);
  const alertMsgTextChange = (newText: string) => {
    setStrAlertMsg(newText);
  };
  const [isAlertHidden, setIsAlertHidden] = useState(false);

  const btnSetShowWithLoad2ErrorAlertMsg = async () => {
    const result = await setShowWithLoad2ErrorAlertMsg4Adiscope(strAlertMsg, isAlertHidden);
    setLogText('Show With Load Error Alert Msg => ' + result);
  }

  const btnSetShowWithLoad2ErrorAlertHidden = async () => {
    const newValue = !isAlertHidden;
    setIsAlertHidden(newValue);

    const result = await setShowWithLoad2ErrorAlertMsg4Adiscope(strAlertMsg, newValue);
    setLogText('Show With Load Error Alert Hidden=> ' + result);
  }

  // Start Offerwall
  const { showOfferwall4Adiscope, showOfferwallDetail4Adiscope, showOfferwallDetailFromUrl4Adiscope, 
    openedOfferwall4Adiscope, closedOfferwall4Adiscope, failedToShowOfferwall4Adiscope } = useOfferwall4Adiscope();
    
  const [strOfferwallUnitId, setStrOfferwallUnitId] = useState(offerwallId);
  const offerwallUnitIdTextChange = (newText: string) => {
    setStrOfferwallUnitId(newText);
  };
  const btnShowOfferwall = async () => {
    const result = await showOfferwall4Adiscope(strOfferwallUnitId);
    setLogText('Show Offerwal => ' + result);
  }

  const [strOfferwallDetailId, setStrOfferwallDetailId] = useState(offerwallDetailId);
  const offerwallDetailIdTextChange = (newText: string) => {
    setStrOfferwallDetailId(newText);
  };
  const btnShowOfferwallDetail = async () => {
    const result = await showOfferwallDetail4Adiscope(strOfferwallUnitId, strOfferwallDetailId);
    setLogText('Show Offerwall Detail => ' + result);
  }
  const btnShowOfferwallDetailFromUrl = async () => {
    const detailUrl = 'https://' + subDomain + '.adiscope.com/' + mediaId + '/' + strOfferwallUnitId + '/0/' + strOfferwallDetailId;
    const result = await showOfferwallDetailFromUrl4Adiscope(detailUrl);
    setLogText('Show Offerwall Detail From Url => ' + result);
  }
  // End Offerwall

  // Start AdEvent
  const { showAdEvent4Adiscope, openedAdEvent4Adiscope, closedAdEvent4Adiscope, failedToShowAdEvent4Adiscope } = useAdEvent4Adiscope();
    
  const [strAdEventUnitId, setStrAdEventUnitId] = useState(adEventUnitId);
  const adEventUnitIdTextChange = (newText: string) => {
    setStrAdEventUnitId(newText);
  };
  const btnShowAdEvent = async () => {
    const result = await showAdEvent4Adiscope(strAdEventUnitId);
    setLogText('Show AdEvent => ' + result);
  }
  // End AdEvent

  // Start RewardedVideo
  const { showWithLoadRewardedVideo4Adiscope, loadRewardedVideo4Adiscope, isLoadedRewardedVideo4Adiscope, 
    showRewardedVideo4Adiscope, loadedRewardedVideo4Adiscope, failedToLoadRewardedVideo4Adiscope, 
    openedRewardedVideo4Adiscope, closedRewardedVideo4Adiscope, rewardedRewardedVideo4Adiscope,
    failedToShowRewardedVideo4Adiscope } = useRewardedVideo4Adiscope();

  const [strRewardedVideoUnitId, setStrRewardedVideoUnitId] = useState(rvUnitId);
  const rewardedVideoUnitIdTextChange = (newText: string) => {
    setStrRewardedVideoUnitId(newText);
  };
  const btnShowWithLoadRewardedVideo = async () => {
    const result = await showWithLoadRewardedVideo4Adiscope(strRewardedVideoUnitId);
    setLogText('Click RewardedVideo ShowWithLoad => ' + result);
  }
  const btnLoadRewardedVideo = async () => {
    const result = await loadRewardedVideo4Adiscope(strRewardedVideoUnitId);
    setLogText('Click RewardedVideo Load => ' + result);
  }
  const btnIsLoadedRewardedVideo = async () => {
    const result = await isLoadedRewardedVideo4Adiscope(strRewardedVideoUnitId);
    setLogText('RewardedVideo IsLoad => ' + result);
  }
  const btnShowRewardedVideo = async () => {
    const result = await showRewardedVideo4Adiscope();
    setLogText('RewardedVideo Show => ' + result);
  }
  // End RewardedVideo

  // Start Interstitial
  const { showWithLoadInterstitial4Adiscope, loadInterstitial4Adiscope, isLoadedInterstitial4Adiscope, 
    showInterstitial4Adiscope, loadedInterstitial4Adiscope, failedToLoadInterstitial4Adiscope, 
    openedInterstitial4Adiscope, closedInterstitial4Adiscope, failedToShowInterstitial4Adiscope } = useInterstitial4Adiscope();

  const [strInterstitialUnitId, setStrInterstitialUnitId] = useState(itUnitId);
  const interstitialUnitIdTextChange = (newText: string) => {
    setStrInterstitialUnitId(newText);
  };
  const btnShowWithLoadInterstitial = async () => {
    const result = await showWithLoadInterstitial4Adiscope(strInterstitialUnitId);
    setLogText('Click Interstitial ShowWithLoad => ' + result);
  }
  const btnLoadInterstitial = async () => {
    const result = await loadInterstitial4Adiscope(strInterstitialUnitId);
    setLogText('Click Interstitial Load => ' + result);
  }
  const btnIsLoadedInterstitial = async () => {
    const result = await isLoadedInterstitial4Adiscope(strInterstitialUnitId);
    setLogText('Interstitial IsLoad => ' + result);
  }
  const btnShowInterstitial = async () => {
    const result = await showInterstitial4Adiscope();
    setLogText('Interstitial Show => ' + result);
  }
  // End Interstitial

  // Start RewardedInterstitial
  const { preLoadAllRewardedInterstitial4Adiscope, preLoadRewardedInterstitial4Adiscope,
    showRewardedInterstitial4Adiscope, skipRewardedInterstitial4Adiscope, rewardedRewardedInterstitial4Adiscope,
    openedRewardedInterstitial4Adiscope, closedRewardedInterstitial4Adiscope,
    failedToShowRewardedInterstitial4Adiscope, getUnitStatusRewardedInterstitial4Adiscope } = useRewardedInterstitial4Adiscope();

  const [strRewardedInterstitialUnitId, setStrRewardedInterstitialUnitId] = useState(riUnitId);
  const rewardedInterstitialUnitIdTextChange = (newText: string) => {
    setStrRewardedInterstitialUnitId(newText);
  };
  const [strRewardedInterstitialUnitId1, setStrRewardedInterstitialUnitId1] = useState(riUnitId1);
  const rewardedInterstitialUnitId1TextChange = (newText: string) => {
    setStrRewardedInterstitialUnitId1(newText);
  };
  const [strRewardedInterstitialUnitId2, setStrRewardedInterstitialUnitId2] = useState(riUnitId2);
  const rewardedInterstitialUnitId2TextChange = (newText: string) => {
    setStrRewardedInterstitialUnitId2(newText);
  };
  const [strRewardedInterstitialUnitId3, setStrRewardedInterstitialUnitId3] = useState(riUnitId3);
  const rewardedInterstitialUnitId3TextChange = (newText: string) => {
    setStrRewardedInterstitialUnitId3(newText);
  };
  const [strRewardedInterstitialUnitId4, setStrRewardedInterstitialUnitId4] = useState(riUnitId4);
  const rewardedInterstitialUnitId4TextChange = (newText: string) => {
    setStrRewardedInterstitialUnitId4(newText);
  };
  const [strRewardedInterstitialUnitId5, setStrRewardedInterstitialUnitId5] = useState(riUnitId5);
  const rewardedInterstitialUnitId5TextChange = (newText: string) => {
    setStrRewardedInterstitialUnitId5(newText);
  };
  const [statusUnitStatusRewardedInterstitial, setStatusUnitStatusRewardedInterstitial] = useState({
    live: null,
    active: null,
    error: null,
  });
  const btnGetUnitStatusRewardedInterstitial = async () => {
    const result = await getUnitStatusRewardedInterstitial4Adiscope(strRewardedInterstitialUnitId);
    setStatusUnitStatusRewardedInterstitial(result);
  }
  const btnPreLoadAllRewardedInterstitial = async () => {
    const result = await preLoadAllRewardedInterstitial4Adiscope();
    setLogText('Click PreLoad All RewardedInterstitial => ' + result)
  }
  const btnPreLoadRewardedInterstitial = async () => {
    const result = await preLoadRewardedInterstitial4Adiscope([strRewardedInterstitialUnitId1, strRewardedInterstitialUnitId2, strRewardedInterstitialUnitId3, strRewardedInterstitialUnitId4, strRewardedInterstitialUnitId5]);
    setLogText('Click PreLoad UnitIDs RewardedInterstitial => ' + result);
  }
  const btnShowRewardedInterstitial = async () => {
    const result = await showRewardedInterstitial4Adiscope(strRewardedInterstitialUnitId);
    setLogText('RewardedInterstitial Show => ' + result);
  }
  // End RewardedInterstitial

  // Start Initialize CallBack
  useEffect(() => {
    setLogText('Initialize => ' + statusInitialize['isSuccess']);
  }, [statusInitialize]);
  // End Initialize CallBack

  useEffect(() => {
    setLogText(strUnitStatusUnitId + ' UnitID Status => live:' + statusUnitStatus['live'] + ' / active:' + statusUnitStatus['active']);
  }, [statusUnitStatus]);

  // Start Offerwall CallBack
  useEffect(() => {
    if (openedOfferwall4Adiscope) {
      setLogText('onOfferwallAdOpened => ' + openedOfferwall4Adiscope['unitId']);
    }
  }, [openedOfferwall4Adiscope]);
  useEffect(() => {
    if (closedOfferwall4Adiscope) {
      setLogText('onOfferwallAdClosed => ' + closedOfferwall4Adiscope['unitId']);
    }
  }, [closedOfferwall4Adiscope]);
  useEffect(() => {
    if (failedToShowOfferwall4Adiscope) {
      setLogText('onOfferwallAdFailedToShow => ' + failedToShowOfferwall4Adiscope['unitId'] + ", " + failedToShowOfferwall4Adiscope['errorCode'] + ", " + failedToShowOfferwall4Adiscope['errorDescription'] + ", " + failedToShowOfferwall4Adiscope['errorXB3TraceID']);
    }
  }, [failedToShowOfferwall4Adiscope]);
  // End Offerwall CallBack

  // Start AdEvent CallBack
  useEffect(() => {
    if (openedAdEvent4Adiscope) {
      setLogText('onAdEventOpened => ' + openedAdEvent4Adiscope['unitId']);
    }
  }, [openedAdEvent4Adiscope]);
  useEffect(() => {
    if (closedAdEvent4Adiscope) {
      setLogText('onAdEventClosed => ' + closedAdEvent4Adiscope['unitId']);
    }
  }, [closedAdEvent4Adiscope]);
  useEffect(() => {
    if (failedToShowAdEvent4Adiscope) {
      setLogText('onAdEventFailedToShow => ' + failedToShowAdEvent4Adiscope['unitId'] + ", " + failedToShowAdEvent4Adiscope['errorCode'] + ", " + failedToShowAdEvent4Adiscope['errorDescription']);
    }
  }, [failedToShowAdEvent4Adiscope]);
  // End AdEvent CallBack

  // Start RewardedVideo CallBack
  useEffect(() => {
    if (loadedRewardedVideo4Adiscope) {
      setLogText('onRewardedVideoAdLoaded => ' + loadedRewardedVideo4Adiscope['unitId']);
    }
  }, [loadedRewardedVideo4Adiscope]);
  useEffect(() => {
    if (failedToLoadRewardedVideo4Adiscope) {
      setLogText('onRewardedVideoAdFailedToLoad => ' + failedToLoadRewardedVideo4Adiscope['unitId'] + ", " + failedToLoadRewardedVideo4Adiscope['errorCode'] + ", " + failedToLoadRewardedVideo4Adiscope['errorDescription'] + ", " + failedToLoadRewardedVideo4Adiscope['errorXB3TraceID']);
    }
  }, [failedToLoadRewardedVideo4Adiscope]);
  useEffect(() => {
    if (openedRewardedVideo4Adiscope) {
      setLogText('onRewardedVideoAdOpened => ' + openedRewardedVideo4Adiscope['unitId']);
    }
  }, [openedRewardedVideo4Adiscope]);
  useEffect(() => {
    if (closedRewardedVideo4Adiscope) {
      setLogText('onRewardedVideoAdClosed => ' + closedRewardedVideo4Adiscope['unitId']);
    }
  }, [closedRewardedVideo4Adiscope]);
  useEffect(() => {
    if (rewardedRewardedVideo4Adiscope) {
      setLogText('onRewarded => ' + rewardedRewardedVideo4Adiscope['amount'] + rewardedRewardedVideo4Adiscope['unit']);
    }
  }, [rewardedRewardedVideo4Adiscope]);
  useEffect(() => {
    if (failedToShowRewardedVideo4Adiscope) {
      setLogText('onRewardedVideoAdFailedToShow => ' + failedToShowRewardedVideo4Adiscope['unitId'] + ", " + failedToShowRewardedVideo4Adiscope['errorCode'] + ", " + failedToShowRewardedVideo4Adiscope['errorDescription'] + ", " + failedToShowRewardedVideo4Adiscope['errorXB3TraceID']);
    }
  }, [failedToShowRewardedVideo4Adiscope]);
  // End RewardedVideo CallBack

  // Start Interstitial CallBack
  useEffect(() => {
    if (loadedInterstitial4Adiscope) {
      setLogText('onInterstitialAdLoaded => ' + loadedInterstitial4Adiscope['unitId']);
    }
  }, [loadedInterstitial4Adiscope]);
  useEffect(() => {
    if (failedToLoadInterstitial4Adiscope) {
      setLogText('onInterstitialAdFailedToLoad => ' + failedToLoadInterstitial4Adiscope['unitId'] + ", " + failedToLoadInterstitial4Adiscope['errorCode'] + ", " + failedToLoadInterstitial4Adiscope['errorDescription'] + ", " + failedToLoadInterstitial4Adiscope['errorXB3TraceID']);
    }
  }, [failedToLoadInterstitial4Adiscope]);
  useEffect(() => {
    if (openedInterstitial4Adiscope) {
      setLogText('onInterstitialAdOpened => ' + openedInterstitial4Adiscope['unitId']);
    }
  }, [openedInterstitial4Adiscope]);
  useEffect(() => {
    if (closedInterstitial4Adiscope) {
      setLogText('onInterstitialAdClosed => ' + closedInterstitial4Adiscope['unitId']);
    }
  }, [closedInterstitial4Adiscope]);
  useEffect(() => {
    if (failedToShowInterstitial4Adiscope) {
      setLogText('onInterstitialAdFailedToShow => ' + failedToShowInterstitial4Adiscope['unitId'] + ", " + failedToShowInterstitial4Adiscope['errorCode'] + ", " + failedToShowInterstitial4Adiscope['errorDescription'] + ", " + failedToShowInterstitial4Adiscope['errorXB3TraceID']);
    }
  }, [failedToShowInterstitial4Adiscope]);
  // End Interstitial CallBack

  // Start RewardedInterstitial CallBack
  useEffect(() => {
    setLogText(strRewardedInterstitialUnitId + ' RewardedInterstitial UnitID Status => live:' + statusUnitStatusRewardedInterstitial['live'] + ' / active:' + statusUnitStatusRewardedInterstitial['active']);
  }, [statusUnitStatusRewardedInterstitial]);
  useEffect(() => {
    if (skipRewardedInterstitial4Adiscope) {
      setLogText('onRewardedInterstitialAdSkip => ' + skipRewardedInterstitial4Adiscope['unitId']);
    }
  }, [skipRewardedInterstitial4Adiscope]);
  useEffect(() => {
    if (openedRewardedInterstitial4Adiscope) {
      setLogText('onRewardedInterstitialAdOpened => ' + openedRewardedInterstitial4Adiscope['unitId']);
    }
  }, [openedRewardedInterstitial4Adiscope]);
  useEffect(() => {
    if (closedRewardedInterstitial4Adiscope) {
      setLogText('onRewardedInterstitialAdClosed => ' + closedRewardedInterstitial4Adiscope['unitId']);
    }
  }, [closedRewardedInterstitial4Adiscope]);
  useEffect(() => {
    if (rewardedRewardedInterstitial4Adiscope) {
      setLogText('onRewardedInterstitialAdRewarded => ' + rewardedRewardedInterstitial4Adiscope['amount'] + rewardedRewardedInterstitial4Adiscope['unit']);
    }
  }, [rewardedRewardedInterstitial4Adiscope]);
  useEffect(() => {
    if (failedToShowRewardedInterstitial4Adiscope) {
      setLogText('onRewardedInterstitialAdFailedToShow => ' + failedToShowRewardedInterstitial4Adiscope['unitId'] + ", " + failedToShowRewardedInterstitial4Adiscope['errorCode'] + ", " + failedToShowRewardedInterstitial4Adiscope['errorDescription'] + ", " + failedToShowRewardedInterstitial4Adiscope['errorXB3TraceID']);
    }
  }, [failedToShowRewardedInterstitial4Adiscope]);
  // End RewardedInterstitial CallBack

  useEffect(() => {
    setLogText('초기 실행');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adiscope RN Example App</Text>
      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={10}
        value={text}
        editable={true}
        scrollEnabled={true}
        selectTextOnFocus={false}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>MediaId</Text>
          <TextInput style={styles.textInput} value={mediaId} editable={false} selectTextOnFocus={false} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>UserId</Text>
          <TextInput style={styles.textInput} value={strUserId} onChangeText={userIdTextChange} />
        </View>
        <TouchableOpacity style={styles.button} onPress={btnSetUserId}>
          <Text style={styles.button_name}>Set User Id</Text>
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Callback Tag</Text>
          <TextInput style={styles.textInput} value={strCallbackTag} onChangeText={callbackTagTextChange} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Child YN</Text>
          <TextInput style={styles.textInput} value={strChildYN} onChangeText={childYNTextChange} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonM} onPress={btnInitialize0}>
            <Text style={styles.button_name}>initialize</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonM} onPress={btnInitialize1}>
            <Text style={styles.button_name}>Initialize(callbackTag)</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={btnInitialize2}>
          <Text style={styles.button_name}>Initialize(callbackTag, childYN)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={btnInitialize3}>
          <Text style={styles.button_name}>Initialize(mediaId, mediaSecret)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={btnInitialize4}>
          <Text style={styles.button_name}>Initialize(mediaId, mediaSecret, callbackTag)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={btnInitialize5}>
          <Text style={styles.button_name}>Initialize(mediaId, mediaSecret, callbackTag, childYN)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={btnIsInitialize}>
          <Text style={styles.button_name}>isInitialize</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Other</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>CustomData</Text>
          <TextInput style={styles.textInput} value={strCustomData} onChangeText={customDataTextChange} />
        </View>
        <TouchableOpacity style={styles.button} onPress={btnSetCustomData}>
          <Text style={styles.button_name}>Set CustomData</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonM} onPress={btnGetSDKVersion}>
            <Text style={styles.button_name}>Print SDK Version</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonM} onPress={btnGetNetworkVersion}>
            <Text style={styles.button_name}>Print Network Version</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID</Text>
          <TextInput style={styles.textInput} onChangeText={unitStatusUnitIdTextChange} />
        </View>
        <TouchableOpacity style={styles.button} onPress={btnGetUnitStatus}>
          <Text style={styles.button_name}>Get UnitID Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={btnShowMaxMediationDebugger}>
          <Text style={styles.button_name}>Show Max Mediation Debugger - 앱 구동 후 첫 진입 시 5초간 대기 후 화면 터치 가능</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={btnShowAdmobMediationDebugger}>
          <Text style={styles.button_name}>Show Admob Mediation Debugger - 미동작 시 애드몹 물량 로드 후 진입 가능 (이니셜라이즈 필요)</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonM} onPress={btnSetVolumeOn}>
            <Text style={styles.button_name}>Ad Sound On</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonM} onPress={btnSetVolumeOff}>
            <Text style={styles.button_name}>Ad Sound Off</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subTitle}>Offerwall</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID</Text>
          <TextInput style={styles.textInput} value={strOfferwallUnitId} onChangeText={offerwallUnitIdTextChange} />
        </View>
        <TouchableOpacity style={styles.button} onPress={btnShowOfferwall}>
          <Text style={styles.button_name}>Show Offerwall</Text>
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Detail Id</Text>
          <TextInput style={styles.textInput} value={strOfferwallDetailId} onChangeText={offerwallDetailIdTextChange} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={btnShowOfferwallDetail}>
            <Text style={styles.button_name}>Show Offerwall Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonM} onPress={btnShowOfferwallDetailFromUrl}>
            <Text style={styles.button_name}>Show Offerwall Detail From URL</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subTitle}>AdEvent</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID</Text>
          <TextInput style={styles.textInput} value={strAdEventUnitId} onChangeText={adEventUnitIdTextChange} />
        </View>
        <TouchableOpacity style={styles.button} onPress={btnShowAdEvent}>
          <Text style={styles.button_name}>Show AdEvent</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>RewardedVideo</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID</Text>
          <TextInput style={styles.textInput} value={strRewardedVideoUnitId} onChangeText={rewardedVideoUnitIdTextChange} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={btnLoadRewardedVideo}>
            <Text style={styles.button_name}>Load</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={btnIsLoadedRewardedVideo}>
            <Text style={styles.button_name}>isLoaded</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonM} onPress={btnShowRewardedVideo}>
            <Text style={styles.button_name}>Show</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={btnShowWithLoadRewardedVideo}>
          <Text style={styles.button_name}>Show With Load</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Interstitial</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID</Text>
          <TextInput style={styles.textInput} value={strInterstitialUnitId} onChangeText={interstitialUnitIdTextChange} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={btnLoadInterstitial}>
            <Text style={styles.button_name}>Load</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={btnIsLoadedInterstitial}>
            <Text style={styles.button_name}>isLoaded</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonM} onPress={btnShowInterstitial}>
            <Text style={styles.button_name}>Show</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={btnShowWithLoadInterstitial}>
          <Text style={styles.button_name}>Show With Load</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>RewardedInterstitial</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID1</Text>
          <TextInput style={styles.textInput} value={strRewardedInterstitialUnitId1} onChangeText={rewardedInterstitialUnitId1TextChange} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID2</Text>
          <TextInput style={styles.textInput} value={strRewardedInterstitialUnitId2} onChangeText={rewardedInterstitialUnitId2TextChange} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID3</Text>
          <TextInput style={styles.textInput} value={strRewardedInterstitialUnitId3} onChangeText={rewardedInterstitialUnitId3TextChange} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID4</Text>
          <TextInput style={styles.textInput} value={strRewardedInterstitialUnitId4} onChangeText={rewardedInterstitialUnitId4TextChange} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID5</Text>
          <TextInput style={styles.textInput} value={strRewardedInterstitialUnitId5} onChangeText={rewardedInterstitialUnitId5TextChange} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={btnPreLoadAllRewardedInterstitial}>
            <Text style={styles.button_name}>PreLoad All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonM} onPress={btnPreLoadRewardedInterstitial}>
            <Text style={styles.button_name}>PreLoad UnitIDs</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Unit ID</Text>
          <TextInput style={styles.textInput} value={strRewardedInterstitialUnitId} onChangeText={rewardedInterstitialUnitIdTextChange} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={btnShowRewardedInterstitial}>
            <Text style={styles.button_name}>Show</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonM} onPress={btnGetUnitStatusRewardedInterstitial}>
            <Text style={styles.button_name}>GetUnitStatus</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subTitle}>Show With Load</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Red</Text>
          <TextInput style={styles.textInput} value={strBgColorRed} onChangeText={bgColorRedTextChange} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Red</Text>
          <TextInput style={styles.textInput} value={strBgColorGreen} onChangeText={bgColorGreenTextChange} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Red</Text>
          <TextInput style={styles.textInput} value={strBgColorBlue} onChangeText={bgColorBlueTextChange} />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Red</Text>
          <TextInput style={styles.textInput} value={strBgColorAlpha} onChangeText={bgColorAlphaTextChange} />
        </View>
        <TouchableOpacity style={styles.button} onPress={btnSetShowWithLoad2BackgroundColor}>
          <Text style={styles.button_name}>Set Color</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={btnSetShowWithLoad2IndicatorStyleMedium}>
          <Text style={styles.button_name}>Set Indicator Style</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={btnSetShowWithLoad2IndicatorisStyleHidden}>
          <Text style={styles.button_name}>Set Indicator Hidden</Text>
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputTitle}>Set Alert Msg</Text>
          <TextInput style={styles.textInput} value={strAlertMsg} onChangeText={alertMsgTextChange} />
        </View>
        <TouchableOpacity style={styles.button} onPress={btnSetShowWithLoad2ErrorAlertMsg}>
          <Text style={styles.button_name}>Set Error Alert Msg</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={btnSetShowWithLoad2ErrorAlertHidden}>
          <Text style={styles.button_name}>Set Error Alert Hidden</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    flex: 1,
  },
  scrollInputContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    flexGrow: 1,
  },
  scrollContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  textArea: {
    color: 'black',
    height: 140,
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  textInputContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textInputTitle: {
    color: 'black',
    width: 85,
    height: '100%',
    textAlignVertical: 'center',
    marginStart: 10,
    justifyContent: 'space-between',
  },
  textInput: {
    height: 30,
    flex: 1,
    padding: 6,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginEnd: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 40,
    padding: 10,
    marginStart: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonM: {
    height: 40,
    flex: 1,
    padding: 10,
    marginStart: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  button_name: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});
