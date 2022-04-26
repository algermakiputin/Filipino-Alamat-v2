import React from "react";
import { 
    BannerAd, 
    TestIds, 
    BannerAdSize
} from "@react-native-admob/admob";

export const AdmobBanner = () => {
    return <BannerAd 
                size={BannerAdSize.ADAPTIVE_BANNER} 
                unitId={TestIds.BANNER} 
                />
}