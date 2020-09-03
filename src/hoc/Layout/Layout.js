import React, {Component} from 'react'
import styles from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'

export default class Layout extends Component {
	

	constructor() {
		super()

		this.state = {
			menu: false
		}
	}

	toggleMenuHandler() {
		this.setState({
			menu: !this.state.menu
		})
	}
	
	render() {

		return (
			<div className={styles.Layout}>


				<MenuToggle
					isOpen={this.state.menu}
					onToggle={this.toggleMenuHandler.bind(this)} 
				/>

				<main>
					{this.props.children}
				</main>

			</div>
		)
	}
}