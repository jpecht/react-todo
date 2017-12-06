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
						selected={task.done}
						onSelect={() => this.props.onTaskSelect(task.id)}
						updateDescription={(desc) => this.props.updateTaskDescription(task.id, desc)}
						onTrashClick={() => this.props.onTaskTrash(task.id)}
						description={task.description}
					/>
				)}
			</div>
		);
	}
}