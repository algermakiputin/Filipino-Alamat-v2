import React from "react";
import { 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import StoriesList from "../ListViews/StoriesList";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import theme from "../../../app/styles/theme.styles"; 

const Tab = createBottomTabNavigator();
const images = {
    prutas: require('../../assets/images/categories/fruit.jpg'),
    hayop: require('../../assets/images/categories/hayop.jpg'),
    tao: require('../../assets/images/categories/tao.jpg')
}

class HomeScreen extends React.Component<any, any> {

    constructor(props:any) {
        super(props)
    } 

    searchBar = () => {
        return (
            <View>
                <TextInput placeholder="Search..." />
            </View>
        )
    }

    categoryThumbnail(title:string, image:any) {
        return ( 
            <TouchableOpacity style={styles.genreItem}
                onPress={() => this.props.navigation.navigate('Category')}
                >
                <LinearGradient 
                    start={{x: 0, y: 1}} 
                    end={{x: 0, y: 0.35}} 
                    colors={['rgba(0,0,0,0.75)', 'transparent']}
                    style={styles.genreImage}
                    >
                    <Image
                        source={image}
                        style={styles.catImage}
                    />
                    <Text style={styles.catName}>{title}</Text>   
                </LinearGradient>   
            </TouchableOpacity>
        )
    } 
 
    genresSection = (title:string) => { 
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.heading}>{title}</Text> 
                </View> 
                <View style={styles.GenresSectionContainer}> 
                    { this.categoryThumbnail('Prutas', images.prutas) } 
                    { this.categoryThumbnail('Hayop', images.hayop) } 
                    { this.categoryThumbnail('Tao', images.tao) } 
                </View>
            </View>
        )
    }

    render() { 
        return (
            <SafeAreaView style={{backgroundColor:"#f0f7fe"}}> 
                <ScrollView>
                    {this.genresSection('Categories')} 
                    <StoriesList 
                        title="Recommended For You!" 
                        navigation={this.props.navigation} 
                        /> 
                    <StoriesList 
                        title="Recently Added" 
                        navigation={this.props.navigation} 
                        /> 
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    storyImage: {
        height:125,
        backgroundColor:"#fff",
        borderRadius:10
    },
    storyItem: { 
        width:'50%',
        paddingRight:5,
        paddingLeft:5, 
    },
    storyWrapper: {
        display:'flex',
        flexDirection:'row',
        padding:15
    },
    container: { 
        paddingLeft:20,
        paddingRight:20,
    },
    heading: {
        fontSize:theme.FONT_SIZE_LARGE,  
        marginTop:10,
        marginBottom:10,
        color:theme.headingColor
    },
    catName: {
        position:'absolute',
        bottom:10,
        color:"#fff" 
    },
    catImage: {
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        flex:1,
        borderRadius:10,
        zIndex:-1
    },
    GenresSectionContainer: {
        display:'flex',
        flexDirection:'row',
        paddingRight:15,
        paddingLeft:15
    },
    genreItem: {
        width:'33.33%', 
        padding:5,
        
    },
    genreImage: {
        height:105, 
        display:'flex',
        alignItems:'center',
        position:'relative',
        zIndex:10,
        borderRadius:10
    
    }
});

export default HomeScreen;