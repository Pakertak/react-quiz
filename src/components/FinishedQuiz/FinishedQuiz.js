import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = props => {

	const successCount = Object.keys(props.results).reduce((total, key) => {
		if(props.results[key] === 'success') {
			total++
		}
		return total
	}, 0)


	return (
		<div className={classes.FinishedQuiz}>
			<ul>

				{ props.quiz.map((quizItem, index) => {
					const questionClasses = [
						'fa',
						props.results[quizItem.id] === 'error' ? `fa-times ${classes.error}` : `fa-check ${classes.success}`
					]

					return (
						<li 
							key={index}
						>
							<strong>{index + 1}</strong>.&nbsp;
							{quizItem.question}
							<i className={questionClasses.join(' ')} />
						</li>
					)
				}) }
				{/* <li>
					<strong>1. </strong>
					How are u?
					<i className={`fa fa-times ${classes.error}`}></i>
				</li>
				<li>
					<strong>1. </strong>
					How are u?
					<i className={`fa fa-check ${classes.success}`}></i>
				</li> */}
			</ul>

			<p>Right {successCount} of {props.quiz.length}</p>

		  <div>
				<Button 
					onClick={props.onRetry}
					type="primary"
				>
					Try again
				</Button>
				<Link to={'/'}>
					<Button 
						type="success"
					>
						Quiz list
					</Button>
				</Link>
			</div>
		</div>
	)
}
export default FinishedQuiz