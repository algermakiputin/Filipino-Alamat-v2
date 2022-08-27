import React from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    Button
} from "react-native"; 
import theme from '../../../app/styles/theme.styles';
import { getById } from './../api/Alamat';
import { AdmobBanner } from "../Admob";
import { InterstitialAd, TestIds } from "@react-native-admob/admob";
import { httpToHttps } from "../helper/helper";
import Tts from 'react-native-tts'; 

class StoryPage extends React.Component<any, any> {

    interstitial:Object = '';
    _isMounted = false;

    constructor(props:any) {
        super(props)
        this.state = {
            title: '',
            content: '',
            imageURL: '',
            category: '',
            loading: true,
            totalSeconds: 0,
            speaking: false,
            strippedContent: '',
            interval: null
        } 
       
    }

    formatText(text: string) {
        const cleanString = text.replace(/(<([^>]+)>)/gi, "") // remove tags
        const splitByParagraph = cleanString.split(/\r?\n|\r|\n/g).filter((text:string) => text); // split by line
        return splitByParagraph;
    }

    formatContent() {  
        return this.state.content.map((value:any, key:number) => { 
            return <Text key={key} style={styles.paragraph}>{value}</Text>;
        });   
    }

    async componentDidMount() {
        this._isMounted = true;  
        
        if (this._isMounted) {
            const id = this.props.route.params.id;  
            const story:any = await getById(id);   
            Tts.setDefaultLanguage('fil-PH'); 
            Tts.setDefaultRate(0.465);   
            const content = this.formatText(story.content.rendered); 
            const wordCount = content.map((item) => item.split(' ').length).reduce((a, b) => (a+b), 0); 
            const speakingMinutes = wordCount / 130; '130 = average WPM';
            const totalSeconds = Math.round(speakingMinutes * 60); 
            const imageUrl = story._embedded.hasOwnProperty('wp:featuredmedia') ? story._embedded['wp:featuredmedia'][0].source_url : '';
            this.setState({
                title: story.title.rendered,
                content: content,
                imageURL: httpToHttps(imageUrl),
                category: story._embedded['wp:term'][0][0].name,
                loading:false, 
                totalSeconds: totalSeconds,
                interval: (setInterval(() => { 
                        this.setState({totalSeconds: this.state.totalSeconds - 1});
                },1000))
                
            }); 
            this.interstitial = InterstitialAd.createAd(TestIds.INTERSTITIAL);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.setState({speaking: false});
        Tts.removeAllListeners('tts-start');
        Tts.removeAllListeners('tts-progress');
    }

    async starthandler() {  
        if (!this.state.speaking) { 
            this.setState({speaking: true}); 
            this.state.interval;
            Tts.getInitStatus().then(() => {   
                this.state.content.forEach((text: string) => {
                    console.log(text);
                    Tts.speak(text); 
                }); 
            });  
    
            Tts.addEventListener('tts-start', (event) => { 
                console.log('tts started');
            });
    
            Tts.addEventListener('tts-progress', (event) => {
                console.log(event);
            });
        } else {
            Tts.stop(true); 
            this.setState({speaking: false});
            clearInterval(this.state.interval());
        }
    } 

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    { this.state.loading ? <View style={styles.container}><Text style={styles.loading}>Loading...</Text></View> : (
                        <View>
                            {
                                this.state.imageURL ? (
                                    <Image 
                                        style={styles.image}
                                        source={{
                                            uri: this.state.imageURL
                                        }}
                                    />
                                ) : null
                            } 
                            <View style={styles.container}>  
                                <Text style={styles.category}>Category: {this.state.category}</Text>
                                <Text style={styles.heading}>{this.state.title}</Text>
                                <View
                                    style={{flex:1, flexDirection:'row'}}
                                >
                                    <TouchableOpacity
                                        onPress={() => {this.starthandler()}}
                                        
                                    >
                                        <Image source={require('../../assets/images/play-button.png')} style={{width:20, height:20}} />
                                    </TouchableOpacity>
                                    <Text style={{marginLeft:7,marginBottom:10}}>
                                        {this.state.speaking ? (`${(Math.floor(this.state.totalSeconds / 60).toString().padStart(2,'0'))}:${(Math.round(this.state.totalSeconds % 60)).toString().padStart(2, '0')}`) : 'Listen'}
                                    </Text> 
                                </View>
                                {this.formatContent()}
                            </View> 
                            <AdmobBanner />
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    category: {
        fontSize:theme.FONT_SIZE_SMALL,
        color:theme.bodyText, 
    },
    container: {
        paddingLeft:20,
        paddingRight:20
    },
    heading: {
        fontSize:theme.FONT_SIZE_EXTRA_LARGE,
        marginBottom:8,
        color:theme.headingColor, 
    },
    text: {
        fontSize:theme.FONT_SIZE_REGULAR,
        color: theme.bodyText
    },
    image: {
        width:'100%',
        height:275,
        resizeMode:'cover',
        marginBottom:10 
    },
    paragraph: { 
        fontSize:theme.FONT_SIZE_REGULAR,
        lineHeight:theme.lineHeight,
        color: theme.bodyText,
        marginBottom:20
    },
    loading: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.headingColor
    }
});
export default StoryPage;