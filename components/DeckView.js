import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { blue, white, gray } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteDeck } from '../utils/api'
import { removeDeck } from '../actions'

class DeckView extends Component {
	deleteDeck = () => {
		const { deck, dispatch, navigation} = this.props

		return deleteDeck(deck.title)
			.then(() => dispatch(removeDeck(deck.title)))
			.then(() => navigation.navigate('Decks'))
			.catch((error) => console.warn('Error when trying to delete deck', error))
	}

	startQuiz = () => {
		const {deck, cards, navigation} = this.props

		if (cards === 0)
		{
			return Alert.alert('This quiz has no cards! Please a card.')
		}

		navigation.navigate('Quiz', { deck })
	}

	render() {
		const { deck, cards, navigation } = this.props

		cards === 1 ? (text = 'card') : (text = 'cards')

		return (
			<View style={styles.container}>
				<Text style={styles.header}><MaterialCommunityIcons name='cards-outline' size={25} color={blue} />&nbsp; {deck.title}</Text>

				<Text style={styles.subHeader}>({cards+' '+text})</Text>

				<View style={styles.buttons}>
					<TouchableOpacity style={styles.btnQuiz} onPress={this.startQuiz}>
						<Text style={styles.btnText}><MaterialCommunityIcons name='book-open-page-variant' size={20} />&nbsp; Start Quiz</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.btnNewCard} onPress={() => navigation.navigate('NewCard', { deck })}>
						<Text style={styles.btnText}><MaterialCommunityIcons name='bookmark-plus-outline' size={20} />&nbsp; Add Card</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.btnDelCard} onPress={this.deleteDeck}>
						<Text style={styles.btnText}><MaterialCommunityIcons name='bookmark-remove' size={20} />&nbsp; Delete Card</Text>
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
		marginBottom: 10,
	},

	subHeader: {
		textAlign: 'center',
		color: gray,
	},

	buttons: {
		marginTop: 150,
		alignItems: 'center',
	},

	btnQuiz: {
		width: 250,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: blue,
		borderRadius: 10,
		padding: 20,
		marginBottom: 30,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 6,
		shadowOpacity: 1
	},

	btnNewCard: {
		width: 250,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: gray,
		borderRadius: 10,
		padding: 20,
		marginBottom: 30,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 6,
		shadowOpacity: 1
	},

	btnDelCard: {
		width: 250,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#DC4E41',
		borderRadius: 10,
		padding: 20,
		marginBottom: 30,
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

function mapStateToProps(decks, { navigation }) {

	let deck = decks[navigation.state.params.deck.title]

	if (deck === undefined) {
		deck = {
			title: '',
			questions: []
		}
	}

	return {
		deck,
		cards: deck.questions.length
	}
}

export default connect(mapStateToProps)(DeckView)