import React, { Component } from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';

import PropTypes from 'prop-types';

import { Header, Button, Spinner } from './components/common'
import LoginForm from './components/LoginForm'

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			loggedIn: null,

		}
	}
	
	componentWillMount() {
		firebase.initializeApp({
		    apiKey: "XX",
		    authDomain: "XX",
		    databaseURL: "XX",
		    projectId: "XX",
		    storageBucket: "XX",
		    messagingSenderId: "XX"
		  })	


		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				this.setState({ loggedIn: true})
			}else {
				this.setState({ loggedIn: false})
			}
		})
	}

	renderContent(){
		switch(this.state.loggedIn){
			case true: 
				return <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
			case false:
				return <LoginForm />
			default:
				return <Spinner size="large"/>
		}

	}

	
	render() {
		return(
			<View style={{height: 100}}>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		)
	}	

}

export default App;
