import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    Text,
    TextInput
} from 'react-native';
import StoriesList from '../ListViews/StoriesList';
import themeStyles from '../../../app/styles/theme.styles';

class CategoryScreen extends React.Component<any,any> {
    
    private ref:any;
    
    constructor(props:any) {
        super(props)  
        this.ref = React.createRef();
        this.state = {
            query: ''
        }
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}> 
                    <TextInput 
                        style={styles.searchbox}
                        placeholder="Search..."
                        placeholderTextColor={"#333"} 
                        onChangeText={(text) => {
                            this.setState({query:text})
                            this.ref.current.fetchStories(text);
                        }}
                    />
                    <Text style={styles.heading}>
                        { this.state.query ? <Text>Search Result for: "{this.state.query}"</Text> : (
                            <Text>Mga alamat tungkol sa {this.props.route.params.name}</Text>
                        )}
                    </Text>    
                </View>
                <ScrollView>
                    <StoriesList
                        ref={this.ref} 
                        title='' 
                        navigation={this.props.navigation} 
                        category={this.props.route.params.id}
                        query={this.state.query} 
                        />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight:20,
        paddingLeft:20
    },
    headerImage: { 
        backgroundColor:"#333",
        borderRadius:10, 
        display:'flex',
        justifyContent:'center', 
        height:210
    },
    searchbox: {
        backgroundColor:"#ffffff",
        marginTop:15,
        borderColor:"#999999",
        borderWidth:1,
        borderRadius:10,
        paddingLeft:15,
        height:45
    },
    heading: {
        fontSize:themeStyles.FONT_SIZE_MEDIUM,
        color:themeStyles.headingColor, 
        marginTop:15,
        marginBottom:10, 
    }, 
    cover: {
        width:'100%',
        height:'100%', 
        resizeMode:'cover',
        borderRadius:10, 
        top:0,
        position:'absolute'
    
    },
    coverText: {
        color:"#fff",
        paddingRight:30,
        fontSize: themeStyles.FONT_SIZE_LARGE,
        fontWeight:'bold',
        textAlign:'center',
        paddingTop:20,
    
    }
});

export default CategoryScreen;