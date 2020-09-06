import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import quiz from './QuizList/QuizList'



export default class Quiz extends Component {

	constructor() {
		super()

		this.state = {
			results: {}, //{[id]: success error}
			isFinished: false,
			answerState: null, // {[id]: 'success', 'error'}
			quiz: shuffle(quiz),
			activeQuestion: 0
		}
	}

	componentDidMount() {
		console.log('Quiz id = ', this.props.match.params.id);
	}

	onAnswerClickHandler(answerID) {
		
		if(this.state.answerState) { 
			const key = Object.keys(this.state.answerState)[0]
			if(this.state.answerState[key] === 'success')
				return
		}


		const question = this.state.quiz[this.state.activeQuestion]
		const results = this.state.results

		if(question.rightAnswerID === answerID) {
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
						this.state.isFinished
						
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
									answerNumber={this.state.activeQuestion + 1}
									state={this.state.answerState}
								/>
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