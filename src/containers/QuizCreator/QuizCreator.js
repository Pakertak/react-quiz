import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from './../../components/UI/Button/Button'
import { createControl, validate, validateForm } from './../../form/FormFramework'
import Input from './../../components/UI/Input/Input'
import Auxillary from './../../hoc/Auxiliary/Auxiliary'
import Select from './../../components/UI/Select/Select'
import axios from '../../axios/axios-quiz'

function createFormControls() {
	return {
		question: createControl({
			label: 'Enter question',
			errorMessage: 'Question can not be empty'
		}, {required: true}),
		options: [createControl({
			label: `Option №1`,
			id: 0,
			errorMessage: 'Option can not be empty'
		}, {required: true}),createControl({
			label: `Option №2`,
			id: 1,
			errorMessage: 'Option can not be empty'
		}, {required: true})]
	}
}

function controlsProcess(control, value) {
	
	control.touched = true
	control.value = value
	control.valid = validate(control.value, control.validation)

	return control
}

export default class QuizCreator extends Component {
	state = { 
		quiz: [],
		isFormValid: false,
		rightAnswerId: 1,
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
				onChange={event => this.onChangeHandler(event.target.value, controlName, index)}
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


	onChangeHandler = (value, controlName, index = 0) => {
		const formControls = {
			...this.state.formControls
		}
		
		if(controlName === 'question') {
			formControls[controlName] = controlsProcess({...formControls[controlName]}, value)
		}	else {
			formControls[controlName][index] = controlsProcess({...formControls[controlName][index]}, value)
		}

		this.setState({
			formControls,
			isFormValid: validateForm(formControls)
		})
	}

	plusClickHandler = () => {
		const count = this.state.formControls.options.length
		if(count > 4) return null
		const formControls = {...this.state.formControls}
		formControls.options.push(createControl({
			label: `Option №${count + 1}`,
			id: count,
			errorMessage: 'Option can not be empty',
		}, {required: true}))

		this.setState({
			formControls
		})
	
	}

	minusClickHandler = () => {

		const count = this.state.formControls.options.length
		if(count < 3) return null
		const formControls = {...this.state.formControls}

		formControls.options.pop()

		this.setState({
			formControls
		})
	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value
		});
	}

	submitHandler = (event) => {
		event.preventDefault()
	}

	addQuestionHandler = () => {

		const quiz = this.state.quiz.concat()
		const index = quiz.length + 1
		const answers = []

		this.state.formControls.options.forEach(option => {
			answers.push({text: option.value, id: option.id})
		})

		const questionItem = {
			question: this.state.formControls.question.value,
			id: index,
			rightAnswerId: this.state.rightAnswerId,
			answers
		}

		quiz.push(questionItem)

		this.setState({
			quiz,
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		})

	}

	createQuizHandler = async () => {

		try {
			await axios.post('/quizes.json', this.state.quiz)
			
			this.setState({
				quiz: [],
				isFormValid: false,
				rightAnswerId: 1,
				formControls: createFormControls()
			})
		} catch (e) {
			console.log(e)
		}
	}

	render() {

		const options = []
		for(let i = 0; i < this.state.formControls.options.length; i++)
			options.push({text: i + 1, value: i + 1})
		
		const select = <Select 
			label="Change right answer"
			value={this.state.rightAnswerId}
			onChange={this.selectChangeHandler}
			options={options}
		/> 

		const plus = ['fa', 'fa-plus', classes.icons, classes.success]
		const minus = ['fa', 'fa-minus', classes.icons, classes.error]
		
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Create quiz</h1>

					<form onSubmit={this.submitHandler}>

						{ this.renderControls() }	

						{ select }
						<hr />

						<Button
							type={'primary'}
							onClick={this.addQuestionHandler}
							disabled={!this.state.isFormValid}
						>Add question</Button>

						<span className={plus.join(' ')} onClick={this.plusClickHandler}></span>
						<span className={minus.join(' ')} onClick={this.minusClickHandler}></span>
						
						<Button
							type={'success'}
							onClick={this.createQuizHandler}
							disabled={this.state.quiz.length === 0}
						>Create quiz</Button>
					</form>
				</div>
			</div>
		)
	}
}
