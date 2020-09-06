import React, { Component } from 'react'
import classes from './Drawer.module.css'
import BackDrop from './../../UI/BackDrop/BackDrop';
import { NavLink } from 'react-router-dom'

const links = [
	{ 
		to: '/',
		label: 'Quiz list',
		exact: true
	},
	{ 
		to: '/auth',
		label: 'Authorization',
		exact: false
	},
	{ 
		to: '/quiz-creator',
		label: 'Create quiz',
		exact: false
	}

]


class Drawer extends Component {

	renderLinks() {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink 
						to={link.to}
						exact={link.exact}
						activeClassName={classes.active}
						onClick={this.props.onClose}
					>
						{link.label}
					</NavLink>
				</li>	
			)
		})
	}

	render() {

		const menuClasses = [classes.Drawer]

		if(!this.props.isOpen) {
			menuClasses.push(classes.close)
		}


		return (
			<React.Fragment>
				<nav className={menuClasses.join(' ')}>
					<ul>
					{this.renderLinks()}
					</ul>
				</nav>
				{this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
				
			</React.Fragment>
		)
	}
}


export default Drawer