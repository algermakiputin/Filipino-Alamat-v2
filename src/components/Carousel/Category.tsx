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

const images = {
    prutas: require('../../assets/images/categories/fruit.jpg'),
    hayop: require('../../assets/images/categories/hayop.jpg'),
    tao: require('../../assets/images/categories/tao.jpg')
}

class Category extends React.Component {

    categoryThumbnail(title:string, image:any) {
        return ( 
            <TouchableOpacity style={styles.genreItem}
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

    displayCategories() {
        return (
            <View style={styles.GenresSectionContainer}>
                {this.categoryThumbnail('Prutas', images.prutas)}
                {this.categoryThumbnail('Hayop', images.hayop)}
                {this.categoryThumbnail('Tao', images.tao)}
            </View>
        );
        
    };

    render() {
        const sliderWidth = Dimensions.get('window').width;
        return (
            <SafeAreaView>
                <Carousel 
                    data={[1,2,3,4,5]}
                    renderItem={() => this.displayCategories()}
                    sliderWidth={sliderWidth}
                    itemWidth={sliderWidth}
                    autoplay={true}
                />
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
        paddingLeft:15
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