import React, { useState } from "react";
import { 
    BannerAd, 
    TestIds, 
    BannerAdSize,
    useInterstitialAd,
    InterstitialAd
} from "@react-native-admob/admob";

export const AdmobBanner = () => {
    return <BannerAd 
                size={BannerAdSize.ADAPTIVE_BANNER} 
                unitId={TestIds.BANNER} 
                />
} 