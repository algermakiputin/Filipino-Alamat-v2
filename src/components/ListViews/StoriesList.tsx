import React, {useRef} from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image
} from "react-native";
import { InterstitialAd, TestIds } from '@react-native-admob/admob'; 
import theme from '../../../app/styles/theme.styles';
import {
    get, 
    getAlamatByCategory,
    getRecommendations
} from '../api/Alamat'; 
 
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
        this.interstitial = InterstitialAd.createAd(TestIds.INTERSTITIAL);
    }

    async fetchStories(query = "", page = 1, categoryId = 0) { 
        let result:any = [];
        // Fetching stories by category
        if (this.props.category) {
            let category = this.props.category ? this.props.category : categoryId;
            result = await await getAlamatByCategory(category, query, page); 
        } 
        else if (this.props.recommendations)
            result = await await getRecommendations(); 
        else 
            result = await await get(query); // returning search results
        
        if (this.props.updateRecords) {
            // For pagination
            this.props.updateRecords(result.totalRecords);
            this.props.updateTotalPage(result.totalPages);
        }   

        this.setState({ stories: result.data, loading: false});
    }

    displayStory() {  
        return this.state.stories.map((item:any, key:number) => {   
            let excerpt = item.excerpt.rendered.replace(/<p>|<\/p>/g, '');
            const shortenExcerpt = excerpt.substring(0, 55) + '...';  
            const id = item.id; 
            const imageUrl = item._embedded.hasOwnProperty("wp:featuredmedia") ? item._embedded['wp:featuredmedia'][0].source_url : '';
            const category = item._embedded['wp:term'][0][0].name ?? null;
             
            return <TouchableOpacity
                key={key}
                onPress={() => {  
                    this.props.navigation.navigate('Story', { id: id, title: item.title.rendered });
                    this.setState({clicks: this.state.clicks + 1});
                    if (this.state.clicks % 4 === 0) {
                        this.interstitial.show()
                        this.interstitial = InterstitialAd.createAd('ca-app-pub-4118987136087583/7614768508');
                    }
                }}
                >
                <View style={styles.listItem}>
                    <View style={styles.imageContainer}>
                        {
                            imageUrl ? (
                                <Image 
                                    style={styles.image}
                                    source={{uri: item._embedded['wp:featuredmedia'][0].source_url}}
                                />
                            ) : null
                        }
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.listTitle}>{item.title.rendered}</Text>   
                        <Text style={styles.excerpt}>{shortenExcerpt}</Text>
                        <Text style={styles.category}>Category: { category }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        ) 
    } 

    render() {

        return ( 
            <SafeAreaView style={styles.container}>
                {this.state.loading ? <Text style={styles.label}>Loading...</Text> : null}
                {this.props.title? (<Text style={styles.heading}>{this.props.title}</Text>): null}
                {
                    this.state.stories.error ? this.networkErrorMsg() : (
                        this.state.stories.length ? this.displayStory() : <Text style={styles.label}>No story found</Text>
                    )
                }
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
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.headingColor
    }
})

export default StoriesList;