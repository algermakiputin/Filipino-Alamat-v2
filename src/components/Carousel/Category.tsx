import React, { useEffect, useState } from "react";
import { 
    SafeAreaView,
    TouchableOpacity,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated 
} from "react-native"; 
import LinearGradient from 'react-native-linear-gradient';
import { getCategories } from "../api/Alamat"; 
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const images = {
    prutas: require('../../assets/images/categories/fruit.jpg'),
    hayop: require('../../assets/images/categories/hayop.jpg'),
    tao: require('../../assets/images/categories/tao.jpg')
}
const windowWidth = Dimensions.get('window').width;  

function Category(props:any) {
    const scrollX = React.useRef(new Animated.Value(0)).current; 
    const scrollViewRef = React.useRef<ScrollView|null>(null);
    const [index, setIndex] = useState(Number);  
    const [data, setData] = useState(Array);
    const maxIndex = 3;  
    async function fetchData() { 
        let category:Array<String> = [];
        let index:any = [];
        const categories = await getCategories();    
        if (categories) {
            categories.forEach((item:any, key:number) => {
                 
                if (key % 3 == 0 && key) {  
                    category.push(index); 
                    index = [];
                }
                index.push(item);
                if (key == categories.length - 1 && index.length)
                    category.push(index); 
                
            });       
            setData(category);
        }
    }

    function displayCategories() { 
        return data.map((value:any, key:number) => {
            return (
                <View key={key} style={styles.GenresSectionContainer}> 
                    {
                        value.map((item:any, index:number) => { 
                            return (
                                <TouchableOpacity 
                                    onPress={() => props.navigation.navigate('Category', {name: item.name, id: item.term_id})}
                                    key={index}
                                    style={styles.genreItem}> 
                                        <LinearGradient 
                                            start={{x: 0, y: 1}} 
                                            end={{x: 0, y: 0.35}} 
                                            colors={['rgba(0,0,0,0.75)', 'transparent']}
                                            style={styles.genreImage}
                                            >
                                            { item.thumbnail ? (
                                                <Image
                                                    source={{
                                                        uri: item.thumbnail
                                                    }}
                                                    style={styles.catImage}
                                                />
                                                ) : null
                                            }
                                            <Text style={styles.catName}>{item.name}</Text>   
                                        </LinearGradient> 
                                </TouchableOpacity> 
                            )
                        })
                    } 
                </View>
            )
        });
    }

    useEffect(() => { 
        fetchData();
        let interval = setInterval(function() {  
            setIndex((index) => {
                let scroll = index;
                scroll = index >= maxIndex ? 0 : index + 1;
                scrollViewRef.current?.scrollTo({x:(scroll) * windowWidth}); 
                return scroll;
            }) 
        },4000);
        return () => clearInterval(interval); 
    },[])

    return (
        <SafeAreaView>
            <ScrollView 
                ref={scrollViewRef}
                horizontal={true}
                scrollEnabled
                pagingEnabled={true}   
                onScroll={(event) => {
                    let currentIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);  
                    //console.log("current index:" + currentIndex); 
                    setIndex(currentIndex); 
                    Animated.event([
                        { 
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX
                                },
                                
                            }, 
                        }, 
                    ],
                    {useNativeDriver: false});
                }}
                scrollEventThrottle={1} 
                showsHorizontalScrollIndicator={false}
                style={{marginBottom:10}}
            >  
                {displayCategories()}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({ 
    genreItem: {
        width:'33.33%',height:105,
        paddingRight:5,
        paddingLeft:5
    },
    genreImage: {
        height:'100%', 
        display:'flex',
        alignItems:'center',
        position:'relative',
        zIndex:10,
        borderRadius:10,
        width:'100%'
    },
    GenresSectionContainer: {
        display:'flex',
        flexDirection:'row',
        width: windowWidth, 
        position:'relative',
        paddingLeft:15,
        paddingRight:15
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
    }
});

export default Category;