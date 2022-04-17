import React, { useEffect, useState } from "react";
import { 
    SafeAreaView,
    TouchableOpacity,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    useWindowDimensions,
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { getCategories } from "../api/Alamat"; 
import { ScrollView } from "react-native-gesture-handler";

const images = {
    prutas: require('../../assets/images/categories/fruit.jpg'),
    hayop: require('../../assets/images/categories/hayop.jpg'),
    tao: require('../../assets/images/categories/tao.jpg')
}
const windowWidth = Dimensions.get('window').width;

function categoryThumbnail(title:string, image:any) {
    return ( 
        <TouchableOpacity  
            style={styles.genreItem}
            onPress={() => {} }//this.props.navigation.navigate('Category', {category: title})}
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
 

function Category() {
    const scrollX = React.useRef(new Animated.Value(0)).current; 
    const scrollViewRef = React.useRef<ScrollView|null>(null);
    const [index, setIndex] = useState(Number); 
    const indexRef = React.useRef(index);
    const maxIndex = 3;

    function test() {
        console.log(index);
    }

    useEffect(() => {   
        let interval = setInterval(function() {  
            setIndex((index) => {
                let scroll = index;
                scroll = index >= maxIndex ? 0 : index + 1;
                scrollViewRef.current?.scrollTo({x:(scroll) * windowWidth}); 
                return scroll;
            })
            
        },3500);
        return () => clearInterval(interval); 
    },[])

    return (
        <SafeAreaView>
            <ScrollView 
                ref={scrollViewRef}
                horizontal={true}
                scrollEnabled
                pagingEnabled={true}  
                onMomentumScrollEnd={() => {
                    console.log("animation ended");
                }}
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
            >
                <View style={styles.GenresSectionContainer}> 
                    <View style={styles.genreItem}>
                        <LinearGradient 
                        start={{x: 0, y: 1}} 
                        end={{x: 0, y: 0.35}} 
                        colors={['rgba(0,0,0,0.75)', 'transparent']}
                        style={styles.genreImage}
                        >
                            <Image
                                source={images.hayop}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>{"Hi"}</Text>   
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
                                source={images.hayop}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>{"Hi"}</Text>   
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
                                source={images.hayop}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>{"Hi"}</Text>   
                        </LinearGradient> 
                    </View>
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
                                source={images.hayop}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>{"Hayop"}</Text>   
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
                                source={images.prutas}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>{"Prutas"}</Text>   
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
                                source={images.tao}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>{"Tao"}</Text>   
                        </LinearGradient> 
                    </View>
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
                                source={images.hayop}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>{"Hayop"}</Text>   
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
                                source={images.prutas}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>{"Prutas"}</Text>   
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
                                source={images.tao}
                                style={styles.catImage}
                            />
                            <Text style={styles.catName}>{"Tao"}</Text>   
                        </LinearGradient> 
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
// class Category extends React.Component<any,any> {
 
//     constructor(props:any) {
//         super(props);
//         this.state = {
//             data: [],
//             categories:[]
//         }
        
//     }

//     componentDidMount() { 
//         this.setData();
//         const scrollX = React.useRef(new Animated.Value(0)).current;
//     }
    
//     categoryThumbnail(title:string, image:any) {
//         return ( 
//             <TouchableOpacity  
//                 style={styles.genreItem}
//                 onPress={() => this.props.navigation.navigate('Category', {category: title})}
//                 >
//                 <LinearGradient 
//                     start={{x: 0, y: 1}} 
//                     end={{x: 0, y: 0.35}} 
//                     colors={['rgba(0,0,0,0.75)', 'transparent']}
//                     style={styles.genreImage}
//                     >
//                     <Image
//                         source={image}
//                         style={styles.catImage}
//                     />
//                     <Text style={styles.catName}>{title}</Text>   
//                 </LinearGradient>   
//             </TouchableOpacity>
//         )
//     }

//     async setData() { 
//         let category:Array<String> = [];
//         let index:any = [];
//         const categories = await getCategories();   
//         categories.forEach((item:any, key:number) => {   
//             if (key % 3 == 0 && key) {  
//                 category.push(index); 
//                 index = [];
//             }
//             index.push(item);
//             if (key == categories.length - 1 && index.length)
//                 category.push(index);
//         });    
//         this.setState({data: category});  
//     }

//     displayCategories() { 
//         return (
//             <View style={styles.GenresSectionContainer}> 
//                 {this.categoryThumbnail('Prutas', images.prutas)}
//                 {this.categoryThumbnail('Prutas', images.prutas)}
//                 {this.categoryThumbnail('Prutas', images.prutas)}
//             </View>
//         );
        
//     };
 
// }

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