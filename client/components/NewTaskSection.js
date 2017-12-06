import React, { Component } from 'react';
import styles from './NewTaskSection.css';

export class NewTaskSection extends Component {
	constructor() {
		super();
	}

	createTask() {

	}

	render() {
		return (
			<div className={styles.newTaskContainer}>
				<input
					type="text"
					placeholder="enter task here..."
				/>
				<div
					className={styles.primaryButton}
					onClick={this.createTask}
				>
					Create Task
				</div>
			</div>
		);
	}
}
