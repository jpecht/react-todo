import React, { Component } from 'react';
import styles from './NewTaskSection.css';

export class NewTaskSection extends Component {
	constructor() {
		super();
		this.state = {
			value: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	createTask() {
		this.props.createTask(this.state.value);
	}

	render() {
		return (
			<div className={styles.newTaskContainer}>
				<input
					type="text"
					value={this.state.value}
					placeholder="enter task here..."
					onChange={this.handleChange}
				/>
				<div
					className={styles.primaryButton}
					onClick={() => this.createTask()}
				>
					Create Task
				</div>
			</div>
		);
	}
}
