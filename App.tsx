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
} from 'react-native';  
import HomeScreen from './src/components/screens/HomeScreen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SubmitStoryForm from './src/components/forms/SubmitStoryForm'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

const Root = () => {

  return (
    <Stack.Navigator 
      >
      <Stack.Screen
        name='Home'
        component={HomeScreen} 
        options={{
          headerBlurEffect:'dark',
          // header:() => {
          //   return (
          //     <View style={{
          //       backgroundColor:'#f0f7fe',
          //       height:70,
          //       display:'flex',
          //       justifyContent:'center',
          //       flexDirection:'row',
          //       alignItems:'center'
          //       }}> 
          //       <View style={{width:'50%',
          //         paddingLeft:20,
                  
          //       }}> 
          //         <Image 
          //           source={require('./src/assets/images/home.png')}
          //           style={{
          //             width:23,
          //             height:23
          //           }}
          //         />
          //       </View>
          //       <View
          //         style={{
          //           width:'50%',
          //           paddingRight:20
          //         }}
          //       >
          //          <Image 
          //       style={{
          //         width:23,
          //         height:23,
          //         zIndex:10,
          //         marginLeft:'auto',
                 
          //       }}
          //       source={require('./src/assets/images/search.png')} />
          //       </View>
          //       <Image style={{
          //         zIndex:-1,
          //         width:'100%',
          //         height:'100%',
          //         position:'absolute',
          //         resizeMode:'cover'}} source={require('./src/assets/images/header.png')} />
                
          //     </View>
          //   )
          // },
          headerStyle:{
            backgroundColor:'#52A0FE',

          },
          headerTintColor:'#fff', 
          contentStyle:{
            backgroundColor:"#f0f7fe",
          },
          headerRight:() => {
            return <Image 
              style={{width:25,height:25}}
              source={require('./src/assets/images/search.png')} />
          }
          
        }}
      />
      
    </Stack.Navigator>
  )
}
const App = () => {

  return (
    <NavigationContainer 
      theme={MyTheme}
    >
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let images = [
              require('./src/assets/images/home.png'),
              require('./src/assets/images/edit.png')
            ];
            let index = route.name == "Root" ? 0 : 1;
            return <Image style={styles.tabIcon} source={images[index]} />
          },
          tabBarLabelStyle: {
            margin:0,
            fontSize:12
          },
          tabBarShowLabel:false
        })}
        >
        <Tab.Screen 
          name='Root'
          component={Root}
          options={{
            headerTintColor:'#000',
            headerShown:false,
            tabBarLabel:"Home",
            tabBarStyle: {
              backgroundColor:"#52A0FE"
            }
          }} 
        
        />
        <Tab.Screen 
          name='Submit'
          component={SubmitStoryForm}  
          options={{
            tabBarShowLabel:false
          }}
        />
      </Tab.Navigator>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
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
