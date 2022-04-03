import React from "react";
import { 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    ScrollView,
    Image
} from "react-native";
import RecommendedStoriesList from "../ListViews/RecommendedStoriesList";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

class HomeScreen extends React.Component {

    searchBar = () => {
        return (
            <View>
                <TextInput placeholder="Search..." />
            </View>
        )
    }
 
    genresSection = (title:string) => { 
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.heading}>{title}</Text>
                    
                </View>
                
                <View style={styles.GenresSectionContainer}>
                    <View style={styles.genreItem}>
                        <LinearGradient 
                            start={{x: 0, y: 1}} 
                            end={{x: 0, y: 0.35}} 
                            colors={['rgba(0,0,0,0.75)', 'transparent']}
                            style={styles.genreImage}
                            >
                            <Image
                                source={require('../../assets/images/categories/fruit.jpg')}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>Prutas</Text>   
                        </LinearGradient>   
                    </View>
                    <View style={styles.genreItem}> 
                        <LinearGradient 
                            start={{x: 0, y: 1}} 
                            end={{x: 0, y: 0.35}} 
                            colors={['rgba(0,0,0,0.75)', 'transparent']}
                            style={styles.genreImage}
                            >
                            <Image
                                source={require('../../assets/images/categories/hayop.jpg')}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>Hayop</Text>   
                        </LinearGradient> 
                    </View>
                    <View style={styles.genreItem}>
                        <LinearGradient 
                            start={{x: 0, y: 1}} 
                            end={{x: 0, y: 0.35}} 
                            colors={['rgba(0,0,0,0.75)', 'transparent']}
                            style={styles.genreImage}
                            >
                            <Image
                                source={require('../../assets/images/categories/tao.jpg')}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>Tao</Text>   
                        </LinearGradient> 
                    </View> 
                </View>
            </View>
        )
    }

    render() {

        return (
            <SafeAreaView> 
                <ScrollView>
                    {this.genresSection('Categories')} 
                    <RecommendedStoriesList />
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: { 
        paddingLeft:20,
        paddingRight:20
    },
    heading: {
        fontSize:20,
        marginTop:10,
        marginBottom:10
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