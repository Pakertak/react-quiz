import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

export default class Quiz extends Component {

	constructor() {
		super()

		this.state = {
			quiz: [
				{
					answers: [
						{text: 'Question 1'},
						{text: 'Question 2'},
						{text: 'Question 3'},
						{text: 'Question 4'},
						{text: 'Question 5'}
					]
				}
			]
		}
	}

	

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Answer the questions</h1>
					<ActiveQuiz 
						answers={this.state.quiz[0].answers}
					/>
				</div>
			</div>
		)
	}
}
