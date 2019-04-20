import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { blue, white } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

class Deck extends Component {
	render() {
		const { title, deck, navigation } = this.props

		let cards = deck ? deck.questions.length : 0

		cards === 1 ? (text = 'card') : (text = 'cards')

		return (
			<TouchableOpacity style={styles.deck} onPress={() => navigation.navigate('DeckView', {deck})}>
				<Text style={styles.deckTitle}>
					<MaterialCommunityIcons name='cards-outline' size={20} color={white} />&nbsp; {title} ({cards+' '+text})
				</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	deck: {
		backgroundColor: blue,
		borderRadius: 10,
		padding: 30,
		marginBottom: 30,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 6,
		shadowOpacity: 1
	},
	deckTitle: {
		color: white,
		fontSize: 15,
	}
})

function mapStateToProps(decks, { title }) {
	return {
		deck: decks[title]
	}
}

export default withNavigation(connect(mapStateToProps)(Deck))