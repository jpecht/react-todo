import React, { Component } from 'react';
import styles from './Task.css';

export class Task extends Component {
	constructor(props) {
		super(props);
	}

	clickedTask() {
		console.log('clicked');
	}

	clickedCheckbox(e) {
		e.stopPropagation();
		this.clickedTask();
	}

	render() {
		return (
			<div
				className={styles.task}
				onClick={this.clickedTask}
			>
				<input
					type="checkbox"
					onClick={(e) => this.clickedCheckbox(e)}
				/>
				<div className={styles.taskDescription}>
					{this.props.description}
				</div>
			</div>
		);
	}
}