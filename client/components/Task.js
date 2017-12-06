import React, { Component } from 'react';
import styles from './Task.css';

export class Task extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div
				className={styles.task}
			>
				<input
					type="checkbox"
					checked={this.props.selected}
					onChange={(e) => {
						e.stopPropagation();
						this.props.onSelect();
					}}
				/>
				<div className={styles.taskDescription}>
					{this.props.description}
				</div>
				<img
					className={styles.editIcon}
					src={require('../images/edit.png')}
					alt="Edit task"
					onClick={(e) => {
						e.stopPropagation();
						this.props.onEditClick();
					}}
				/>
				<img
					className={styles.trashIcon}
					src={require('../images/trash.png')}
					alt="Delete task"
					onClick={(e) => {
						e.stopPropagation();
						this.props.onTrashClick();
					}}
				/>
			</div>
		);
	}
}