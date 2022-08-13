/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView, 
  StyleSheet,
  Text,
  TextInput,
  Image, 
  TouchableOpacity, 
} from 'react-native';  
import HomeScreen from './src/components/screens/HomeScreen';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SubmitStoryForm from './src/components/forms/SubmitStoryForm'; 
import CategoryScreen from './src/components/screens/CategoryScreen';
import SearchScreen from './src/components/screens/SearchScreen'; 
import StoryPage from './src/components/screens/StoryPage';
import themeStyles from './app/styles/theme.styles';
import Flags from './src/components/Modal/Flags';
import { getToken } from './src/components/api/Alamat';
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();  

const tabsOptions = (navigation:any) => ({
  headerTintColor:'#fff',
  tabBarLabel:"Home",
  tabBarStyle: {
    backgroundColor:"#52A0FE",
  },
  headerStyle: {
    backgroundColor:"#52A0FE"
  },
  headerShown:false,
});

const TabScreenOptions = (route:any) => ({
  tabBarIcon: () => {
    let images = [
      require('./src/assets/images/home.png'),
      require('./src/assets/images/edit.png')
    ];
    let index = route.name == "Home" ? 0 : 1;
    return <Image style={styles.tabIcon} source={images[index]} />
  }, 
  tabBarShowLabel:false,  
});

function HomeTabs(token: string) {

  return (
    <Tab.Navigator  
      screenOptions={({route}) => TabScreenOptions(route)}
      >
      <Tab.Screen 
        name='Home' 
        component={HomeScreen}
        options={({navigation}) => (tabsOptions(navigation))}
      /> 
      <Tab.Screen 
        name='Submit' 
        component={SubmitStoryForm}
        options={tabsOptions} />
    </Tab.Navigator>
  );
}

const stackPageOptions = {
  headerStyle: {
    backgroundColor:"#52A0FE",
    textAlign:'center'
  },
  headerTintColor:'#fff',
  headerShadowVisible:false,
  contentStyle: {
    backgroundColor:"#f0f7fe"
  }
} 

const App = () => {

  const flagModal = useRef<Flags | null>(null);
  const [ token, setToken ] = useState('');

  useEffect(() => {
    const fetchToken = async() => {
      await getToken().then(async(result) => {
        await AsyncStorage.setItem('token', result.data.token);
      }).catch(() => console.log('Error fetching token')); 
    }  
    
    fetchToken(); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeTabs'
      >
        <Stack.Screen 
          name='HomeTabs'
          component={HomeTabs}
          options={({navigation}) => ({  
            title: 'Ang Alamat',
            headerStyle: {
              backgroundColor:"#52A0FE",
            },
            
            headerTintColor:"#ffffff", 
            headerRight: () => { 
              return(
                <TouchableOpacity
                  onPress={() => navigation.navigate('Search')}
                >
                  <Image 
                    style={{width:22,height:22,marginRight:20}}
                    source={require('./src/assets/images/search.png')} 
                  />
                </TouchableOpacity>
              )
            }
          })} 
        />
        <Stack.Screen 
          name='Category'
          component={CategoryScreen}
          options={{
            headerStyle: {
              backgroundColor:"#52A0FE", 
            },
            headerTitleAlign:'center',
            headerTintColor:'#fff',
            headerShadowVisible:false,
            contentStyle: {
              backgroundColor:"#f0f7fe"
            }
          }}
        /> 
        <Stack.Screen 
          name='Search'
          component={SearchScreen}
          options={stackPageOptions}
        />
        <Stack.Screen 
          name='Story'
          component={StoryPage}
          options={({navigation, route}) => ({ 
            title:"Kwento",
            headerStyle: {
              backgroundColor:"#f0f7fe", 
            },
            headerTitleAlign:'center',
            headerTintColor:themeStyles.headingColor,
            headerShadowVisible:false,
            contentStyle: {
              backgroundColor:"#f0f7fe"
            },
            headerRight:() => {   
              return <TouchableOpacity
                onPress={async() => {
                  flagModal.current?.modalHandler();
                }}>
                  <Flags 
                    ref={flagModal} 
                    title={route?.params?.title}
                    />
                  <Text>Report/Flag</Text>
              </TouchableOpacity>
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SearchBar = () => {
  return <SafeAreaView>
    <TextInput  
      style={styles.searchBar}
      placeholder='Search'/>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  searchBar: {
    padding:10,
    borderWidth:1,
    borderColor:'#000'
  },
  container: {
    paddingLeft:20,
    paddingRight:20
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  highlight: {
    fontWeight: '700',
  },
  tabIcon: {
    height:26,
    width:26
  }
});

export default App;