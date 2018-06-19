import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			hasError: '',
			loading: false
		}
	}

	onButtonPress(){
		const {email, password} = this.state;
		this.setState({hasError: '', loading: true})
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
				//Fail to sign in
				firebase.auth().createUserWithEmailAndPassword(email,password)
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLoginFailed.bind(this))
			})
	}

	onLoginSuccess(){
		this.setState({
			email: '',
			password: '',
			loading: false,
			error: ''
		});
	}

	onLoginFailed(){
		this.setState({hasError: 'Authentication Failed.', loading:false})
	}

	renderButton(){
		if(this.state.loading){
			return <Spinner size="small"/>
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log in
			</Button>
		)
	}
	
	render() {
		return (
			<Card>
				<CardSection>
					<Input  
						placeholder="user@email.com"
						label="Email"
						value={this.state.email} 
						onChangeText={text => this.setState({email: text})} 
					/>
				</CardSection>

				<CardSection>
					<Input  
						secure={true}
						placeholder="password"
						label="Password"
						value={this.state.password} 
						onChangeText={text => this.setState({password: text})} 
					/>
				</CardSection>
				
				<Text style={styles.errorTextStyle}>
						{this.state.hasError}
				</Text>
				

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		)
	}

}

const styles = {
	errorTextStyle: {
		fontSize: 20, 
		color: 'red',
		alignSelf: 'center'
	}
}

export default LoginForm;
