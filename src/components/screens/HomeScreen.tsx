import React from "react";
import { 
    SafeAreaView, 
    StyleSheet, 
    View, 
    Text,
    TextInput
} from "react-native";
import RecommendedStoriesList from "../ListViews/RecommendedStoriesList";

class HomeScreen extends React.Component {

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
                <View style={styles.GenresSectionContainer}>
                    <View style={styles.genreItem}>
                        <View style={styles.genreImage} />
                    </View>
                    <View style={styles.genreItem}> 
                        <View style={styles.genreImage} />
                    </View>
                    <View style={styles.genreItem}>
                        <View style={styles.genreImage} />
                    </View> 
                </View>
            </View>
        )
    }

    render() {

        return (
            <SafeAreaView> 
                {this.genresSection('Genres')} 
                <RecommendedStoriesList />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: { 
        paddingLeft:20,
        paddingRight:20
    },
    heading: {
        fontSize:20,
        marginTop:10,
        marginBottom:10
    },
    GenresSectionContainer: {
        display:'flex',
        flexDirection:'row',
        paddingRight:15,
        paddingLeft:15
    },
    genreItem: {
        width:'33.33%',
        height:100, 
        padding:5
    },
    genreImage: {
        height:100,
        backgroundColor:"#eee",
        borderRadius:10
    }
});

export default HomeScreen;