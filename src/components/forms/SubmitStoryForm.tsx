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
import themeStyles from "../../../app/styles/theme.styles";


interface IState {
    name: String,
    category: String,
    content: String,
    errors: Array<String>,
    wordCount: Number
}

class SubmitStoryForm extends React.Component<any, IState> {

    constructor(props:any) {
        super(props); 
        this.state = {
            name: '',
            category: '',
            content: '',
            errors: [],
            wordCount: 0
        }
    } 

    validateFields() {
        let errorrs = [];
        if (this.state.category === '')
            errorrs.push('Category is required');
        if (this.state.content === '')
            errorrs.push('Content is required');
        if (this.state.name === '')
            errorrs.push('Title is required');
        if (this.state.wordCount < 100) 
            errorrs.push('Story content must be more than 100 words');

        this.setState({errors: errorrs});
    }

    countWords() {
        let wordCount = this.state.content.split(' ').length;
        this.setState({wordCount: wordCount});
    }   

    submitHandler() {
        this.validateFields();

        if (!this.state.errors) {
            console.log('submitting the form');
        }
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
                            onChangeText={(text) => this.setState({name: text})}
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
        //minHeight:Dimensions.get('screen').height
    },
    label: {
        fontSize: themeStyles.FONT_SIZE_REGULAR
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
        marginBottom:10,
        color:themeStyles.bodyText
    },
    textDanger: {
        color:'red'
    }
})
export default SubmitStoryForm;