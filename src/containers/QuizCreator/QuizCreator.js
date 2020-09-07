import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from './../../components/UI/Button/Button'
import {createControl} from './../../form/FormFramework'
import Input from './../../components/UI/Input/Input'
import Auxillary from './../../hoc/Auxiliary/Auxiliary'

function createFormControls() {
	return {
		question: createControl({
			label: 'Enter question',
			errorMessage: 'Question can not be empty'
		}, {required: true}),
		options: [createControl({
			label: `Option №1`,
			errorMessage: 'Option can not be empty'
		}, {required: true}),createControl({
			label: `Option №2`,
			errorMessage: 'Option can not be empty'
		}, {required: true})]
	}
}

export default class QuizCreator extends Component {
	state = { 
		quiz: [],
		classes: [],
		formControls: createFormControls()
	}

	renderInput(control, controlName, index) {
		return (
			<Input 
				key={controlName + index}
				label={control.label}
				value={control.value}
				valid={control.valid}
				classes={control.classes}
				shouldValidate={!!control.validate}
				touched={control.touched}
				errorMessage={control.errorMessage}
				onChange={event => this.changeHandler(event.target.value, controlName)}
			/>
		)
	}

	renderControls() {
		return Object.keys(this.state.formControls).map((controlName, index) => {

			if(controlName === 'question'){
				const control = this.state.formControls[controlName]
				return (
					<Auxillary key={controlName + index}>
						{this.renderInput(control, controlName, index)}
						<hr />
					</Auxillary>
				)
			} else {
					return this.state.formControls[controlName].map((control, index) => {
						return this.renderInput(control, controlName, index)
					})
				}
		})
	}


	onChangeHandler = (value, control) => {

	}

	plusClickHandler = () => {
		const count = this.state.formControls.options.length
		if(count > 4) return null
		const formControls = {...this.state.formControls}
		formControls.options.push(createControl({
			label: `Option №${count + 1}`,
			errorMessage: 'Option can not be empty',
		}, {required: true}))

		this.setState({
			formControls
		})
	
	}

	minusClickHandler = () => {
		const count = this.state.formControls.options.length
		console.log(count);
		if(count < 3) return null
		const formControls = {...this.state.formControls}

		formControls.options.pop()

		this.setState({
			formControls
		})
	}

	submitHandler = (event) => {
		event.preventDefault()
	}

	addQuestionHandler = () => {

	}

	createQuizHandler = () => {

	}

	render() {
		const plus = ['fa', 'fa-plus', classes.icons, classes.success]
		const minus = ['fa', 'fa-minus', classes.icons, classes.error]
		const cls =this.state.classes.join(' ')
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Create quiz</h1>

					<form onSubmit={this.submitHandler} className={cls}>

						{ this.renderControls() }	

						<select></select>
						<hr />
						
						<Button
							type={'primary'}
							onClick={this.addQuestionHandler}
						>Add question</Button>
						<Button
							type={'success'}
							onClick={this.createQuizHandler}
						>Create quiz</Button>
						<span className={plus.join(' ')} onClick={this.plusClickHandler}></span>
						<span className={minus.join(' ')} onClick={this.minusClickHandler}></span>
					</form>
				</div>
			</div>
		)
	}
}
