import React from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = props => { 

	const menuClasses = [
		classes.MenuToggle,
		'fa'
	]

	if(props.isOpen){
		
		menuClasses.push(classes.open)
		menuClasses.push('fa-times')

	} else {
		menuClasses.push('fa-bars')
	}

	return (
		<i
			className={menuClasses.join(' ')}
			onClick={props.onToggle}
		/>
	)
}

export default MenuToggle