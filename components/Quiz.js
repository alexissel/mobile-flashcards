import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { blue, white, gray } from '../utils/colors'
import TextButton from './TextButton'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
	state = {
		index: 0,
		correctAnswers: 0,
		toggleCard: false
	}

	toggleCardAction = () => {
		this.setState({toggleCard: !this.state.toggleCard});
	}

	answerCorrect = () => {
		this.setState({
			index: this.state.index + 1,
			correctAnswers: this.state.correctAnswers + 1,
			toggleCard: false
		})
	}

	answerIncorrect = () => {
		this.setState({
			index: this.state.index + 1,
			toggleCard: false
		})
	}

	restartQuiz = () => {
		this.setState({
			index: 0,
			correctAnswers: 0,
			toggleCard: false
		})
	}

	render() {
		const { index, toggleCard, correctAnswers } = this.state
		const { decks, navigation } = this.props

		const { deck } = navigation.state.params

		const cards = decks[deck.title].questions
		const totalCards = deck.questions.length
		const cardDetails = cards[index]

		const { clearNotification } = clearLocalNotification().then(setLocalNotification)

		return (
			<View style={styles.container}>
				{ index < totalCards
					? <View>
						<View>
							<Text style={styles.smallText}>{`Cards: ${index + 1} / ${totalCards}`}</Text>
						</View>

						<View>
							<Text style={styles.header}>{toggleCard === false ? cardDetails.question : cardDetails.answer}</Text>
						</View>

						<View>
							<TextButton onPress={this.toggleCardAction}>{toggleCard === false ? '[Show Answer]' : '[Show Question]'}</TextButton>
						</View>

						<View style={styles.buttons}>
							<TouchableOpacity style={styles.btnCorrect} onPress={this.answerCorrect}>
								<Text style={styles.btnText}>Correct</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.btnIncorrect} onPress={this.answerIncorrect}>
								<Text style={styles.btnText}>Incorrect</Text>
							</TouchableOpacity>
						</View>
					</View>

					: <View>
						{ clearNotification }

						<View>
							<Text style={styles.header}>{`Correct Answers: ${correctAnswers} / ${totalCards}`}</Text>
						</View>

						<View style={styles.buttons}>
							<TouchableOpacity style={styles.btnCorrect} onPress={() => navigation.goBack()}>
								<Text style={styles.btnText}>Back To Deck</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.btnResetQuiz} onPress={this.restartQuiz}>
								<Text style={styles.btnText}>Restart Quiz</Text>
							</TouchableOpacity>
						</View>
					</View>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		padding: 20,
	},

	smallText: {
		color: gray,
		textAlign: 'center',
	},

	header:{
		fontSize: 25,
		textAlign: 'center',
		color: blue,
		marginTop: 50,
		marginBottom: 10,
	},

	buttons: {
		marginTop: 150,
		alignItems: 'center',
	},

	btnCorrect: {
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

	btnIncorrect: {
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

	btnResetQuiz: {
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

export default connect(mapStateToProps)(Quiz)