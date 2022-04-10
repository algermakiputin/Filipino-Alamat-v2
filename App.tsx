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
import React from 'react';
import {
  SafeAreaView, 
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';  
import HomeScreen from './src/components/screens/HomeScreen';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SubmitStoryForm from './src/components/forms/SubmitStoryForm'; 
import CategoryScreen from './src/components/screens/CategoryScreen';
import SearchScreen from './src/components/screens/SearchScreen'; 
import { createDrawerNavigator } from '@react-navigation/drawer'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 
const Drawer = createDrawerNavigator();  

const tabsOptions = (navigation:any) => {
  return {
    headerTintColor:'#fff',
    tabBarLabel:"Home",
    tabBarStyle: {
      backgroundColor:"#52A0FE"
    },
    headerStyle: {
      backgroundColor:"#52A0FE"
    },
    headerShown:false 
  }
}

function HomeTabs() {

  return (
    <Tab.Navigator  
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let images = [
            require('./src/assets/images/home.png'),
            require('./src/assets/images/edit.png')
          ];
          let index = route.name == "Home" ? 0 : 1;
          return <Image style={styles.tabIcon} source={images[index]} />
        }, 
        tabBarShowLabel:false
      })}
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
const App = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='HomeTabs'
      >
        <Drawer.Screen 
          name='HomeTabs'
          component={HomeTabs}
          options={({navigation}) => ({ 
            title:'Filipino Alamat V2',
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
        <Drawer.Screen 
          name='Category'
          component={CategoryScreen}
        /> 
        <Drawer.Screen 
          name='Search'
          component={SearchScreen}
        />
      </Drawer.Navigator>
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
    height:23,
    width:23
  }
});

export default App;
