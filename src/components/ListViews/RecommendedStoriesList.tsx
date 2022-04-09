import React, {useRef} from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image
} from "react-native"; 
import theme from '../../../app/styles/theme.styles';

interface State {
    data: object,
    selected: number
}

class RecommendedStoriesList extends React.Component<{}, State> { 

    constructor(props:any) {
        super(props) 
 
    }   

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>Recommneded for you!</Text>
                <View>
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
                </View> 
                 
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    excerpt: {
        fontSize:theme.FONT_SIZE_SMALL,
        color:'rgba(0,0,0,0.5)',
        
    },
    category: {
        color:'rgba(0,0,0,0.5)',
        marginTop:5,
        fontSize:theme.FONT_SIZE_SMALL
    },
    image: {
        width:'100%',
        height:90,
        borderRadius:5,
        resizeMode:'contain'
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
        fontSize:theme.FONT_SIZE_LARGE,
        color:"#000"
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
        fontSize:theme.FONT_SIZE_MEDIUM,
        color:"#333"
    }
})

export default RecommendedStoriesList;