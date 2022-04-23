import React from "react";
import {
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import themeStyles from "../../../app/styles/theme.styles";

interface IState {
    name: String,
    category: String,
    content: String
}

class SubmitStoryForm extends React.Component<any, IState> {

    constructor(props:any) {
        super(props); 
    } 

    submitHandler() {
        if (this.state.category && this.state.content && this.state.name) {
            
        }
    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Name</Text>
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
                        <Text style={styles.label}>Story Content (Min of 100 words)</Text>
                        <TextInput 
                            placeholder="Ex: Noong unang panahon..." 
                            multiline={true}
                            numberOfLines={10}
                            style={styles.textArea}
                            onChangeText={(text) => this.setState({content: text})}
                            />
                    </View> 
                    <View style={styles.formGroup}>
                        <TouchableOpacity 
                            onPress={() => this.submitHandler()}
                            style={styles.btn}>
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft:20,
        paddingRight:20
    },
    label: {
        fontSize: themeStyles.FONT_SIZE_REGULAR
    },
    input: {
        fontSize: themeStyles.FONT_SIZE_REGULAR,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#333',
        borderRadius:5,
        paddingLeft:10
    },
    formGroup: {
        marginBottom:10
    },
    textArea: {
        backgroundColor:"#fff",
        minHeight:150,
        width:'100%', 
        textAlignVertical:'top',
        fontSize: themeStyles.FONT_SIZE_REGULAR, 
        borderWidth:1,
        borderColor:'#333',
        borderRadius:5,
        paddingLeft:10
    },
    btn: {
        width:100,
        marginLeft:'auto',
        backgroundColor:themeStyles.MAIN_COLOR,
        borderRadius:3
    },
    btnText: {
        color:"#fff",
        textAlign:'center',
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:10,
        paddingRight:10
    }
})
export default SubmitStoryForm;