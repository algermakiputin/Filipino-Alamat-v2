import React from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image
} from "react-native"; 

class StoryPage extends React.Component {

    render() {
        return (
            <SafeAreaView style={{padding:20}}>
                <Image 
                    style={{width:'100%',height:200,resizeMode:'cover'}}
                    source={require('../../assets/images/categories/fruit.jpg')}
                />
                <Text>Alamat Title</Text>
                <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias itaque alias dolorum voluptatem eligendi sequi expedita dolor laudantium. Animi non incidunt omnis error dolorum repudiandae perferendis. Atque iure obcaecati molestias.</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

    heading: {

    },
    text: {
        
    }
});
export default StoryPage;