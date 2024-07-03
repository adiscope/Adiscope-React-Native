require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "adiscope-ad-adiscope-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/adiscope/Adiscope-React-Native.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true

  s.pod_target_xcconfig = { "EXCLUDED_ARCHS[sdk=iphonesimulator*]" => "arm64" }
  s.user_target_xcconfig = { "EXCLUDED_ARCHS[sdk=iphonesimulator*]" => "arm64" }

  s.dependency "React-Core"

  s.dependency "Adiscope", "3.7.0"
  s.dependency 'AdiscopeMediaAdManager', '3.6.0'
  s.dependency 'AdiscopeMediaAdMob', '3.7.0'
  s.dependency 'AdiscopeMediaAppLovin', '3.6.1'
  s.dependency 'AdiscopeMediaChartBoost', '3.6.0'
  s.dependency 'AdiscopeMediaFAN', '3.6.0'
  s.dependency 'AdiscopeMediaMax', '3.6.1'
  s.dependency 'AdiscopeMediaMobVista', '3.6.0'
  s.dependency 'AdiscopeMediaPangle', '3.6.0'
  s.dependency 'AdiscopeMediaUnityAds', '3.6.0'
  s.dependency 'AdiscopeMediaVungle', '3.6.0'

  # Don't install the dependencies when we run `pod install` in the old architecture.
  if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
    s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    s.pod_target_xcconfig    = {
        "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
        "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
        "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
    }
    s.dependency "React-Codegen"
    s.dependency "RCT-Folly"
    s.dependency "RCTRequired"
    s.dependency "RCTTypeSafety"
    s.dependency "ReactCommon/turbomodule/core"
  end
end
