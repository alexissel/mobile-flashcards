import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { blue } from '../utils/colors'

export default function TextButton ({ children, onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={[styles.reset]}>{children}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	reset: {
		textAlign: 'center',
		color: blue,
		fontSize: 15,
		marginTop: 40,
	}
})