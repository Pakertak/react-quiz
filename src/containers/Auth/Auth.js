import React, { Component } from 'react'
import is from 'is_js'
import classes from './Auth.module.css'
import Button from './../../components/UI/Button/Button'
import Input from './../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { auth } from './../../store/actions/auth'

class Auth extends Component {

	constructor() {
		super()

		this.state = {
			isFormValid: false,
			formControls: {
				email: {
					value: '',
					type: 'email',
					label: 'Email',
					errorMessage: 'Input correct Email address',
					valid: false,
					touched: false,
					validation: {
						required: true,
						email: true
					}
				},
				password: {
					value: '',
					type: 'password',
					label: 'Password',
					errorMessage: 'Input correct Password',
					valid: false,
					touched: false,
					validation: {
						required: true,
						minLength: 6
					}
				}
			}
		}
	}

	renderInputs() {
		return Object.keys(this.state.formControls)
			.map((controlName, index) => {

				const control = this.state.formControls[controlName]
				return (
					<Input
						key={controlName + index}
						type={control.type}
						value={control.value}
						valid={control.valid}
						touched={control.touched}
						label={control.label}
						shouldValidate={!!control.validation}
						errorMessage={control.errorMessage}
						onChange={event => this.onChangeHandler(event, controlName)}
					/>
				)
			})
	}

	validateControl(value, validation) {
		if(!validation) return true

		let isValid = true

		if(isValid && validation.required) {
			isValid = value.trim() !== ''
		}

		if(isValid && validation.email) {
			isValid = is.email(value)
		}

		if(isValid && validation.minLength) {
			isValid = value.trim().length >= validation.minLength
		}

		return isValid
	}

	loginHandler() {
		this.props.auth(
			this.state.formControls.email.value, 
			this.state.formControls.password.value,
			true 
		)
	}

	registerHandler() {
		this.props.auth(
			this.state.formControls.email.value, 
			this.state.formControls.password.value,
			false 
		)
		
	}

	submitHandler(event) {
		event.preventDefault()
	}

	onChangeHandler = (event, controlName) => {

		const formControls = {
			...this.state.formControls
		}

		const control = {
			...formControls[controlName]
		}

		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)

		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = isFormValid && formControls[name].valid 
		})

		this.setState({
			formControls, isFormValid
		})
	}

	render() {
		return (
			<div className={classes.Auth}>
				<div>
					<h1>Authorization</h1>

					<form onSubmit={this.submitHandler.bind(this)} className={classes.AuthForm}>
						
						{this.renderInputs()}

						<Button
							type="success"
							onClick={this.loginHandler.bind(this)}
							disabled={!this.state.isFormValid}
						>Log in</Button>
						<Button
							type="primary"
							onClick={this.registerHandler.bind(this)}
							disabled={!this.state.isFormValid}
						>Registration</Button>
					</form>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
	}
}

export default connect(null, mapDispatchToProps)(Auth)


