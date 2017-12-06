import React, { Component } from 'react';
import styles from './Instructions.css';

export class Instructions extends Component {
	render() {
		return (
			<div className={styles.instructions}>
				<ul>
					<li><b>Create</b> a task by typing in the input below and clicking the "Create Task" button.</li>
					<li><b>Edit</b> a task by double-clicking on a task, editing the text, and clicking the "Save" button.</li>
					<li><b>Complete</b> a task by clicking the checkboxes to the left of each task and clicking the "Complete" button.</li>
					<li><b>Delete</b> a task by clickin the checkboxes to the left of each task and clicking the "Delete" button.</li>
				</ul>
			</div>
		);
	}
}
