import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, View } from 'react-native';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Icon from '../components/Icon/Icon';


export type TAppLayoutProps = {
  Home: undefined;
  Settings: undefined;
};
const Tab = createBottomTabNavigator<TAppLayoutProps>();
const AppLayout = () => {

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            console.log(size)
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'user' : 'user';
            }
            return <Icon iconName={iconName} iconSize={size} iconColor={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            
            borderTopWidth: 0,
            // elevation: 0,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          tabBarItemStyle: {
            marginVertical: 10,
            height:50,
            alignItems: 'center',
            justifyContent: 'center',
          },
        })}
        sceneContainerStyle={{
          backgroundColor: 'white',
        }}
        initialRouteName='Home'

      >
        {appTabs.map((tab) => {
          return (
            <Tab.Screen key={tab.name} name={tab.name} component={tab.component}
              options={{
                headerShown: false,
                title: tab.name,
              }}
            />
          )
        })}
      </Tab.Navigator>
    </>
  );
};

const appTabs: { name: keyof TAppLayoutProps, component: React.FC, iconName: string }[] = [
  {
    name: 'Home',
    component: Home,
    iconName: 'home',
  },
  {
    name: 'Settings',
    component: Settings,
    iconName: 'settings',
  },
];

export default AppLayout;
