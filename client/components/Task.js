import React, { Component } from 'react';
import styles from './Task.css';

export class Task extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inEditMode: false,
			tempDescription: props.description
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ tempDescription: nextProps.description });
	}

	enableEditMode(e) {
		e.stopPropagation();
		this.setState({ inEditMode: true });
	}

	updateTempDescription(e) {
		this.setState({ tempDescription: e.target.value });
	}

	saveDescription(e) {
		e.stopPropagation();

		// call listener to save description
		this.props.updateDescription(this.state.tempDescription);

		// disable edit mode
		this.setState({ inEditMode: false });
	}

	render() {
		return (
			<div
				className={
					this.state.inEditMode ?
					[styles.task, styles.editable].join(' ') :
					styles.task
				}
			>
				<input
					type="checkbox"
					checked={this.props.selected}
					onChange={(e) => {
						e.stopPropagation();
						this.props.onSelect();
					}}
				/>
				{this.state.inEditMode ?
					<input
						className={styles.taskDescriptionInput}
						type='text'
						value={this.state.tempDescription}
						onChange={(e) => this.updateTempDescription(e)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								this.saveDescription(e);
							}
						}}
					/> :
					<div className={styles.taskDescription}>
						{this.props.description}
					</div>
				}
				{this.state.inEditMode ?
					<img
						className={styles.saveIcon}
						src={require('../images/save.png')}
						alt="Save task description"
						onClick={(e) => this.saveDescription(e)}
					/> :
					<img
						className={styles.editIcon}
						src={require('../images/edit.png')}
						alt="Edit task"
						onClick={(e) => this.enableEditMode(e)}
					/>
				}
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