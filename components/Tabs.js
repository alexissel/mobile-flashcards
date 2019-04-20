import React, { Component } from 'react'
import { Text, View, Platform } from 'react-native'
import { createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import Decks from './Decks'
import NewDeck from './NewDeck'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { blue, white } from '../utils/colors'

const navigationViews = {
	Decks: {
		screen: Decks,
		navigationOptions: {
			tabBarLabel: 'Decks',
			tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
		}
	},
	NewDeck: {
		screen: NewDeck,
		navigationOptions: {
			tabBarLabel: 'New Deck',
			tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='bookmark-plus-outline' size={30} color={tintColor} />
		}
	}
}

const navigationOptions = {
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? blue : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white : blue,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
}

const Navigation = Platform.OS === 'ios' ? createBottomTabNavigator(navigationViews, navigationOptions) : createMaterialTopTabNavigator(navigationViews, navigationOptions)

const Tabs = createAppContainer(Navigation)

export default Tabs