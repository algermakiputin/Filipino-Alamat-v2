import React from "react";
import { Modal, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import themeStyles from "../../../app/styles/theme.styles";  
import { submitFlag } from '../api/Alamat'; 

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

    submitHandler(flag: string) {
        Alert.alert('Flag Post', 'Are you sure you want to flag this content?', [
            {
                text: 'Confirm',
                onPress: async() => {
                    await submitFlag(this.props.title, flag, this.props.token).then((res) => { 
                        this.modalHandler();
                    }).catch(err => console.log(err));
                }
            },
            {
                text: 'Cancel',
                onPress: () => {
                    this.modalHandler();
                }
            }
        ]);
        
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
                <View style={styles.container}>
                    <Text style={styles.header}>The reason why you find this content inappropriate</Text> 
                    <TouchableHighlight
                        activeOpacity={0.6}  
                        underlayColor="#eee"
                        onPress={() => this.submitHandler('Violence, Graphic Content, or Dangerous Activity')}>
                        <Text style={styles.flag}>Violence, Graphic Content, or Dangerous Activity</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.6}  
                        underlayColor="#eee"
                        onPress={() => this.submitHandler('Hate Speech & Bigotry')}>
                        <Text style={styles.flag}>Hate Speech & Bigotry</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.6}  
                        underlayColor="#eee"
                        onPress={() => this.submitHandler('Self-injury & Suicide')}>
                        <Text style={styles.flag}>Self-injury & Suicide</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.6}  
                        underlayColor="#eee"
                        onPress={() => this.submitHandler('Harassment & Trolling')}>
                        <Text style={styles.flag}>Harassment & Trolling</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.6}  
                        underlayColor="#eee"
                        onPress={() => this.submitHandler('Nudity & Pornography')}>
                        <Text style={styles.flag}>Nudity & Pornography</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.6}  
                        underlayColor="#eee"
                        onPress={() => this.submitHandler('Bullying')}>
                        <Text style={styles.flag}>Bullying</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.6}  
                        underlayColor="#eee"
                        onPress={() => this.submitHandler('Off Topic')}>
                        <Text style={styles.flag}>Off Topic</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={0.6}  
                        underlayColor="#eee"
                        onPress={() => this.submitHandler('Spam')}>
                        <Text style={styles.flag}>Spam</Text>
                    </TouchableHighlight>
                    <TouchableOpacity
                        onPress={() => this.setState({visible: false})} 
                    >
                        <Text style={{
                            fontSize: themeStyles.FONT_SIZE_MEDIUM,
                            borderColor:"#f4f4f5", 
                            alignSelf: 'center',
                            padding: 15
                        }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    }
}

const styles = StyleSheet.create({
    flag: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10, 
        paddingBottom:10,
        fontSize: themeStyles.FONT_SIZE_SMALL,
        borderBottomWidth: 1,
        borderColor:'#f4f4f5'
    },
    header: {
        fontSize: themeStyles.FONT_SIZE_LARGE,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10, 
    },
    container: { 
        borderRadius:5,
        maxWidth:305,
        backgroundColor:'white'
    }
});  

export default Flags;