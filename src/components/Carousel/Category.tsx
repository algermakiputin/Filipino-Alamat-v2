import React from "react";
import { 
    SafeAreaView,
    TouchableOpacity,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { getCategories } from "../api/Alamat"; 

const images = {
    prutas: require('../../assets/images/categories/fruit.jpg'),
    hayop: require('../../assets/images/categories/hayop.jpg'),
    tao: require('../../assets/images/categories/tao.jpg')
}

class Category extends React.Component<any,any> {

    constructor(props:any) {
        super(props);
        this.state = {
            data: [],
            categories:[]
        }
    }

    componentDidMount() { 
        this.setData();
    }
    
    categoryThumbnail(title:string, image:any) {
        return ( 
            <TouchableOpacity  
                style={styles.genreItem}
                onPress={() => this.props.navigation.navigate('Category', {category: title})}
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

    async setData() { 
        let category:Array<String> = [];
        let index:any = [];
        const categories = await getCategories();   
        categories.forEach((item:any, key:number) => {   
            if (key % 3 == 0 && key) {  
                category.push(index); 
                index = [];
            }
            index.push(item);
            if (key == categories.length - 1 && index.length)
                category.push(index);
        });    
        this.setState({data: category});  
    }

    displayCategories() { 
        return (
            <View style={styles.GenresSectionContainer}> 
                {this.categoryThumbnail('Prutas', images.prutas)}
                {this.categoryThumbnail('Prutas', images.prutas)}
                {this.categoryThumbnail('Prutas', images.prutas)}
            </View>
        );
        
    };

    render() {
        const sliderWidth = Dimensions.get('window').width;
        return (
            <SafeAreaView>
                {/* <Carousel 
                    data={this.state.data}
                    renderItem={() => this.displayCategories()}
                    sliderWidth={sliderWidth}
                    itemWidth={sliderWidth}
                    autoplay={true}
                    useScrollView={true}
                /> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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
    
    },
    GenresSectionContainer: {
        display:'flex',
        flexDirection:'row',
        paddingRight:15,
        paddingLeft:15, 
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