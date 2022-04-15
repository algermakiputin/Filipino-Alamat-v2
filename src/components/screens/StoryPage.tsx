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
            title: String,
            content: Object,
            imageURL: String,
            category: String
        }
        
    }

    formatContent(content:string) {
        let text:any = [];
        const divider = content.split("</p>");
        divider.map((value, key) => {
            const cleanString = value.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
            console.log(cleanString);
            text.push( <Text key={key} style={styles.paragraph}>{cleanString}</Text> );
        });
        console.log(text);
        return text;
    }

    async componentDidMount() {
        const id = this.props.route.params.id; 
        const story:any = await getById(id); 
        console.log(story);
        this.setState({
            title: story.title.rendered,
            content: this.formatContent(story.content.rendered),
            imageURL: story._embedded['wp:featuredmedia'][0].source_url,
            category: story._embedded['wp:term'][0][0].name
        });
        this.props.navigation.setOptions({title: story.title.rendered});
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        <Image 
                            style={styles.image}
                            source={require('../../assets/images/categories/fruit.jpg')}
                        />
                        <Text>{this.state.image}</Text>
                        <Text style={styles.heading}>{this.state.title}</Text>
                        <Text style={styles.category}>Category: {this.state.category}</Text>
                        {this.state.content}
                    </View> 
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    category: {
        fontSize:theme.FONT_SIZE_SMALL,
        color:theme.bodyText,
        marginBottom:10
    },
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
    },
    paragraph: { 
        fontSize:theme.FONT_SIZE_REGULAR,
        lineHeight:theme.lineHeight,
        color: theme.bodyText
    }
});
export default StoryPage;