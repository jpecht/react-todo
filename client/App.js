import React from 'react';
import styles from './App.css';
import { Button } from 'react-bootstrap';

const renderTodos = (todos) => {
	const todoItems = [];

	todos.forEach(todo => {
		todoItems.push([
			'<li>',
				`<label for="${ todo.id }">`,
					`<input ${ todo.done ? 'checked' : '' } id="${ todo.id }" type="checkbox" />`,
					todo.description,
				'</label>',
			'</li>',
		].join(''));
	});

	document.querySelector('#root').innerHTML = `<ul>${ todoItems.join('') }</ul>`;
};


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {test: 'foo'};
	}

	componentWillMount() {
		this.getTodos();
	}

	createTask() {

	}

	deleteTask() {

	}

	editTask() {

	}

	getTodos() {
		fetch('http://localhost:8004/server/api/todos')
			.then(r => r.json())
			.then(data => console.log(data));
	}

	render() {
		return (
			<div className={styles.background}>
				<div className={styles.content}>
					<h3>To-Do Application</h3>
					<div className={styles.buttonContainer}>
						<div
							className={styles.primaryButton}
							onClick={this.createTask}
						>
							New Task
						</div>
						<div
							className={styles.button}
							onClick={this.editTask}
						>
							Edit Task
						</div>
						<div
							className={styles.button}
							onClick={this.deleteTask}
						>
							Delete Task
						</div>
					</div>
					<div className={styles.taskContainer}>
						<ul className={styles.taskList}>

						</ul>
					</div>
				</div>
			</div>
		);
	}
}
