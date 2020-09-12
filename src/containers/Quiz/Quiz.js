import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from './../../components/UI/Loader/Loader'


export default class Quiz extends Component {

	constructor() {
		super()

		this.state = {
			loading: true,
			results: {}, //{[id]: success error}
			isFinished: false,
			answerState: null, // {[id]: 'success', 'error'}
			quiz: [],
			activeQuestion: 0
		}
	}

	async componentDidMount() {
		try {
			const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
			const quiz = shuffle(response.data)
			this.setState({
				quiz,
				loading: false
			})

		} catch(e) {
			console.log(e);
		} 
		
	}

	onAnswerClickHandler(answerID) {
		if(this.state.answerState) { 
			const key = Object.keys(this.state.answerState)[0]
			if(this.state.answerState[key] === 'success')
				return
		}

		const question = this.state.quiz[this.state.activeQuestion]
		const results = this.state.results
		if((question.rightAnswerId - 1) === answerID) {
			if(!results[question.id])
				results[question.id] = 'success'

			this.setState({
				results,
				answerState: {[answerID]: 'success'}
			})

			const timeout = window.setTimeout(() => {

				if(this.isQuizFinished()) {
					this.setState({isFinished: true})
				} else {
					this.setState({
						answerState: null,
						activeQuestion: this.state.activeQuestion + 1
					})
				}

				window.clearTimeout(timeout)
			}, 1000)

		} else {
			results[question.id] = 'error'
			this.setState({
				results,
				answerState: {[answerID]: 'error'}
			})
 		}
	}

	retryHandler() {
		this.setState({
			activeQuestion: 0,
			answerState: null,
			isFinished: false,
			results: {}
		})
	}

	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Answer the questions</h1>
					{
						this.state.loading
							? <Loader />
							: 
								(this.state.isFinished
								
									? <FinishedQuiz 
											results={this.state.results}
											quiz={this.state.quiz}
											onRetry={this.retryHandler.bind(this)}
										/>
		
									:	<ActiveQuiz 
											answers={this.state.quiz[this.state.activeQuestion].answers}
											question={this.state.quiz[this.state.activeQuestion].question}
											onAnswerClick={this.onAnswerClickHandler.bind(this)}
											quizLength={this.state.quiz.length}
											questionNumber={this.state.activeQuestion + 1}
											state={this.state.answerState}
										/>
								)
					}
					
				</div>
			</div>
		)
	}
}

function shuffle(array) {
	var i = array.length,
			j = 0,
			temp;

	while (i--) {

			j = Math.floor(Math.random() * (i+1));

			// swap randomly chosen element with current element
			temp = array[i];
			array[i] = array[j];
			array[j] = temp;

	}

	return array;
}