import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StatusBar } from 'react-native';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Add from '../screens/Add';
import Settings from '../screens/Settings';
import Icon from '../components/Icon/Icon';


export type TAppLayoutProps = {
  Inicio: undefined;
  Buscar: undefined;
  Añadir: undefined;
  Perfil: undefined;
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
            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Buscar') {
              iconName = focused ? 'search' : 'search';
            } else if (route.name === 'Añadir') {
              iconName = focused ? 'plus' : 'plus';
            } else if (route.name === 'Perfil') {
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
          },
          tabBarItemStyle: {
            marginVertical: 10,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          },
        })}
        sceneContainerStyle={{
          backgroundColor: 'white',
        }}
        initialRouteName='Inicio'
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
    name: 'Inicio',
    component: Home,
    iconName: 'home',
  },
  {
    name: 'Buscar',
    component: Search,
    iconName: 'search',
  },
  {
    name: 'Añadir',
    component: Add,
    iconName: 'plus',
  },
  {
    name: 'Perfil',
    component: Settings,
    iconName: 'settings',
  },
];

export default AppLayout;