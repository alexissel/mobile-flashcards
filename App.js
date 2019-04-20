import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { blue, white } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Tabs from './components/Tabs'
import DeckView from './components/DeckView'
import Decks from './components/Decks'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

function StatusBarApp ({backgroundColor, ...props}) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const MainNavigator = createAppContainer(createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	Decks: {
		screen: Decks
	},
	DeckView: {
		screen: DeckView,
		navigationOptions: {
			title: 'View Deck',
			headerTintColor: white,
			headerStyle: {
				backgroundColor: blue
			}
		}
	},
	NewCard: {
		screen: NewCard,
		navigationOptions: {
			title: 'New Question'
		}
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			title: 'Quiz'
		}
	}
}))

export default class App extends Component {
	componentDidMount() {
		setLocalNotification()
	}

	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{flex: 1}}>
					<StatusBarApp backgroundColor={blue} barStyle='light-content' />

					<MainNavigator />
				</View>
			</Provider>
		)
	}
}