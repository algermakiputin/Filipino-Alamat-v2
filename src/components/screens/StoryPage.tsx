import React from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native"; 
import theme from '../../../app/styles/theme.styles';
import { getById } from './../api/Alamat';
 

class StoryPage extends React.Component<any, any> {

    constructor(props:any) {
        super(props)
        this.state = {
            story: {
                title: String,
                content: String,
                imageURL: String
            }
        }
        
    }

    componentDidMount() {
        const id = this.props.route.params; 
        const story = getById(id);
        console.log(story);
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Image 
                        style={styles.image}
                        source={require('../../assets/images/categories/fruit.jpg')}
                    />
                    <Text style={styles.heading}>{this.state.title}</Text>
                    <Text style={styles.text}>{this.state.content}</Text>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:20,
        paddingRight:20
    },
    heading: {
        fontSize:theme.FONT_SIZE_LARGE,
        marginBottom:10,
        color:theme.headingColor
    },
    text: {
        fontSize:theme.FONT_SIZE_REGULAR,
        color: theme.bodyText
    },
    image: {
        width:'100%',
        height:250,
        resizeMode:'cover',
        marginBottom:10,
        borderRadius:5,
        borderWidth:1,
        borderColor:"#f4f4f5"
    }
});
export default StoryPage;