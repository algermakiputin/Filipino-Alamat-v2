import React from "react";
import { Modal, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import themeStyles from "../../../app/styles/theme.styles"; 

class Flags extends React.Component<any,any> {

    constructor(props: any) {
        super(props);
        this.state = {
            visible: false
        }
    }

    modalHandler() {
        this.setState({visible: !this.state.visible});
    }

    componentDidMount() {
        console.log('Flags component loaded');
    }

    render() {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.visible} 
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center', 
                backgroundColor:'rgba(0,0,0,0.2)'
            }}>
                <View style={{
                    backgroundColor:"white",
                    padding:15,
                    borderRadius:5,
                    maxWidth:300
                }}>
                    <Text style={{fontSize: themeStyles.FONT_SIZE_MEDIUM, padding: 5}}>The reason why you find this content inappropriate</Text> 
                    <TouchableHighlight
                        activeOpacity={0.6}  
                        underlayColor="#DDDDDD"
                        onPress={() => alert('Pressed!')}>
                        <Text style={{fontSize: themeStyles.FONT_SIZE_SMALL, padding: 5}}>Violence, Graphic Content, or Dangerous Activity</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={{fontSize: themeStyles.FONT_SIZE_SMALL, padding: 5}}>Hate Speech & Bigotry</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={{fontSize: themeStyles.FONT_SIZE_SMALL, padding: 5}}>Self-injury & Suicide</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={{fontSize: themeStyles.FONT_SIZE_SMALL, padding: 5}}>Harassment & Trolling</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={{fontSize: themeStyles.FONT_SIZE_SMALL, padding: 5}}>Nudity & Pornography</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={{fontSize: themeStyles.FONT_SIZE_SMALL, padding: 5}}>Bullying</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={{fontSize: themeStyles.FONT_SIZE_SMALL, padding: 5}}>Off Topic</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={{fontSize: themeStyles.FONT_SIZE_SMALL, padding: 5}}>Spam</Text>
                    </TouchableHighlight>
                    <TouchableOpacity
                        onPress={() => this.setState({visible: false})}
                    >
                        <Text style={{fontSize: themeStyles.FONT_SIZE_MEDIUM}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    }
}

export default Flags;