import React from 'react';
import { View, ActivityIndicator } from 'react-native'


const Spinner = (props) => {
	return (
		<View style={styles.spinnerStyle}>
			<ActivityIndicator size={props.size || 'large'} style={styles.activityIndicator}/>
		</View>
	)
}

const styles = {
	spinnerStyle: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 70
	},
	activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
}

export { Spinner };