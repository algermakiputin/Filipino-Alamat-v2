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
        return text;
    }

    async componentDidMount() {
        const id = this.props.route.params.id; 
        const story:any = await getById(id);  
        this.setState({
            title: story.title.rendered,
            content: this.formatContent(story.content.rendered),
            imageURL: story._embedded['wp:featuredmedia'][0].source_url,
            category: story._embedded['wp:term'][0][0].name 
        }); 
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Image 
                        style={styles.image}
                        source={{
                            uri: this.state.imageURL
                        }}
                    />
                    <View style={styles.container}>
                        
                        <Text>{this.state.image}</Text> 
                        <Text style={styles.category}>Category: {this.state.category}</Text>
                        <Text style={styles.heading}>{this.state.title}</Text>
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
    },
    container: {
        paddingLeft:20,
        paddingRight:20
    },
    heading: {
        fontSize:theme.FONT_SIZE_LARGE,
        marginBottom:15,
        color:theme.headingColor
    },
    text: {
        fontSize:theme.FONT_SIZE_REGULAR,
        color: theme.bodyText
    },
    image: {
        width:'100%',
        height:275,
        resizeMode:'cover',
        marginBottom:10 
    },
    paragraph: { 
        fontSize:theme.FONT_SIZE_REGULAR,
        lineHeight:theme.lineHeight,
        color: theme.bodyText
    }
});
export default StoryPage;