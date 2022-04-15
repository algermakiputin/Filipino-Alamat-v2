import React from "react";
import { 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    ScrollView
} from "react-native";
import StoriesList from "../ListViews/StoriesList";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from "../../../app/styles/theme.styles";  

const Tab = createBottomTabNavigator();

class HomeScreen extends React.Component<any, any> {

    constructor(props:any) {
        super(props) 
    } 

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
            </View>
        )
    }

    render() { 
        return (
            <SafeAreaView style={{backgroundColor:"#f0f7fe"}}> 
                <ScrollView> 
                    <StoriesList 
                        title="Recommended For You!" 
                        navigation={this.props.navigation} 
                        />  
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
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
        fontSize:theme.FONT_SIZE_LARGE,  
        marginTop:10,
        marginBottom:10,
        color:theme.headingColor
    }
});

export default HomeScreen;