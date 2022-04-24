import axios from "axios";
import React from "react";
import {
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import themeStyles from "../../../app/styles/theme.styles";  
import {USERNAME, PASSWORD, HOST_NAME} from '@env';

interface IState {
    title: String,
    category: String,
    content: String,
    errors: Array<String>,
    wordCount: Number
}

class SubmitStoryForm extends React.Component<any, IState> {

    private storage = AsyncStorage;
    private initialState = {
        title: '',
        category: '',
        content: '',
        errors: [],
        wordCount: 0
    }

    constructor(props:any) {
        super(props); 
        this.state = this.initialState
    }  

    validateFields() {
        let errorrs = [];
        if (this.state.category === '')
            errorrs.push('Category is required');
        if (this.state.content === '')
            errorrs.push('Content is required');
        if (this.state.title === '')
            errorrs.push('Title is required');
        if (this.state.wordCount < 100) 
            errorrs.push('Story content must be more than 100 words');

        this.setState({errors: errorrs});
        return errorrs;
    }

    countWords() {
        let wordCount = this.state.content.split(' ').length;
        this.setState({wordCount: wordCount});
    }   

    async submitHandler() {
        let token: String | null = ''; 
        const error = this.validateFields(); 
        if (!error) {
            await this.getToken();   
            this.storage.getItem('token').then((res) => this.storeStory(res)); 
        }
    } 

    storeStory(token: String | null) { 
        axios.post(HOST_NAME + 'wp-json/wp/v2/alamat_posts', {
                    'title': this.state.title,
                    'content': this.state.content + '\n' + 'Category: ' + this.state.category
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            }).then(res => {
                this.setState(this.initialState);
            })
            .catch(err => console.log(err)) 
    }

    getToken() {  
        const url = 'http://192.168.1.6:8888/filipinoalamat//wp-json/jwt-auth/v1/token'
        axios.post(url, {
                username: USERNAME,
                password: PASSWORD
            })
            .then(async res => {
                await this.storage.setItem('token', res.data.token); 
            })
            .catch(err => console.log("error: " +err));
    }

    displayErrors() {
        return this.state.errors.map((item, key) => {
            return <Text key={key} style={styles.textDanger}>{item}</Text>
        })
    }
    
    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.container}>
                    <View style={styles.wrapper}>
                    <Text style={styles.heading}>Submit your story and let a thousand read</Text>
                    <View style={styles.formGroup}>
                        {this.state.errors.length ? this.displayErrors() : null }
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput 
                            placeholder="Ex: Alamat ng Pinya" 
                            style={styles.input} 
                            editable={true}
                            onChangeText={(text) => this.setState({title: text})}
                            />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Category</Text>
                        <TextInput 
                            placeholder="Ex: Prutas" 
                            style={styles.input}
                            onChangeText={(text) => this.setState({category: text})}
                            />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Story Content (Min of 100 words) Word count: {this.state.wordCount.toString()}</Text>
                        <TextInput 
                            placeholder="Ex: Noong unang panahon, panahon pa ng hapon..." 
                            multiline={true}
                            numberOfLines={8}
                            style={styles.textArea}
                            onChangeText={(text) => {
                                this.countWords();
                                this.setState({content: text});
                            }}
                            />
                    </View> 
                    <View style={styles.formGroup}>
                        <TouchableOpacity 
                            onPress={() => this.submitHandler()}
                            style={styles.btn}>
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:"#f0f7fe",
    },
    wrapper: {
        minHeight:Dimensions.get('screen').height - 180
    },
    label: {
        fontSize: themeStyles.FONT_SIZE_SMALL
    },
    input: {
        backgroundColor:"#ffffff",
        marginTop:5,
        borderColor:"#999999",
        borderWidth:1,
        borderRadius:10,
        paddingLeft:15,
        height:45
    },
    formGroup: {
        marginBottom:15
    },
    textArea: {
        backgroundColor:"#fff",
        minHeight:100,
        width:'100%', 
        textAlignVertical:'top', 
        marginTop:10,
        borderColor:"#999999",
        borderWidth:1,
        borderRadius:10,
        paddingLeft:15,
        color:themeStyles.bodyText
    },
    btn: {
        width:100,
        marginLeft:'auto',
        backgroundColor:themeStyles.MAIN_COLOR,
        borderRadius:3,
        marginBottom:20
    },
    btnText: {
        color:"#fff",
        textAlign:'center',
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:10,
        paddingRight:10
    },
    heading: {
        fontSize: themeStyles.FONT_SIZE_LARGE,
        marginTop:10, 
        color:themeStyles.bodyText
    },
    textDanger: {
        color:'red'
    }
})
export default SubmitStoryForm;