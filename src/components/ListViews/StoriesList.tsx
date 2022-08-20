import React from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image
} from "react-native";
import { InterstitialAd } from '@react-native-admob/admob'; 
import theme from '../../../app/styles/theme.styles';
import {
    get, 
    getAlamatByCategory,
    getRecommendations
} from '../api/Alamat'; 
import { httpToHttps } from '../helper/helper'; 

const INTERSTITIAL_ID = 'ca-app-pub-4118987136087583/7614768508';  

class StoriesList extends React.Component<any, any> { 

    interstitial:any = '';
    constructor(props:any) {
        super(props) 
        this.state = {
            stories: {
                title: {rendered: String},
                excerpt: {rendered: String},
                id: Number,
                error:Boolean
            },
            loading:true,
            query: '',
            totalRecords: 0,
            clicks:1
        } 
    }   

    componentDidMount() { 
        this.fetchStories(); 
        this.interstitial = InterstitialAd.createAd(INTERSTITIAL_ID); 
    }

    async fetchStories(query = "", page = 1, categoryId = 0) { 
        let result:any = []; 
        if (this.props.category) {  
            let category = this.props.category ? this.props.category : categoryId;
            result = await await getAlamatByCategory(category, query, page); 
        }else if (this.props.recommendations) {
            result = await await getRecommendations(); 
        } else {
            result = await await get(query); 
        } 
        if (this.props.updateRecords) {
            // For pagination
            this.props.updateRecords(result.totalRecords);
            this.props.updateTotalPage(result.totalPages);
        }   

        this.setState({ stories: result.data, loading: false});
    }

    onpressHandler(id: string, title: string) {  
        this.props.navigation.navigate('Story', { id: id, title: title });
        this.setState({clicks: this.state.clicks + 1});
        if (this.state.clicks % 3 === 0) {
            this.interstitial.show()
            this.interstitial = InterstitialAd.createAd(INTERSTITIAL_ID);
        }
    }

    displayStory() {  
        return this.state.stories.map((item:any, key:number) => {   
            let excerpt = item.excerpt.rendered.replace(/<p>|<\/p>/g, '');
            const shortenExcerpt = excerpt.substring(0, 55) + '...';  
            const id = item.id; 
            const imageUrl = item._embedded.hasOwnProperty("wp:featuredmedia") ? item._embedded['wp:featuredmedia'][0].source_url : '';
            const category = item._embedded['wp:term'][0][0].name ?? null;
            const title = item.title.rendered;
            return <TouchableOpacity
                key={key}
                onPress={() => this.onpressHandler(id, title)}
                >
                <View style={styles.listItem}>
                    <View style={styles.imageContainer}>
                        {
                            Boolean(imageUrl) && (
                                <Image 
                                    style={styles.image}
                                    source={{uri: httpToHttps(item._embedded['wp:featuredmedia'][0].source_url)}}
                                />
                            )
                        }
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.listTitle}>{item.title.rendered}</Text>   
                        <Text style={styles.excerpt}>{shortenExcerpt}</Text>
                        <Text style={styles.category}>Category: { category }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        }); 
    }

    networkErrorMsg() {
        return <Text>{this.state.stories.message}</Text>
    }

    render() { 
        return (
            <SafeAreaView style={styles.container}> 
                {this.props.title? (<Text style={styles.heading}>{this.props.title}</Text>): null}
                { this.state.loading ? <Text style={styles.loader}>Loading...</Text> : (
                    this.state.stories.length && this.displayStory() || <Text style={styles.label}>No stories found</Text>
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    excerpt: {
        fontSize:theme.FONT_SIZE_SMALL,
        color:'#999999', 
    },
    category: {
        color:'rgba(0,0,0,0.5)', 
        fontSize:theme.FONT_SIZE_EXTRA_SMALL,
        marginTop:5
    },
    image: {
        width:'100%',
        height:90,
        borderRadius:5,
        resizeMode:'contain'
    }, 
    container: {
        paddingRight:20,
        paddingLeft:20
    },
    imageContainer: {
        width:'25%'
    },
    descriptionContainer: {
        width:'75%',
        paddingLeft:15
    },
    heading: {
        fontSize:theme.FONT_SIZE_LARGE,
        color:theme.headingColor, 
        marginTop:10,
        marginBottom:10
    }, 
    listItem: {   
        display:'flex',
        flexDirection:'row', 
        paddingBottom: 15,
        paddingTop:15,
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        borderRadius:10,
        marginBottom:10
    },
    listTitle: {
        fontSize:theme.FONT_SIZE_REGULAR,
        color:theme.headingColor,
        fontFamily:'Poppings-ThinItalic',
        marginBottom:5
    }, 
    label: {
        fontSize: theme.FONT_SIZE_SMALL,
        color: theme.headingColor
    },
    loader: {
        color: theme.bodyText, 
        fontSize: theme.FONT_SIZE_SMALL
    }
})

export default StoriesList;