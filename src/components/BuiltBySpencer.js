import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';

const BuiltBySpencer = () => {
	const handlePress = () => {
		Linking.openURL('https://docs.google.com/document/d/1lfo9o-X-aBsnuN30Fhkm6WOfKTUJUHnd4Gxl5qkvh5A');
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handlePress}>
				<Text style={styles.linkText}>Built by Spencer</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
	},
	linkText: {
		color: '#1E90FF',
		textDecorationLine: 'underline',
		fontSize: 16,
	},
});

export default BuiltBySpencer;
