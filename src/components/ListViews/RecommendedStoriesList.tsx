import React from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View
} from "react-native";

class RecommendedStoriesList extends React.Component {

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>Recommneded for you!</Text>
                <View style={styles.listContainer}>
                    <View style={styles.listItem}>

                    </View>
                    <View style={styles.listItem}>
                        
                    </View> 
                </View>
                <View style={styles.listContainer}>
                    <View style={styles.listItem}>

                    </View>
                    <View style={styles.listItem}>
                        
                    </View> 
                </View> 
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding:20
    },
    heading: {
        fontSize:18,
        marginBottom:10
    },
    listContainer: {  
    },
    listItem: { 
        height:150,
        backgroundColor:"#eee",
        marginBottom:10
    }
})

export default RecommendedStoriesList;