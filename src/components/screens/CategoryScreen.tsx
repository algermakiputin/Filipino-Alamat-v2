import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import StoriesList from '../ListViews/StoriesList';
import themeStyles from '../../../app/styles/theme.styles';
import { AdmobBanner } from '../Admob';

class CategoryScreen extends React.Component<any,any> {
    
    private ref:any;
    
    constructor(props:any) {
        super(props)  
        this.ref = React.createRef();
        this.state = {
            query: '',
            totalRecords: 0,
            page: 1,
            totalPage: 1
        }
        this.updateTotalRecords = this.updateTotalRecords.bind(this);
        this.updateTotalPage = this.updateTotalPage.bind(this); 
    }

    updateTotalRecords(total:number) {
        this.setState({totalRecords: total});
    } 

    updateTotalPage(total: number) {
        this.setState({totalPage: total});
    }

    nextButton() {
        return (
            <TouchableOpacity
                disabled={ this.state.page >= this.state.totalPage}
                style={this.state.page >= this.state.totalPage ? styles.btnDisabled : styles.btn}
                onPress={() => this.turnPage('next')}>
                <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
        )
    }

    prevButton() {
        return (
            <TouchableOpacity
                disabled={this.state.page === 1}
                style={this.state.page === 1 ? styles.btnDisabled : styles.btn}
                onPress={() => this.turnPage('prev')}>
                <Text style={styles.btnText}>Prev</Text>
            </TouchableOpacity>
        )
    }

    turnPage(action:String) {
        let page = 0;
        if (action === "next") {
            page = this.state.page + 1;
            this.setState({page: page});
        }else if (action === "prev") {
            page = this.state.page - 1;
            this.setState({page: page}); 
        } 
       
        this.ref.current.fetchStories('', page, this.props.route.params.id);
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}> 
                        <TextInput 
                            style={styles.searchbox}
                            placeholder="Search..."
                            placeholderTextColor={"#333"} 
                            onChangeText={(text) => {
                                this.setState({query:text})
                                this.ref.current.fetchStories(text);
                            }}
                        />
                        <Text style={styles.heading}>
                            { this.state.query ? <Text>Search Result for: "{this.state.query}"</Text> : (
                                <Text>Mga alamat tungkol sa {this.props.route.params.name}</Text>
                            )}
                        </Text>  
                        <Text>Total Stories: {this.state.totalRecords}</Text>  
                    </View> 
                    <StoriesList
                        ref={this.ref} 
                        title='' 
                        navigation={this.props.navigation} 
                        category={this.props.route.params.id}
                        query={this.state.query} 
                        updateRecords={this.updateTotalRecords}
                        updateTotalPage={this.updateTotalPage}
                        />
                    <View style={styles.btnsContainer}>
                        <View style={styles.btnWrapper}>
                            <Text>Page: {this.state.page} / {this.state.totalPage}</Text>
                            { this.prevButton() }
                            { this.nextButton() }
                        </View>
                    </View>
                    <AdmobBanner />  
                </ScrollView>    
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight:20,
        paddingLeft:20
    },
    headerImage: { 
        backgroundColor:"#333",
        borderRadius:10, 
        display:'flex',
        justifyContent:'center', 
        height:210
    },
    searchbox: {
        backgroundColor:"#ffffff",
        marginTop:15,
        borderColor:"#999999",
        borderWidth:1,
        borderRadius:10,
        paddingLeft:15,
        height:45
    },
    heading: {
        fontSize:themeStyles.FONT_SIZE_MEDIUM,
        color:themeStyles.headingColor, 
        marginTop:15,
        marginBottom:10, 
    }, 
    cover: {
        width:'100%',
        height:'100%', 
        resizeMode:'cover',
        borderRadius:10, 
        top:0,
        position:'absolute'
    
    },
    coverText: {
        color:"#fff",
        paddingRight:30,
        fontSize: themeStyles.FONT_SIZE_LARGE,
        fontWeight:'bold',
        textAlign:'center',
        paddingTop:20, 
    },
    btnsContainer: {
        paddingLeft:15,
        paddingRight:15,
        marginBottom:20
    },
    btnWrapper: { 
        display:'flex', 
        flexDirection:'row',
        marginLeft:'auto', 
        alignItems:'center'
    },
    btn: {
        width:'auto', 
        backgroundColor: themeStyles.MAIN_COLOR,
        marginRight:5,
        marginLeft:5,
        padding:6,
        paddingRight:12,
        paddingLeft:12,
        borderRadius:1
    },
    btnDisabled: {
        width:'auto', 
        backgroundColor: themeStyles.MAIN_COLOR,
        marginRight:5,
        marginLeft:5,
        padding:6,
        paddingRight:12,
        paddingLeft:12,
        borderRadius:1,
        opacity:0.75
    },
    btnText: {
        fontSize:themeStyles.FONT_SIZE_SMALL,
        color:'#ffffff'   
    }
});

export default CategoryScreen;