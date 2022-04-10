import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import StoriesList from '../ListViews/StoriesList';

class CategoryScreen extends React.Component<any,any> {

    render() {

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.headerImage}></View>
                    
                </View>
                <StoriesList 
                    title='' 
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
    headerImage: {
        height:120,
        backgroundColor:"#333",
        borderRadius:10
    }
});

export default CategoryScreen;