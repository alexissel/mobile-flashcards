import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { blue, white, gray } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

class NewCard extends Component {
	state = {
		question: null,
		answer: null
	}

	saveNewCard = () => {
		const { question, answer } = this.state
		const { dispatch, navigation } = this.props
		const { deck } = navigation.state.params

		const card = {
			question: question,
			answer: answer
		}

		if (question === null || answer === null)
		{
			return Alert.alert('The question and answer cannot be empty!')
		}
		else
		{
			return addCardToDeck(deck.title, card)
				.then(()=> dispatch(addCard(deck.title, card)))
				.then(()=> navigation.navigate('DeckView'))
				.catch((error) => console.warn('Error when trying to save the card', error))
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ marginTop: 70, alignItems: 'center' }}>
					<TextInput style={styles.inputText} placeholder='Enter your question' onChangeText={(question) => this.setState({question})} />

					<TextInput style={styles.inputText} placeholder='Enter your answer' onChangeText={(answer) => this.setState({answer})} />

					<TouchableOpacity style={styles.btnNewCard} onPress={this.saveNewCard}>
						<Text style={styles.btnText}><MaterialCommunityIcons name='book-plus' size={20} />&nbsp; Add Card</Text>
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

	inputText: {
		width: 250,
		backgroundColor: white,
		borderBottomWidth: 1,
		borderBottomColor: gray,
		padding: 20,
		fontSize: 20,
		marginBottom: 50,
	},

	btnNewCard: {
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

export default connect()(NewCard)