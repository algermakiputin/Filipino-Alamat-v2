import React from "react";
import { 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    ScrollView,
    Dimensions
} from "react-native";
import StoriesList from "../ListViews/StoriesList"; 
import theme from "../../../app/styles/theme.styles";  
import Category from "../Carousel/Category"; 
import { get } from '../api/Alamat';

const screenHeight = Dimensions.get('screen').height;

class HomeScreen extends React.Component<any, any> {

    constructor(props:any) {
        super(props) 
        this.state = {
            offline: true
        }
    } 

    componentDidMount() {
        const fetch = async() => {
            return get();
        }

        fetch().catch(err => {
            this.setState({offline: false});
        })
    }

    searchBar = () => {
        return (
            <View>
                <TextInput placeholder="Search..." />
            </View>
        )
    } 

    render() { 
        
        return (
            <SafeAreaView style={{backgroundColor:"#f0f7fe", minHeight:screenHeight - 180}}> 
                {
                    this.state.offline ? (
                        <ScrollView>
                            <View>
                                <View style={styles.container}>
                                    <Text style={styles.heading}>Categories</Text> 
                                </View>   
                                <Category 
                                    navigation={this.props.navigation}
                                />
                            </View> 
                            <StoriesList 
                                title="Recommended For You!" 
                                navigation={this.props.navigation}
                                recommendations={true}
                                />  
                            <StoriesList 
                                title="Recently Added" 
                                navigation={this.props.navigation} 
                                />
                        </ScrollView>
                    ) : <View style={styles.offlineContainer}>
                        <Text style={styles.heading}>You're currently offline</Text>
                        <Text>Please check back your internet and you can start reading Filipino alamat stories again</Text>
                    </View>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        flex:1, 
        justifyContent:'center',
        alignItems:'center', 
        padding:20, 
    },
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
        fontSize:theme.FONT_SIZE_MEDIUM,  
        marginTop:10,
        marginBottom:10,
        color:theme.headingColor
    }
});

export default HomeScreen;