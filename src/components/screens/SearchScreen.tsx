import React from "react";
import { 
    SafeAreaView,
    View,
    Image,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import themeStyles from "../../../app/styles/theme.styles";
import StoriesList from "../ListViews/StoriesList";

class SearchScreen extends React.Component<any, any> {

    private storyList:any;

    constructor(props:any) {
        super(props)
        this.storyList = React.createRef();
        this.state = {
            query: ''
        }
        
    }

    render() {

        return (
            <SafeAreaView >
                <View style={styles.container}>
                    <TextInput 
                        style={styles.searchbox}
                        placeholder="Ex. Alamat ng Gagambass "
                        placeholderTextColor={"#333"} 
                        onChangeText={(text) => {
                            this.setState({query:text}) 
                            console.log(this.storyList.current.fetchStories(text))
                        }}
                    />
                    <Text style={styles.heading}>
                        Search results for: "{this.state.query}"
                    </Text>
                </View> 
                <StoriesList 
                    ref={this.storyList} 
                    navigation={this.props.navigation} 
                /> 
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight:20,
        paddingLeft:20
    },
    searchbox: {
        backgroundColor:"#ffffff",
        marginTop:15,
        borderColor:"#999999",
        borderWidth:1,
        borderRadius:10,
        paddingLeft:15,
        height:45,
        color:themeStyles.headingColor
    },
    heading: {
        fontSize:themeStyles.FONT_SIZE_MEDIUM,
        color:themeStyles.headingColor, 
        marginTop:15,
        marginBottom:10, 
    }
})

export default SearchScreen;