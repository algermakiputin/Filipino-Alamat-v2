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
  Image
} from 'react-native';  
import HomeScreen from './src/components/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SubmitStoryForm from './src/components/forms/SubmitStoryForm'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Root = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen} 
      />
      
    </Stack.Navigator>
  )
}
const App = () => {

  return (
    <NavigationContainer>
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
          }
        })}
        >
        <Tab.Screen 
          name='Root'
          component={Root}
          options={{
            headerTintColor:'#000',
            headerShown:false,
            tabBarLabel:"Home"
          }}
          
        
        />
        <Tab.Screen 
          name='Submit'
          component={SubmitStoryForm}  
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
    height:28,
    width:28
  }
});

export default App;
