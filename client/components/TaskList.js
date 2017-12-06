import React, { Component } from 'react';
import { Task } from './Task.js';
import styles from './TaskList.css';

export class TaskList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.taskList}>
				{this.props.tasks.map((task) =>
					<Task
						key={task.id}
						description={task.description}
					/>
				)}
			</div>
		);
	}
}