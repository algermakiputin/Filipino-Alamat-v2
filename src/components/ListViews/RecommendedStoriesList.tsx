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

class RecommendedStoriesList extends React.Component<{}, {}> {
 
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
                    style={styles.indicator}
                /> 
            );
        }

        return ( 
            <View style={{display:'flex',flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
                {elements}
            </View>
        )
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
                    loop
                    width={PAGE_WIDTH - 20}
                    autoPlayInterval={5000} 
                    height={143}
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
        width:12,
        height:12,
        marginRight:5,
        marginLeft:5,
        borderRadius:12,
        backgroundColor:"#fff"
    },
    selectedIndicator: {
        width:20,
        height:10,
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
        fontSize:18,
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