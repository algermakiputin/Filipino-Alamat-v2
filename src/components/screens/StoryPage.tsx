import React from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native"; 
import theme from '../../../app/styles/theme.styles';
import { getById } from './../api/Alamat';
import { AdmobBanner } from "../Admob";
import { InterstitialAd, TestIds } from "@react-native-admob/admob";

class StoryPage extends React.Component<any, any> {

    interstitial:Object = '';
    constructor(props:any) {
        super(props)
        this.state = {
            title: '',
            content: '',
            imageURL: '',
            category: '',
            loading: true
        }
    }

    formatContent() { 
        const divider = this.state.content.split("</p>");
        return divider.map((value:any, key:number) => {
            const cleanString = value.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ''); 
            return <Text key={key} style={styles.paragraph}>{cleanString.trim()}</Text>;
        });   
    }

    async componentDidMount() {
        const id = this.props.route.params.id;  
        const story:any = await getById(id); 
        const imageUrl = story._embedded.hasOwnProperty('wp:featuredmedia') ? story._embedded['wp:featuredmedia'][0].source_url : '';
        this.setState({
            title: story.title.rendered,
            content: story.content.rendered,
            imageURL: imageUrl,
            category: story._embedded['wp:term'][0][0].name,
            loading:false
        }); 
        this.interstitial = InterstitialAd.createAd(TestIds.INTERSTITIAL);
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
        marginBottom:15,
        color:theme.headingColor
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