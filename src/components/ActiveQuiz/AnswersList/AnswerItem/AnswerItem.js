import React from 'react'
import classes from './AnswerItem.module.css'


const AnswerItem = props => {

	const itemClasses = [classes.AnswerItem]

	if(props.state) {
		itemClasses.push(classes[props.state])
	}

	return (
		<li 
			className={itemClasses.join(' ')}
			onClick = {() => props.onAnswerClick(props.answer.id)}
		>
			{ props.answer.text }
			
		</li>
	)
}

export default AnswerItem


