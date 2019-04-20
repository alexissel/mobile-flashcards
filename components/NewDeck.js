import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { blue, gray, white } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'

class NewDeck extends Component {
	state = { title: null }

	saveNewDeck = () => {
		const { decks, dispatch, navigation } = this.props
		const { title } = this.state

		if (title === null)
		{
			return Alert.alert('The title cannot be empty!')
		}
		else
		{
			if (decks[title])
			{
				return Alert.alert("There's already a deck with this title!")
			}
			else
			{
				const deck = { title: title, questions: [] }

				return saveDeckTitle(title)
					.then(() => {
						dispatch(addDeck(title))
						navigation.navigate('Decks')
					})
					.catch((error) => console.warn('Error when trying to save title', error))
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.header}>New Deck</Text>
				</View>

				<View style={{ marginTop: 100, alignItems: 'center' }}>
					<TextInput style={styles.inputText} placeholder='Enter your title' onChangeText={(title) => this.setState({title})} />

					<TouchableOpacity style={styles.btnNewDeck} onPress={this.saveNewDeck}>
						<Text style={styles.btnText}><MaterialCommunityIcons name='bookmark-plus-outline' size={20} />&nbsp; Add New Deck</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		padding: 20,
	},

	header:{
		fontSize: 25,
		textAlign: 'center',
		color: blue,
		marginBottom: 40,
	},

	inputText: {
		width: 250,
		backgroundColor: white,
		borderBottomWidth: 1,
		borderBottomColor: gray,
		padding: 20,
		fontSize: 20,
		marginBottom: 50,
	},

	btnNewDeck: {
		width: 250,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: blue,
		borderRadius: 10,
		padding: 20,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 6,
		shadowOpacity: 1
	},

	btnText: {
		color: white,
		fontSize: 15
	}
})

function mapStateToProps(decks) {
	return {
		decks
	}
}
export default connect(mapStateToProps)(NewDeck)