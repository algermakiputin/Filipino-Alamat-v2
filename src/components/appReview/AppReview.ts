import AsyncStorage from '@react-native-community/async-storage';
import Rate, { AndroidMarket } from 'react-native-rate'

export class AppReview {
    private options;
    constructor() {
        const appUrl = 'https://play.google.com/store/apps/details?id=com.angalamat';
        this.options = { 
            GooglePackageName:"com.angalamat", 
            OtherAndroidURL: appUrl,
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp:true,
            openAppStoreIfInAppFails:true,
            fallbackPlatformURL: appUrl,
        }
    }

    rateApp() {
        Rate.rate(this.options, (success, error) => { 
            if (success) {
                console.log('rated success');
                AsyncStorage.setItem("ratedDate", new Date().toISOString());
            }else{
                console.log(error);
            }
        });
    };
}