import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Ionicons} from '@expo/vector-icons'
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor:
    Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavNavigatior = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
},{
  defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
    tabBarIcon: (tabInfo) => {
      return <Ionicons name= 'ios-restaurant' size={25} color={tabInfo.tintColor}/>
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: Platform.OS ==='android'
      ? <Text barStyle={{fontFamily: 'open-sans-bold'}}>Meals</Text>
      : 'Meals'
    }
    
  },
  Favorites: {
  screen: FavNavigatior,
  navigationOptions: {
    tabBarIcon: (tabInfo) => {
      return <Ionicons name= 'ios-star' size={25} color={tabInfo.tintColor}/>
    },
    tabBarColor: Colors.accentColor,
    tabBarLabel: Platform.OS ==='android'
      ? <Text barStyle={{fontFamily: 'open-sans-bold'}}>Favorites</Text>
      : 'Favorites'
  }
}
};

const MealsFavTabNavigator = Platform.OS==='android'
 ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    shifting: true,
    barStyle: {
      backgroundColor: Colors.primaryColor
    }
 }) 
 : createBottomTabNavigator(tabScreenConfig,{
    tabBarOptions: {
      labelStyle: {
        fontFamily: 'open-sans'
      },
      activeTintColor: Colors.accentColor
    }
  });

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
},{
  // navigationOptions: {
  //   drawerLabel: 'Filters'
  // },
  defaultNavigationOptions: defaultStackNavOptions
}
);

const MainNavigator = createDrawerNavigator({
  MealsFav: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: {
    screen: FiltersNavigator
  }
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator);
