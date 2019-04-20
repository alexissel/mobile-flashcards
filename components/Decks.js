import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { blue } from '../utils/colors'
import Deck from './Deck'

class Decks extends Component {
	componentDidMount() {
		const { dispatch } = this.props

		getDecks().then((decks) => dispatch(receiveDecks(decks)))
	}

	render() {
		const { decks } = this.props

		return (
			<ScrollView style={styles.container}>
				<View>
					<Text style={styles.header}>My Decks</Text>
				</View>

				<View>
					{decks.map((deck) => <Deck key={deck.title} title={deck.title} />)}
				</View>
			</ScrollView>
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
	}
})

function mapStateToProps(decks) {
	return {
		decks: Object.values(decks)
	}
}

export default connect(mapStateToProps)(Decks)