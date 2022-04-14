import React, {useRef} from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image
} from "react-native"; 
import theme from '../../../app/styles/theme.styles';
import {get} from '../api/Alamat'; 

interface rendered {
    rendered: String
}

interface Alamat {
    title: Array<rendered>,
    excerpt: Array<rendered>
}
interface State {
    stories: Array<Alamat>
}

  
class StoriesList extends React.Component<any, State> { 

    constructor(props:any) {
        super(props) 
        this.state = {
            stories: []
        } 
    }   

    async componentDidMount() { 
        const stories = await get(); 
        this.setState({stories: stories});
        console.log(this.state.stories);
    }

    displayStory() { 
        interface Alamat {
            title: string
        }
        const elements =  this.state.stories.map((item, key) => { 
            const source = {
                html : `${item.excerpt.rendered}`
            };
            return <TouchableOpacity
                key={key}
                onPress={() => this.props.navigation.navigate('Story')}
                >
                <View style={styles.listItem}>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={require('../../assets/images/categories/tao.jpg')}
                        />
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.listTitle}>{item.title.rendered}</Text>  
                        {/* 
                            todo: explode the string then render to text
                        */}
                        <Text style={styles.excerpt}>{(item.excerpt.rendered).trim()}</Text>
                        <Text style={styles.category}>Category: Tao</Text>
                    </View>
                </View>
            </TouchableOpacity>
        });
        return elements;
    }


    render() {

        return (
            <SafeAreaView style={styles.container}>
                {this.props.title? (<Text style={styles.heading}>{this.props.title}</Text>): null}
                {
                    this.state.stories.length ? this.displayStory() : <Text>No Story</Text>
                }
                 
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    excerpt: {
        fontSize:theme.FONT_SIZE_SMALL,
        color:'#999999',
        
    },
    category: {
        color:'rgba(0,0,0,0.5)',
        marginTop:5,
        fontSize:theme.FONT_SIZE_SMALL
    },
    image: {
        width:'100%',
        height:90,
        borderRadius:5,
        resizeMode:'contain'
    }, 
    container: {
        paddingRight:20,
        paddingLeft:20
    },
    imageContainer: {
        width:'25%'
    },
    descriptionContainer: {
        width:'75%',
        paddingLeft:15
    },
    heading: {
        fontSize:theme.FONT_SIZE_LARGE,
        color:theme.headingColor, 
        marginTop:10,
        marginBottom:10
    }, 
    listItem: {   
        display:'flex',
        flexDirection:'row', 
        paddingBottom: 15,
        paddingTop:15,
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        borderRadius:10,
        marginBottom:10
    },
    listTitle: {
        fontSize:theme.FONT_SIZE_MEDIUM,
        color:theme.headingColor,
        fontFamily:'Poppings-ThinItalic',
        marginBottom:5
    }
})

export default StoriesList;