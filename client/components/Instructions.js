import React, { Component } from 'react';
import styles from './Instructions.css';

export class Instructions extends Component {
	render() {
		return (
			<div className={styles.instructions}>
				<ul>
					<li><b>Create</b> a task by typing in the input below and clicking the "Create Task" button.</li>
					<li><b>Edit</b> a task by clicking the "pencil" icon, editing the text, and clicking the "Save" button.</li>
					<li><b>Complete</b> a task by clicking the checkbox to the left of the task.</li>
					<li><b>Delete</b> a task by clicking the "trash" icon to the right side of the task.</li>
				</ul>
			</div>
		);
	}
}
