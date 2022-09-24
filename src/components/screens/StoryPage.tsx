import React from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    Button, 
    Dimensions
} from "react-native"; 
import theme from '../../../app/styles/theme.styles';
import { getById } from './../api/Alamat';
import { AdmobBanner } from "../Admob";
import { InterstitialAd, TestIds } from "@react-native-admob/admob";
import { httpToHttps } from "../helper/helper";
import Tts from 'react-native-tts'; 

const stopButton = require('../../assets/images/stop.png');
const playButton = require('../../assets/images/play-button.png');

class StoryPage extends React.Component<any, any> {

    interstitial:Object = '';
    _isMounted = false;
    textToSpeach = Tts;
    textRefs: any = []; 
    titleRef: any = [];
    scrollViewRef: any = React.createRef();
    height = Dimensions.get('window').height;
    readBackground = 'rgba(187,209,251, 0.25)';
    readingBackground = 'rgba(187,209,251, 0.9)';
    constructor(props:any) {
        super(props)
        this.state = {
            title: '',
            content: '',
            imageURL: '',
            category: '',
            loading: true,
            readingTime: 0,
            totalSeconds: 0,
            speaking: false,
            strippedContent: '',
            interval: null,
            read: 0,
            line: 0,
            words: [],
            count: 0,
            index: 0,
            userScrolling: false,
            isTitle: true,
            offsetY: 0,
            direction : 'down',
            reset: false,
        }   
    }

    formatText(text: string) {
        const cleanString = text.replace(/(<([^>]+)>)/gi, "") // remove tags
        const splitByParagraph = cleanString.split(/\r?\n|\r|\n/g).filter((text:string) => text); // split by line
        return splitByParagraph;
    }

    splitByText(text: any, count: number) {   
        return text.split(" ").map((text: string, index: number) => {   
            const word = {
                text: <Text ref={(el) => (this.textRefs[count][index].current = el)} key={this.state.count} style={{alignSelf: 'flex-start'}}>{this.replaceHTMLEntity(text)} </Text>, 
                count: this.state.count, 
            };
            this.setState({count: this.state.count + 1});
            return word;
        }); 
    }

    replaceHTMLEntity(text:string) {
        return text.replace(/&#8217;/g, `'`)
            .replace(/&#8220;/g, `“`)
            .replace(/&#8221;/g, `”`);
    }

    formatContent() {   
        return this.state.words.map((text:any, index:number) => {    
            return (<Text style={styles.text} key={index}>
                {text.map((value:any) => value.text)}
            </Text>)
        })  
    }

    async componentDidMount() { 
        this._isMounted = true;   
        if (this._isMounted) {   
            const id = this.props.route.params.id;  
            const story:any = await getById(id);    
            const content = this.formatText(story.content.rendered); 
            const wordCount = content.map((item) => item.split(' ').length).reduce((a, b) => (a+b), 0); 
            const speakingMinutes = wordCount / 165; '130 = average WPM';
            const totalSeconds = Math.round(speakingMinutes * 60); 
            const title = story.title.rendered; 
            title.split(" ").forEach((word: string, index: number) => {
                this.titleRef[index] = React.createRef();
            });
            content?.forEach((text: string, index: number) => {
                this.textRefs[index] = text.split(" ").map(() => React.createRef());
            });
            const words = content.map((text, index) => {
                const splitedText = this.splitByText(text, index);
                return splitedText; 
            }); 
            const imageUrl = story._embedded.hasOwnProperty('wp:featuredmedia') ? story._embedded['wp:featuredmedia'][0].source_url : '';
            this.setState({
                title: title.split(" "),
                content: content,
                imageURL: httpToHttps(imageUrl),
                category: story._embedded['wp:term'][0][0].name,
                loading:false, 
                words: words,
                totalSeconds: totalSeconds,
                readingTime: totalSeconds
                
            });  
            this.interstitial = InterstitialAd.createAd(TestIds.INTERSTITIAL);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.setState({speaking: false});
        this.unMountTts();
        this.textToSpeach.stop(true); 
    }

    unMountTts() {
        this.textToSpeach.removeAllListeners('tts-start');
        this.textToSpeach.removeAllListeners('tts-progress'); 
        this.textToSpeach.removeAllListeners('tts-finish');
    }

    async starthandler() {   
        const setReadColor = (color: string) => {
            this.textRefs[this.state.line]?.forEach((element: any) => {   
                element?.current?.setNativeProps({
                    style: {
                        backgroundColor: color
                    }
                })
            });
        }
        if (!this.state.speaking) {  
            this.textToSpeach.setDefaultLanguage('fil-PH'); 
            Tts.setDefaultRate(0.45);
            Tts.setDefaultPitch(1.15);  
            this.setState({speaking: true}); 
            this.setState({
                interval: (setInterval(() => { 
                        this.setState({totalSeconds: this.state.totalSeconds - 1});
                },1000))
            })
            this.textToSpeach.getInitStatus().then((value) => { 
                this.textToSpeach.speak(this.state.title. join(' '));
                this.state.content?.forEach((text: string) => { 
                    this.textToSpeach.speak(text); 
                }); 
            });    

            let titleIndex = 0;
            let doneTitle = false;
            this.textToSpeach.addEventListener('tts-start', () => {
                this.setState({reset:false});
                if (!this.state.isTitle) {
                    setReadColor(this.readBackground);
                    this.setState({reset: false});
                }else {
                    this.titleRef.forEach((element:any) => {
                        element?.current?.setNativeProps({
                            style: {
                                backgroundColor: this.readBackground, 
                            }, 
                        });
                    });
                }
            }); 
            this.textToSpeach.addEventListener('tts-progress', () => {  
                if (!this.state.isTitle) { 
                    if (this.textRefs.hasOwnProperty(this.state.line)) {
                        if (this.textRefs[this.state.line]?.hasOwnProperty(this.state.index)) {  
                            this.textRefs[this.state.line][this.state.index].current.read = true;
                            this.textRefs[this.state.line][this.state.index - 1]?.current?.setNativeProps({
                                style: {
                                    backgroundColor: this.readBackground, 
                                }, 
                            });
                            this.textRefs[this.state.line][this.state.index]?.current?.setNativeProps({
                                style: {
                                    backgroundColor: this.readingBackground, 
                                }, 
                            });  
                            const offsetY = (this.state.read * 6) + this.height / 6; 
                            if (this.state.direction === 'down') {
                                this.scrollViewRef?.current.scrollTo({
                                    y: offsetY,
                                    animated: true,
                                });
                            }  
                            this.setState({
                                read: this.state.read + 1,
                                index: this.state.index + 1,
                                offsetY: offsetY
                            });
                        } 
                    } 
                }else {
                    this.titleRef[titleIndex]?.current?.setNativeProps({
                        style: {
                            backgroundColor: this.readingBackground, 
                        }, 
                    }); 
                    titleIndex++; 
                }
            });

            this.textToSpeach.addEventListener('tts-finish', () => { 
                console.log('is finished');
                if (!doneTitle) {
                    this.titleRef.forEach((element:any) => {
                        element.current.setNativeProps({
                            style: {
                                backgroundColor: 'transparent', 
                            }, 
                        });
                    });
                } 
                if (!this.state.isTitle) {
                    this.textRefs[this.state.line]?.forEach((element: any) => {   
                        element?.current?.setNativeProps({
                            style: {
                                backgroundColor: 'transparent'
                            }
                        })
                    });   
                    this.setState({line: this.state.line + 1, index:0}); 
                }  
                if (this.state.line === this.state.content.length) {
                    clearInterval(this.state.interval);
                    this.setState({speaking: false, totalSeconds: 0})
                } 
                doneTitle = true;
                this.setState({isTitle: false}); 
            });
        } else {
            this.textToSpeach.stop();  
            this.unMountTts();
            this.setState({
                speaking: false, 
                totalSeconds: this.state.readingTime,
                read: 0,
                line: 0,
                index: 0,
                isTitle: true,
                reset: true
            });
            this.textRefs?.forEach((elements: any) => {   
                elements.forEach((element: any) => {
                    element.current.read = false;
                    element?.current?.setNativeProps({
                        style: {
                            backgroundColor: 'transparent'
                        }
                    });
                })
            }); 
            clearInterval(this.state.interval);
        }
    } 

    displayTimer() {
        return `${(Math.floor(this.state.totalSeconds / 60).toString().padStart(2,'0'))}:${(Math.round(this.state.totalSeconds % 60)).toString().padStart(2, '0')}`;
    }

    displayTitle() { 
        return this.state.title.map((str: string, index: number) => (<Text ref={(el) => this.titleRef[index].current = el} key={index}>{str}{' '}</Text>));
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView ref={this.scrollViewRef} onScroll={(event) => {
                    var currentOffset = event.nativeEvent.contentOffset.y;
                    var direction = currentOffset > this.state.offsetY ? 'down' : 'up';
                    this.setState({offsetY: currentOffset, direction: direction}) 
                }}>
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
                                <Text style={styles.heading}>{this.displayTitle()}</Text>
                                <View
                                    style={{flex:1, flexDirection:'row', alignItems:'center', alignContent:'center', marginBottom:10}}
                                >
                                    <TouchableOpacity
                                        onPress={() => {this.starthandler()}}
                                        
                                    >
                                        <Image source={this.state.speaking ? stopButton : playButton} style={{width:22, height:22}} />
                                    </TouchableOpacity>
                                    <Text style={{marginLeft:7, fontSize:theme.FONT_SIZE_EXTRA_SMALL, color: theme.bodyText}}>
                                        {this.state.speaking ? this.displayTimer() : 'Listen'}
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
    footer: {
        flexDirection:'row', 
        paddingBottom: 10, 
        paddingTop:10, 
        alignContent:'center'
    },
    flexRow: {
        flexDirection:'row', 
        alignContent:'center'
    },
    heading: {
        fontSize:theme.FONT_SIZE_EXTRA_LARGE,
        marginBottom:8,
        color:theme.headingColor, 
    },
    text: {
        fontSize:theme.FONT_SIZE_REGULAR,
        color: theme.bodyText,
        lineHeight: theme.lineHeight,
        marginBottom:20
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