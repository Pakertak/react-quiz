import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from './../../components/UI/Button/Button';
import Input from './../../components/UI/Input/Input';


export default class Auth extends Component {

	loginHandler() {

	}

	registerHandler() {

	}

	submitHandler(event) {
		event.preventDefault()
	}

	render() {
		return (
			<div className={classes.Auth}>
				<div>
					<h1>Authorization</h1>

					<form onSubmit={this.submitHandler.bind(this)} className={classes.AuthForm}>
						<Input 
							label="Email"

						/>
						<Input 
							label="Password"
							errorMessage="text"
						/>

						<Button
							type="success"
							onClick={this.loginHandler.bind(this)}
						>Log in</Button>
						<Button
							type="primary"
							onClick={this.registerHandler.bind(this)}
						>Registration</Button>
					</form>
				</div>
			</div>
		)
	}
}



