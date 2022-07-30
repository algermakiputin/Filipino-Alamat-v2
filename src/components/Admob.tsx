import React from "react";
import { 
    BannerAd,  
    BannerAdSize, 
} from "@react-native-admob/admob";

export const AdmobBanner = () => {
    return <BannerAd 
                size={BannerAdSize.ADAPTIVE_BANNER} 
                unitId='ca-app-pub-4118987136087583/3996860227' 
                />
} 