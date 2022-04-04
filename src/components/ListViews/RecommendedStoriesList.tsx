import React, {useRef} from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity
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
                    autoPlay={true} 
                    loop={true}
                    snapEnabled={true}
                    width={PAGE_WIDTH - 20}
                    autoPlayInterval={5000} 
                    onScrollEnd={(prev, next) => this.setState({selected:next})}
                    height={142} 
                    data={[1, 2, 3]}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <View style={styles.imageContainer}></View>
                            <View style={styles.descriptionContainer}>
                                <Text style={{fontSize:20}}>{item}</Text>
                                <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </Text>
                                <Text>By: John Doe</Text>
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
    indicator: {
        width:18,
        height:8,
        marginRight:5,
        marginLeft:5,
        borderRadius:12,
        backgroundColor:"#fff"
    },
    selectedIndicator: {
        width:18,
        height:8,
        marginRight:3,
        marginLeft:3,
        borderRadius:5,
        backgroundColor:"#333"
    },
    container: {
        padding:20
    },
    imageContainer: {
        height:90,
        backgroundColor:"#333",
        width:'35%'
    },
    descriptionContainer: {
        width:'65%',
        paddingLeft:10 
    },
    heading: {
        fontSize:20,
        marginBottom:10
    },
    listContainer: {  
    },
    listItem: {  
        backgroundColor:"#ffffff", 
        display:'flex',
        flexDirection:'row',
        padding:20,
        borderRadius:10
    }
})

export default RecommendedStoriesList;