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
    name: string,
    email: string,
    subject: string,
    message: string,
    errors: Array<string>, 
    success:boolean,
    loading:boolean
}

class SubmitStoryForm extends React.Component<any, IState> {

    private storage = AsyncStorage;
    private initialState = {
        name:'',
        email: '',
        subject: '',
        message: '',
        errors: [], 
        success: false,
        loading: false
    }

    private title = React.createRef<TextInput>();
    private category = React.createRef<TextInput>();
    private content = React.createRef<TextInput>();
    private name = React.createRef<TextInput>();
    private scroll = React.createRef<ScrollView>();

    constructor(props:any) {
        super(props); 
        this.state = this.initialState
    }  

    validateFields() {
        let errors = [];
        if (this.state.name === '')
            errors.push('Name is required');
        if (this.state.email === '')
            errors.push('Email is required');
        if (this.state.subject === '')
            errors.push('Subject is required');
        if (this.state.message === '') 
            errors.push('Message is required');
        if (this.state.email !== '' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email)) {
            errors.push('Invalid email');
        }
        this.scrollToTop();
        this.setState({errors: errors});
        return errors;
    }

    async submitHandler() {
        let token: String | null = ''; 
        const error = this.validateFields();  

        if (!error.length) { 
            this.setState({loading:true}) 
            this.storage.getItem('token').then((res) => this.storeStory(res));  
        }
    } 

    scrollToTop() {
        this.scroll.current?.scrollTo({x:0,y:0,animated:true});
    }

    storeStory(token: String | null) { 
        axios.post(HOST_NAME + 'wp-json/wp/v2/alamat_posts', {
                    'title': this.state.subject,
                    'content': this.state.message + '\n' + 'Name: ' + this.state.name + '\n' + 'Email: ' + this.state.email
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            }).then(res => {
                this.title.current?.clear();
                this.category.current?.clear();
                this.content.current?.clear();
                this.name.current?.clear();  
                this.setState({success: true});
                this.setState({loading:false})
                this.scrollToTop();
            })
            .catch(err => console.log(err)) 
    }

    displayErrors() {
        return this.state.errors.map((item, key) => {
            return <Text key={key} style={styles.textDanger}>{item}</Text>
        })
    }

    displaySuccess() { 
        setTimeout(() => this.setState({success: false}), 5000)
        return <Text style={{color:'green'}}>Message sent successfully</Text>
    }
    
    render() {
        return (
            <SafeAreaView>
                <ScrollView 
                    ref={this.scroll}
                    style={styles.container}>
                    <View style={styles.wrapper}>
                    <Text style={styles.heading}>Contact Us</Text>
                    <View style={styles.formGroup}>
                        { this.state.errors.length ? this.displayErrors() : null }
                        { this.state.success ? this.displaySuccess() : null } 
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput 
                            ref={this.name} 
                            placeholder="Your name"
                            style={styles.input} 
                            editable={true}
                            onChangeText={(text) => this.setState({name: text})}
                            />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>E-Mail</Text>
                        <TextInput 
                            ref={this.title} 
                            placeholder="Your email address"
                            style={styles.input} 
                            editable={true}
                            onChangeText={(text) => this.setState({email: text})}
                            />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Subject</Text>
                        <TextInput 
                            ref={this.category} 
                            placeholder="Subject"
                            style={styles.input}
                            onChangeText={(text) => this.setState({subject: text})}
                            />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Message</Text>
                        <TextInput 
                            ref={this.content}
                            placeholder="Your message" 
                            multiline={true}
                            numberOfLines={8}
                            style={styles.textArea}
                            onChangeText={(text) => { 
                                this.setState({message: text});
                            }}
                            />
                    </View> 
                    <View style={styles.formGroup}>
                        <TouchableOpacity 
                            onPress={() => this.submitHandler()}
                            style={styles.btn}>
                            <Text style={styles.btnText}>Send Message</Text>
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
        fontSize: themeStyles.FONT_SIZE_SMALL,
        color:themeStyles.headingColor
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
        marginLeft:'auto',
        backgroundColor:themeStyles.MAIN_COLOR,
        borderRadius:3,
        marginBottom:20,
        paddingLeft:10,
        paddingRight:10
    },
    btnText: {
        color:"#fff",
        textAlign:'center',
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:10,
        paddingRight:10,
        fontSize:themeStyles.FONT_SIZE_REGULAR, 
    },
    heading: {
        fontSize: themeStyles.FONT_SIZE_EXTRA_LARGE,
        marginTop:10, 
        color:themeStyles.bodyText
    },
    textDanger: {
        color:'red'
    }
})
export default SubmitStoryForm;