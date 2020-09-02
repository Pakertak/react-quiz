import React from 'react'
import classes from './FinishedQuiz.module.css'

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
				<button onClick={props.onRetry}>Try again</button>
			</div>
		</div>
	)
}
export default FinishedQuiz