import React, {useRef} from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image
} from "react-native";
import { Dimensions } from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

const PAGE_WIDTH = Dimensions.get('window').width - 20;

interface State {
    data: object,
    selected: number
}

class RecommendedStoriesList extends React.Component<{}, State> {
 
    private carouselRef = React.createRef<ICarouselInstance>();

    constructor(props:any) {
        super(props)
        this.state = {
            data: [
                {
                    title: 'Alamat ng Pinya'
                },
            ],
            selected:0
        } 
 
    }  

    buttons() {
        
        let elements = [];
        let index = 3;

        for (let i = 0; i < index; i++) {

            elements.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => {
                        this.carouselRef.current?.goToIndex(i,true); 
                    }}
                    style={this.state.selected == i ? styles.selectedIndicator : styles.indicator}
                /> 
            );
        }

        return ( 
            <View style={{display:'flex',flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
                {elements}
            </View>
        )
    }

    componentDidMount() {

        
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>Recommneded for you!</Text>
                <View style={styles.listContainer}>
                </View> 
                <Carousel   
                    ref={this.carouselRef}
                    autoPlay={false} 
                    loop={true}
                    snapEnabled={true}
                    width={PAGE_WIDTH - 20}
                    autoPlayInterval={5000} 
                    onScrollEnd={(prev, next) => this.setState({selected:next})}
                    height={405} 
                    data={[1, 2, 3]}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.listItem}>
                                <View style={styles.imageContainer}>
                                    <Image 
                                        style={styles.image}
                                        source={require('../../assets/images/categories/tao.jpg')}
                                    />
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.listTitle}>Alamat ng Septik Tank</Text>
                                    <Text style={styles.excerpt}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </Text>
                                    <Text style={styles.category}>Category: Tao</Text>
                                </View>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.imageContainer}>
                                    <Image 
                                        style={styles.image}
                                        source={require('../../assets/images/categories/hayop.jpg')}
                                    />
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.listTitle}>Alamat ng Lababo</Text>
                                    <Text style={styles.excerpt}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </Text>
                                    <Text style={styles.category}>Category: Hayop</Text>
                                </View>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.imageContainer}>
                                    <Image 
                                        style={styles.image}
                                        source={require('../../assets/images/categories/fruit.jpg')}
                                    />
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.listTitle}>Alamat ng Gintong Ngipin</Text>
                                    <Text style={styles.excerpt}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </Text>
                                    <Text style={styles.category}>Category: Prutas</Text>
                                </View>
                            </View>
                        </View>
                        
                    )}
                />
                {this.buttons()}
                
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    excerpt: {
        fontSize:14,
        color:'rgba(0,0,0,0.5)',
        
    },
    category: {
        color:'rgba(0,0,0,0.5)',
        marginTop:5,
        fontSize:13 
    },
    image: {
        width:'100%',
        height:90,
        borderRadius:5,
        resizeMode:'contain'
    },
    indicator: {
        width:25,
        height:10,
        marginRight:5,
        marginLeft:5,
        borderRadius:12,
        backgroundColor:"#fff"
    },
    selectedIndicator: {
        width:25,
        height:10,
        marginRight:5,
        marginLeft:5,
        borderRadius:5,
        backgroundColor:"#333"
    },
    container: {
        padding:20
    },
    imageContainer: {
        width:'25%'
    },
    descriptionContainer: {
        width:'75%',
        paddingLeft:15
    },
    heading: {
        fontSize:20,
        color:"#000"
    },
    listContainer: {  
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
        fontSize:18,
        color:"#333"
    }
})

export default RecommendedStoriesList;