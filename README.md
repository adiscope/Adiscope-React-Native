# Adiscope React Native
[![GitHub package.json version](https://img.shields.io/badge/ReactNative-5.0.0-blue)](https://github.com/adiscope/Adiscope-React-Native/releases)
[![GitHub package.json version](https://img.shields.io/badge/Android-5.0.0-blue)](https://github.com/adiscope/Adiscope-Android-Sample)
[![GitHub package.json version](https://img.shields.io/badge/iOS-5.0.0-blue)](https://github.com/adiscope/Adiscope-iOS-Sample)
[![GitHub package.json version](https://img.shields.io/badge/Unity-5.0.0-blue)](https://github.com/adiscope/Adiscope-Unity-UPM)
[![GitHub package.json version](https://img.shields.io/badge/Flutter-5.0.0-blue)](https://pub.dev/packages/adiscope_flutter_plugin)

- ⚠️ **Expo 지원 불가**
- Android Target API Level : 31+
- Android Minimum API Level : 21
- iOS Minimum Version : 13.0
- Xcode Minimum Version : Xcode 16.0
<details>
<summary>Networks Version</summary>
<div markdown="1">  

| Ad Network          | Android Version | iOS Version |
|---------------------|-----------------|-------------|
| AdMob               | 24.4.0          | 12.11.0     |
| Amazon              | 11.0.1          | 5.3.1       |
| AppLovin            | 13.3.1          | 13.4.0      |
| BidMachine          | 3.3.0           | 3.4.0       |
| Bigo                | 5.5.1           | 없음         |
| Chartboost          | 9.8.3           | 9.9.2       |
| DT Exchange         | 8.3.7           | 8.3.8       |
| InMobi              | 10.8.3          | 10.8.6      |
| Ironsource          | 8.9.1           | 8.10.0.0    |
| Liftoff(Vungle)     | 7.5.0           | 7.5.2       |
| Line                | 2.9.20250110    | 없음         |
| Meta(Fan)           | 6.20.0          | 6.20.1      |
| Mintegral(Mobvista) | 16.9.71         | 7.7.9       |
| Moloco              | 3.10.0          | 3.12.1      |
| Ogury               | 6.0.1           | 5.1.1       |
| Pangle              | 7.7.0.2         | 7.4.1.1     |
| Pubmatic            | 4.9.1           | 없음         |
| Smaato              | 22.7.2          | 없음         |
| Unity Ads           | 4.15.0          | 4.16.1      |

> 기존 gms SDK 사용중인 퍼블리셔는 admob 혹은 max 어댑터 사용 시 24버전으로 마이그레이션 필요 [(관련 문서)](https://developers.google.com/admob/android/migration?hl=en)
> - gms 22 버전: 애디스콥 `3.3.0`~`3.10.6`
> - gms 23 버전: 애디스콥 `4.1.0`~`4.3.1`
> - gms 24 버전: 애디스콥 `4.4.0` 이상

</div>
</details>
<br/>

## Contents
#### [Add the Adiscope package to Your Project](#add-the-adiscope-package-to-your-project-1)
- [Installation](#1-installation)
- [Setup Android](#2-setup-android)
- [Setup iOS](#3-setup-ios)
#### [Adiscope Overview](#adiscope-overview-1)
- [Import](#1-import)
- [Initialize](#2-initialize)
- [사용자 정보 설정](#3-사용자-정보-설정)
- [Offerwall](#4-offerwall)
- [RewardedVideo](#5-rewardedvideo)
- [Interstitial](#6-interstitial)
- [RewardedInterstitial](#7-rewardedinterstitial)
- [Etc](#8-etc)
#### [웹사이트 필수 등록](#웹사이트-필수-등록-android-전용)
#### [Adiscope Server 연동하기](./docs/reward_callback_info.md)
#### [Privacy Manifest 정책 적용](#privacy-manifest-정책-적용-ios-전용)
#### [Adiscope Error Information](./docs/error_info.md)
#### etc
- [Sample App 폴더 이동](./example)
- [Releases](../../releases)
<br/>


## Add the Adiscope package to Your Project
### 1. Installation
#### A. Latest version Installation
```ruby
npm install @adiscope.ad/adiscope-react-native
```
- 프로젝트의 IDE루트 경로에서 터미널을 열고 위과 같이 실행하여 설치
<br/>

#### B. Specific version Installation
```ruby
npm install @adiscope.ad/adiscope-react-native@5.0.0
```
- 프로젝트의 IDE루트 경로에서 터미널을 열고 위과 같이 특정 버전을 추가로 실행하여 설치    
<br/><br/><br/>

### 2. Setup Android
#### A. Setup AndroidManifest
```xml
<application>
    <meta-data android:name="adiscope_media_id" android:value="${adiscope_media_id}"/>
    <meta-data android:name="adiscope_media_secret" android:value="${adiscope_media_secret}"/>
    <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${adiscope_admob_id}"/>
</application>
```
- Android 프로젝트의 `AndroidManifest.xml`파일에 다음과 같은 설정
- meta-data 복사해서 변경 없이 추가 (아래 B의 Module Gradle의 변수 값을 참조 함)
<br/>

#### B. Setup Module Gradle
```gradle
android {
    defaultConfig {
        manifestPlaceholders = [
                adiscope_media_id    : "media id 기입 필요",
                adiscope_media_secret: "media secret 기입 필요",
                adiscope_sub_domain  : "sub domain 기입 필요",		// 옵션값 (오퍼월 상세페이지 이동 기능, 필요시 담당자 전달 예정)
                adiscope_admob_id    : "admob_app_id 기입 필요"           // Admob 사용 시 필요
        ]
    }
}
```
- 애디스콥 측에 media_id 와 media_secret, sub_domain 문의!
- adiscope_media_id: 매체 아이디
- adiscope_media_secret: 매체 시크릿키
- adiscope_sub_domain: 옵션값 (오퍼월 상세페이지 이동 기능, 필요시 담당자 전달 예정)
- adiscope_admob_id: admob을 접속 하기 위한 키
- 프로젝트 파일 내에 {projectroot}/android/app/build.gradle 파일에 `manifestPlaceholders` 추가    
<br/><br/><br/>

### 3. Setup iOS
#### A. Setup Podfile
```ruby
target 'AdiscopeReactNativeExample' do
  config = use_native_modules!

  pod 'AdiscopeMediaAdManager', '5.0.0'
  pod 'AdiscopeMediaAdMob', '5.0.0'
  pod 'AdiscopeMediaChartBoost', '5.0.0'
  pod 'AdiscopeMediaPangle', '5.0.0'
  pod 'AdiscopeMediaVungle', '5.0.0'
  pod 'AdiscopeMediaMax', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterAdManager', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterAdMob', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterAmazon', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterBidMachine', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterChartBoost', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterDTExchange', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterFan', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterInMobi', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterIronSource', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterMobVista', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterMoloco', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterOgury', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterPangle', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterUnityAds', '5.0.0'
  pod 'AdiscopeMediaMaxAdapterVungle', '5.0.0'

  use_react_native!(
    :path => config[:reactNativePath],
    # An absolute path to your application root.
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )

  target 'AdiscopeReactNativeExampleTests' do
    inherit! :complete
    # Pods for testing
  end

  post_install do |installer|
    # https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L197-L202
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false,
      # :ccache_enabled => true
    )
  end
end
```
- 프로젝트 파일 내에 {projectroot}/ios/Podfile 파일에 `pod` 추가
- Third Party 네트워크사들을 확인 후 필요한 네트워크사들만 추가
- Adapter Version이 상이할 경우 Initialize시 Xcode Log를 통해 확인 가능<br/>
![AdapterChecked](https://github.com/user-attachments/assets/c0c4e33f-d535-45fb-8115-115e57c70522)<br/>
<br/>

#### B. Pod Install
```ruby
pod install --repo-update
```
- 프로젝트 파일 내에 ios 폴더에서 다음의 명령어를 실행해서 Library를 Xcode Project로 추가
<br/>

#### C. Setup Plist
- 프로젝트 파일 내에 {projectroot}/ios/{프로젝트 이름}/Info.plist 파일에 추가

##### 가. AdiscopeMediaId, AdiscopeMediaSecret 추가
```xml
<key>AdiscopeMediaId</key>
<string>{media id 기입 필요}</string>
<key>AdiscopeMediaSecret</key>
<string>{media secret 기입 필요}</string>
```
<br/>

##### 나. App Tracking Permission 추가
```xml
<key>NSUserTrackingUsageDescription</key>
<string></string>
```
- ex : Some ad content may require access to the user tracking.
<br/>

##### 다. SKAdNetwork 추가 ([Download](https://github.com/adiscope/Adiscope-iOS-Sample/releases/download/3.8.0/AdiscopeSkAdNetworks.plist))
```xml
<dict>
    <key>SKAdNetworkItems</key>
    <array>
	<dict>
	    <key>SKAdNetworkIdentifier</key>
	    <string></string>
	</dict>
    </array>
</dict>
```
- SKAdNetwork Download File 내용 추가 ([Download](https://github.com/adiscope/Adiscope-iOS-Sample/releases/download/3.8.0/AdiscopeSkAdNetworks.plist))
<br/>

##### 라. Admob, Max의 Admob 사용 시 추가
```xml
<key>GADIsAdManagerApp</key>
<true/>
<key>GADApplicationIdentifier</key>
<string>{admob_app_id 기입 필요}</string>
```
- "GADIsAdManagerApp" 설정 및 "GADApplicationIdentifier"의 Key 설정
<br/><br/><br/>

#### D. AppDelegate 추가
##### 가. Max의 InMobi 사용 시 추가
###### a. Object-C
```object-c
@property (nonatomic, strong) UIWindow *window;
```
- iOS 폴더 내 AppDelegate.h 파일의 AppDelegate interface 내에 추가
<br/>

###### b. Swift
```swift
var window: UIWindow?
```
- iOS 폴더 내 AppDelegate.swift 파일의 AppDelegate class 내에 추가
<br/><br/><br/><br/>

## Adiscope Overview
### 1. Import
```tsx
// 초기 실행
import { initialize4Adiscope, isInitialize4Adiscope, setUserId4Adiscope } from '@adiscope.ad/adiscope-react-native';
// Offerwall, RewardedVideo, Interstitial, RewardedInterstitial
import { useOfferwall4Adiscope, useRewardedVideo4Adiscope, useInterstitial4Adiscope,
  useRewardedInterstitial4Adiscope, useAdEvent4Adiscope } from '@adiscope.ad/adiscope-react-native';
// Other
import { getSDKVersion4Adiscope, getNetworksVersions4Adiscope, getUnitStatus4Adiscope, setVolumeOff4Adiscope, 
  showAdmobMediationDebugger4Adiscope, showMaxMediationDebugger4Adiscope } from '@adiscope.ad/adiscope-react-native';
```
- Adiscope을 사용하기 위해서 추가    
<br/><br/><br/>

### 2. Initialize
#### A. Code에서 Media 없이 Initialize 방법
```tsx
const [statusInitialize, setStatusInitialize] = useState({
  isSuccess: false,
});

const result = await initialize4Adiscope();
setStatusInitialize(result);
```
- Android는 [AndroidManifest](#a-setup-androidmanifest) 파일과 [Module Gradle](#b-setup-module-gradle) 파일 세팅 필요
- iOS는 [Plist](#가-adiscopemediaid-adiscopemediasecret-추가) 파일 세팅 필요
- App 실행 시 1회 설정 권장
- Adiscope에서는 Google Play 가족 정책을 준수해야 함 (Android 전용 - [Adiscope Google Play 가족 정책 확인](./docs/familiespolicy.md))
  - ⚠️ 정책 미준수시 광고에 제한이 생김 (광고 물량 축소 및 오퍼월 진입 불가)
<br/>

#### B. Code에서 직접 Media 넣어서 Initialize 방법
```tsx
const [statusInitialize, setStatusInitialize] = useState({
  isSuccess: false,
});

const mediaId = "";        // 관리자를 통해 발급
const mediaSecret = "";    // 관리자를 통해 발급
const callbackTag = "";    // 관리자를 통해 발급, 기본 ""
const childYN = "";        // 어린이 여부를 설정 해주는 값(Google GMA에 세팅)
const result = await initialize4Adiscope(mediaId, mediaSecret, callbackTag, childYN);
setStatusInitialize(result);
```
- App 실행 시 1회 설정 권장
- Adiscope에서는 Google Play 가족 정책을 준수해야 함 (Android 전용 - [Adiscope Google Play 가족 정책 확인](./docs/familiespolicy.md))
  - ⚠️ 정책 미준수시 광고에 제한이 생김 (광고 물량 축소 및 오퍼월 진입 불가)
<br/>

#### C. Callbacks
```dart
useEffect(() => {
  console.log(statusInitialize['isSuccess']);
}, [statusInitialize]);
```
- [Initialize](#2-initialize)를 실행 해야 Callbacks 호출
- statusInitialize로 Initialize 결과를 받을 수 있음    
<br/><br/><br/>

### 3. 사용자 정보 설정
```tsx
const userId = "";        // set unique user id to identify the user in reward information
await setUserId4Adiscope(userId);
```
- ⚠️ `Offerwall`, `RewardedVideo`, `RewardedInterstitial`를 사용하기 위해 필수 설정
- 64자까지 설정 가능    
<br/><br/><br/>

### 4. Offerwall
#### A. Hook 호출
```tsx
const { showOfferwall4Adiscope, showOfferwallDetail4Adiscope, showOfferwallDetailFromUrl4Adiscope, 
  openedOfferwall4Adiscope, closedOfferwall4Adiscope, failedToShowOfferwall4Adiscope } = useOfferwall4Adiscope();
```
- 함수 및 콜백 변수를 사용 하기 위해서 선언
<br/>

#### B. Show
```tsx
const unitId = "";        // 관리자를 통해 발급
await showOfferwall4Adiscope(unitId);
```
- `Show`가 실행되면 (return값이 True일 경우) `openedOfferwall4Adiscope`와 `failedToShowOfferwall4Adiscope` 중 하나가 항상 호출되고, `openedOfferwall4Adiscope`가 호출되었다면 이후 `closedOfferwall4Adiscope`가 항상 호출
<br/>

#### C. Callbacks
```tsx
useEffect(() => {
  if (openedOfferwall4Adiscope) {
    console.log(openedOfferwall4Adiscope['unitId']);
  }
}, [openedOfferwall4Adiscope]);
useEffect(() => {
  if (closedOfferwall4Adiscope) {
    console.log(closedOfferwall4Adiscope['unitId']);
  }
}, [closedOfferwall4Adiscope]);
useEffect(() => {
  if (failedToShowOfferwall4Adiscope) {
    console.log(failedToShowOfferwall4Adiscope['unitId'] + ", " + failedToShowOfferwall4Adiscope['errorCode'] + ", " + failedToShowOfferwall4Adiscope['errorDescription'] + ", " + failedToShowOfferwall4Adiscope['errorXB3TraceID']);
  }
}, [failedToShowOfferwall4Adiscope]);
```
- [Initialize](#2-initialize)를 실행 해야 Callbacks 호출
- Show 성공 시 `openedOfferwall4Adiscope`, `closedOfferwall4Adiscope` callback이 순차적으로 호출
- `failedToShowOfferwall4Adiscope`시 [AdiscopeError 참고](./docs/error_info.md)    
<br/><br/><br/>

### 5. RewardedVideo
#### A. Hook 호출
```tsx
const { loadRewardedVideo4Adiscope, isLoadedRewardedVideo4Adiscope, showRewardedVideo4Adiscope,
  loadedRewardedVideo4Adiscope, failedToLoadRewardedVideo4Adiscope, openedRewardedVideo4Adiscope,
  closedRewardedVideo4Adiscope, rewardedRewardedVideo4Adiscope,
  failedToShowRewardedVideo4Adiscope } = useRewardedVideo4Adiscope();
```
- 함수 및 콜백 변수를 사용 하기 위해서 선언
<br/>

#### B. Load
```tsx
const unitId = "";      // 관리자를 통해 발급
await loadRewardedVideo4Adiscope(unitId);
```
- 해당 유닛에 속한 ad 네크워크들의 광고를 load
- `Load`가 실행되면 `loadedRewardedVideo4Adiscope` 와 `failedToLoadRewardedVideo4Adiscope` 중 하나의 callback은 항상 호출
- `loadedRewardedVideo4Adiscope` callback이 호출되면 load가 완료
- Load 동작 수행 중에 Load를 여러 번 호출할 수 없음
- Rewarded Video Ad의 `Load`와 `Show`는 pair로 호출
- Load를 한 후 Show를 하고, 광고를 Show한 후에는 다시 Load를 하여 다음 번 Show를 준비
- Load & Show 후 다시 Load를 하려 할 때 Load 는 Show 이후 언제든 호출가능
  - 광고가 Show되는 동안 다음 광고를 load를 할 수도 있지만 이는 사용하는 mediation ad network company의 종류에 따라 달라질 수 있으므로 항상 보장되는 동작은 아님
- Show의 callback 인 `closedRewardedVideo4Adiscope`에서 다시 Load를 하는 것을 권장 
  - Abusing 방지를 위해 Rewarded Video Ad를 연속으로 보여주는 것을 제한하여 한번 광고를 보고 나면 일정 시간이 지난 후에 다시 Show를 할 수 있도로록 Admin page에서 서비스 설정 가능
- (**Optional**) Load의 시간이 필요해 ProgressBar 노출 추천
<br/>

#### C. IsLoaded
```tsx
const unitId = "";      // 관리자를 통해 발급
const result = await isLoadedRewardedVideo4Adiscope(unitId);
if (result) {
  // show ad here
} else {
  // do something else
}
```
- 광고가 Load 되었는지 상태를 확인
<br/>

#### D. Show
```tsx
const unitId = "";      // 관리자를 통해 발급
const result = await isLoadedRewardedVideo4Adiscope(unitId);
if (result) {
  const resultShow = await showRewardedVideo4Adiscope();
  if (resultShow) {
    // Success
  } else {
    // This Show request is duplicated
  }
} else {
  // ad is not loaded
}
```
- 마지막으로 Load된 광고를 사용자에게 보여줌
- Show 후에는 다시 Load를 호출 할 수 있음
- Show method는 중복하여 호출 할 수 없음
- `Show`가 실행되면 (return값이 True일 경우) `openedRewardedVideo4Adiscope`와 `failedToShowRewardedVideo4Adiscope` 중 하나가 항상 호출되고, `openedRewardedVideo4Adiscope`가 호출되었다면 이후 `closedRewardedVideo4Adiscope`가 항상 호출
- Rewarded Video Ad의 `Load`와 `Show`는 pair로 호출
    - Load를 한 후 Show를 하고, 광고를 Show한 후에는 다시 Load를 하여 다음번 Show를 준비 할 수 있음
<br/>

#### E. Callback Reward
```tsx
useEffect(() => {
  if (rewardedRewardedVideo4Adiscope) {
    console.log(rewardedRewardedVideo4Adiscope['amount'] + rewardedRewardedVideo4Adiscope['unit']);
  }
}, [rewardedRewardedVideo4Adiscope]);
```
- [Initialize](#2-initialize)를 실행 해야 Callbacks 호출
- 보상이 주어져야 할 경우 `rewardedRewardedVideo4Adiscope`가 호출되며 그 parameter로 관련 정보가 전달
- 이 보상 정보를 바탕으로 게임 내에서 보상을 지급
- `rewardedRewardedVideo4Adiscope`는 보통 `openedRewardedVideo4Adiscope` 와 `closedRewardedVideo4Adiscope` 사이에 호출되는 경우가 많으나 광고 System의 상황에 따라 달라 질 수 있음
- `rewardedRewardedVideo4Adiscope`가 호출되지 않는 경우도 존재할 수 있음(Reward 설정을 Server-to-server로 하였다면, Video 시청 후에는 `rewardedRewardedVideo4Adiscope`가 호출되지 않음)
- Reward 정보는 abusing 방지를 위해서 Server-to-server 방식으로 전달 받는 것을 권장
- Server-to-server 방식을 선택하더라도 보상이 전달 될 시에는 `rewardedRewardedVideo4Adiscope`가 호출
  - 이때는 Server를 통해 전달받은 정보를 기준으로 처리하고, `rewardedRewardedVideo4Adiscope`를 통해 전달받은 정보는 검증용으로 사용하거나 무시하도록 함
<br/>

#### F. Callback Others
```tsx
useEffect(() => {
  if (loadedRewardedVideo4Adiscope) {
    console.log(loadedRewardedVideo4Adiscope['unitId']);
  }
}, [loadedRewardedVideo4Adiscope]);
useEffect(() => {
  if (failedToLoadRewardedVideo4Adiscope) {
    console.log(failedToLoadRewardedVideo4Adiscope['unitId'] + ", " + failedToLoadRewardedVideo4Adiscope['errorCode'] + ", " + failedToLoadRewardedVideo4Adiscope['errorDescription'] + ", " + failedToLoadRewardedVideo4Adiscope['errorXB3TraceID']);
  }
}, [failedToLoadRewardedVideo4Adiscope]);
useEffect(() => {
  if (openedRewardedVideo4Adiscope) {
    console.log(openedRewardedVideo4Adiscope['unitId']);
  }
}, [openedRewardedVideo4Adiscope]);
useEffect(() => {
  if (closedRewardedVideo4Adiscope) {
    console.log(closedRewardedVideo4Adiscope['unitId']);
  }
}, [closedRewardedVideo4Adiscope]);
useEffect(() => {
  if (failedToShowRewardedVideo4Adiscope) {
    console.log(failedToShowRewardedVideo4Adiscope['unitId'] + ", " + failedToShowRewardedVideo4Adiscope['errorCode'] + ", " + failedToShowRewardedVideo4Adiscope['errorDescription'] + ", " + failedToShowRewardedVideo4Adiscope['errorXB3TraceID']);
  }
}, [failedToShowRewardedVideo4Adiscope]);
```
- [Initialize](#2-initialize)를 실행 해야 Callbacks 호출
- `Load` 성공 시 `loadedRewardedVideo4Adiscope`, 실패 시 `failedToLoadRewardedVideo4Adiscope`가 호출
- `Show` 성공 시 `openedRewardedVideo4Adiscope`, `closedRewardedVideo4Adiscope`가 순차적으로 호출되고, 실패시 `failedToShowRewardedVideo4Adiscope`가 호출    
- `failedToLoadRewardedVideo4Adiscope`, `failedToShowRewardedVideo4Adiscope`시 [AdiscopeError 참고](./docs/error_info.md)    
<br/><br/><br/>

### 6. Interstitial
#### A. Hook 호출
```tsx
const { loadInterstitial4Adiscope, isLoadedInterstitial4Adiscope, showInterstitial4Adiscope,
  loadedInterstitial4Adiscope, failedToLoadInterstitial4Adiscope, openedInterstitial4Adiscope,
  closedInterstitial4Adiscope, failedToShowInterstitial4Adiscope } = useInterstitial4Adiscope();
```
- 함수 및 콜백 변수를 사용 하기 위해서 선언
<br/>

#### B. Load
```tsx
const unitId = "";      // 관리자를 통해 발급
await loadInterstitial4Adiscope(unitId);
```
- 해당 유닛에 속한 ad 네크워크들의 광고를 Load
- `loadedInterstitial4Adiscope` callback이 호출되면 Load가 완료
- Interstitial의 `Load`와 `Show`는 pair로 호출
- Load를 한 후 Show를 하고, 광고를 Show한 후에는 다시 Load를 하여 다음 번 Show를 준비
- 광고가 Show되는 동안 다음 광고를 load를 할 수도 있지만 이는 사용하는 mediation ad network company의 종류에 따라 달라질 수 있으므로 항상 보장되는 동작은 아님
- Load 동작 수행 중에 Load를 여러 번 호출할 수 없음
- (**Optional**) Load의 시간이 필요해 ProgressBar 노출 추천
<br/>

#### C. IsLoaded
```tsx
const unitId = "";      // 관리자를 통해 발급
const result = await isLoadedInterstitial4Adiscope(unitId);
if (result) {
  // show ad here
} else {
  // do something else
}
```
- 광고가 Load 되었는지 상태를 확인
<br/>

#### D. Show
```tsx
const unitId = "";      // 관리자를 통해 발급
const result = await isLoadedInterstitial4Adiscope(unitId);
if (result) {
  bool resultShow = await showInterstitial4Adiscope();
  if (resultShow) {
    // Success
  } else {
    // This Show request is duplicated
  }
} else {
  // ad is not loaded
}
```
- 마지막으로 load된 광고를 사용자에게 보여줌
- Show 호출 후에는 다시 load를 호출
- Show method는 중복하여 호출 할 수 없음
- `Show`가 실행되면 (return값이 True일 경우) `loadedInterstitial4Adiscope`와 `failedToLoadInterstitial4Adiscope` 중 하나가 항상 호출되고, `openedInterstitial4Adiscope`가 호출되었다면 이후 `closedInterstitial4Adiscope`가 항상 호출
- Interstitial Ad의 `Load`와 `Show`는 pair로 호출
    - Load를 한 후 Show를 하고, 광고를 Show한 후에는 다시 Load를 하여 다음번 Show를 준비 할 수 있음
<br/>

#### E. Callback
```tsx
useEffect(() => {
  if (loadedInterstitial4Adiscope) {
    console.log(loadedInterstitial4Adiscope['unitId']);
  }
}, [loadedInterstitial4Adiscope]);
useEffect(() => {
  if (failedToLoadInterstitial4Adiscope) {
    console.log(failedToLoadInterstitial4Adiscope['unitId'] + ", " + failedToLoadInterstitial4Adiscope['errorCode'] + ", " + failedToLoadInterstitial4Adiscope['errorDescription'] + ", " + failedToLoadInterstitial4Adiscope['errorXB3TraceID']);
  }
}, [failedToLoadInterstitial4Adiscope]);
useEffect(() => {
  if (openedInterstitial4Adiscope) {
    console.log(openedInterstitial4Adiscope['unitId']);
  }
}, [openedInterstitial4Adiscope]);
useEffect(() => {
  if (closedInterstitial4Adiscope) {
    console.log(closedInterstitial4Adiscope['unitId']);
  }
}, [closedInterstitial4Adiscope]);
useEffect(() => {
  if (failedToShowInterstitial4Adiscope) {
    console.log(failedToShowInterstitial4Adiscope['unitId'] + ", " + failedToShowInterstitial4Adiscope['errorCode'] + ", " + failedToShowInterstitial4Adiscope['errorDescription'] + ", " + failedToShowInterstitial4Adiscope['errorXB3TraceID']);
  }
}, [failedToShowInterstitial4Adiscope]);
```
- [Initialize](#2-initialize)를 실행 해야 Callbacks 호출
- `Load` 성공 시 `loadedInterstitial4Adiscope`, 실패 시 `failedToLoadInterstitial4Adiscope`가 호출
- `Show` 성공 시 `openedInterstitial4Adiscope`, `closedInterstitial4Adiscope`가 순차적으로 호출되고, 실패 시 `failedToShowInterstitial4Adiscope`가 호출    
- `failedToLoadInterstitial4Adiscope`, `failedToShowInterstitial4Adiscope`시 [AdiscopeError 참고](./docs/error_info.md)    
<br/><br/><br/>

### 7. RewardedInterstitial
#### A. Hook 호출
```tsx
const { preLoadAllRewardedInterstitial4Adiscope, preLoadRewardedInterstitial4Adiscope,
  showRewardedInterstitial4Adiscope, skipRewardedInterstitial4Adiscope, rewardedRewardedInterstitial4Adiscope,
  openedRewardedInterstitial4Adiscope, closedRewardedInterstitial4Adiscope,
  failedToShowRewardedInterstitial4Adiscope } = useRewardedInterstitial4Adiscope();
```
- 함수 및 콜백 변수를 사용 하기 위해서 선언
<br/>

#### B. PreLoadAll
```tsx
await preLoadAllRewardedInterstitial4Adiscope();
```
- Initialize Call Back 후 1회 설정 권장
- 관리자가 설정된 활성화된 모든 유닛들을 Load 진행
<br/>

#### C. Unit 지정 PreLoad
```tsx
const unitIds = [];
unitIds.push(unitId1);
unitIds.push(unitId2);
await preLoadRewardedInterstitial4Adiscope(unitIds);
```
- Initialize Call Back 후 1회 설정 권장
- 입력된 유닛들을 Load 진행
<br/>

#### D. Show
```tsx
const unitId = "";      // 관리자를 통해 발급
const result = await showRewardedInterstitial4Adiscope(unitId);
```
- 해당 유닛이 Load되어 있으면 안내 팝업을 보여 준 뒤 해당 광고를 사용자에게 보여줌
- Show method는 중복하여 호출 할 수 없음
- `showRewardedInterstitial4Adiscope`가 실행되면 (return값이 True일 경우) `skipRewardedInterstitial4Adiscope`와 `openedRewardedInterstitial4Adiscope`와 `failedToShowRewardedInterstitial4Adiscope` 중 하나가 항상 호출되고, `openedRewardedInterstitial4Adiscope`가 호출되었다면 이후 `closedRewardedInterstitial4Adiscope`가 항상 호출
- `closedRewardedInterstitial4Adiscope`와 `failedToShowRewardedInterstitial4Adiscope`가 호출 되면 내부에서 해당 유닛을 자동 Load 시킴
<br/>

#### E. Callbacks Reward
```tsx
useEffect(() => {
  if (rewardedRewardedInterstitial4Adiscope) {
    console.log(rewardedRewardedInterstitial4Adiscope['amount'] + rewardedRewardedInterstitial4Adiscope['unit']);
  }
}, [rewardedRewardedInterstitial4Adiscope]);
```
- [Initialize](#2-initialize)를 실행 해야 Callbacks 호출
- 보상이 주어져야 할 경우 `rewardedRewardedInterstitial4Adiscope`가 호출되며 그 parameter로 관련 정보가 전달
- 이 보상 정보를 바탕으로 게임 내에서 보상을 지급
- `rewardedRewardedInterstitial4Adiscope`는 보통 `openedRewardedInterstitial4Adiscope` 와 `closedRewardedInterstitial4Adiscope` 사이에 호출되는 경우가 많으나 광고 System의 상황에 따라 달라 질 수 있음
- `rewardedRewardedInterstitial4Adiscope`가 호출되지 않는 경우도 존재할 수 있음(Reward 설정을 Server-to-server로 하였다면, Video 시청 후에는 `rewardedRewardedInterstitial4Adiscope`가 호출되지 않음)
- Reward 정보는 abusing 방지를 위해서 Server-to-server 방식으로 전달 받는 것을 권장
- Server-to-server 방식을 선택하더라도 보상이 전달 될 시에는 `rewardedRewardedInterstitial4Adiscope`가 호출
  - 이때는 Server를 통해 전달받은 정보를 기준으로 처리하고, `rewardedRewardedInterstitial4Adiscope`를 통해 전달받은 정보는 검증용으로 사용하거나 무시하도록 함
<br/>

#### F. Callback Others
```tsx
useEffect(() => {
  if (skipRewardedInterstitial4Adiscope) {
    console.log(skipRewardedInterstitial4Adiscope['unitId']);
  }
}, [skipRewardedInterstitial4Adiscope]);
useEffect(() => {
  if (openedRewardedInterstitial4Adiscope) {
    console.log(openedRewardedInterstitial4Adiscope['unitId']);
  }
}, [openedRewardedInterstitial4Adiscope]);
useEffect(() => {
  if (closedRewardedInterstitial4Adiscope) {
    console.log(closedRewardedInterstitial4Adiscope['unitId']);
  }
}, [closedRewardedInterstitial4Adiscope]);
useEffect(() => {
  if (failedToShowRewardedInterstitial4Adiscope) {
    console.log(failedToShowRewardedInterstitial4Adiscope['unitId'] + ", " + failedToShowRewardedInterstitial4Adiscope['errorCode'] + ", " + failedToShowRewardedInterstitial4Adiscope['errorDescription'] + ", " + failedToShowRewardedInterstitial4Adiscope['errorXB3TraceID']);
  }
}, [failedToShowRewardedInterstitial4Adiscope]);
```
- [Initialize](#2-initialize)를 실행 해야 Callbacks 호출
- Show 성공 후 Skip 시 `skipRewardedInterstitial4Adiscope`가 호출
- Show 성공 후 영상 시청 시 `openedRewardedInterstitial4Adiscope`, `closedRewardedInterstitial4Adiscope`가 순차적으로 호출되고, 실패 시 `failedToShowRewardedInterstitial4Adiscope`가 호출    
- `failedToShowRewardedInterstitial4Adiscope`시 [AdiscopeError 참고](./docs/error_info.md)    
<br/><br/><br/>

### 8. Etc
#### A. Adiscope SDK Version
```tsx
const result = await getSDKVersion4Adiscope();
```
- Android와 iOS의 Core SDK Version 확인
<br/>

#### B. Adiscope Network Versions
```tsx
const result = await getNetworksVersions4Adiscope();
```
- Android와 iOS의 Third Party SDK Versions 확인
<br/>

#### C. Set Rewarded Check Param
```tsx
const result = await setRewardedCheckParam4Adiscope(param);
```
- Rewarded callback 시 parameters을 추가
- 해당 정보는 Rewarded 지급 등에 있어 구분하는데 사용 할 수 있음
- 내부 설정 후 사용 가능 ( 담당자에게 요청 부탁 )
- param은 Base64 Encoded(UTF8)를 처리 후 1000자내로 설정
<br/>

#### D. Volume
```tsx
const isOff = true;  // Ad Sound Off
const isOff = false; // Ad Sound On (Default)
await setVolumeOff4Adiscope(isOff);
if (isOff) {
  console.log("Ad Sound Off");
} else {
  console.log("Ad Sound On");
}
```
- `Admob`, `AppLovin`, `Mintegral`, `Verve` 만 적용 가능    
<br/><br/><br/>

## 웹사이트 필수 등록 (Android 전용)
- 관리자에게 전달받은 `app-ads.txt`를 웹사이트에 등록
> - [app-ads.txt 등록 방법 및 정보](./docs/app-ads.txt.md)
<br/><br/>

## Adiscope Server 연동하기
> - [연동하기](./docs/reward_callback_info.md)
<br/><br/>

## Privacy Manifest 정책 적용 (iOS 전용)
- 2024년 5월 1일부터 출시/업데이트 되는 앱에 대해 3rd Party Framework의 개인정보 추가
> - [참고](https://developer.apple.com/videos/play/wwdc2023/10060)
<br/><br/>

## Adiscope Error Information
> - [Error 정보](./docs/error_info.md)
<br/><br/>

## Adiscope Sample App
> - [Sample App 폴더 이동](./example)
<br/><br/>

## Releases
> - [Releases](../../releases)
<br/><br/>
