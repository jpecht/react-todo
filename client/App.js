import React from 'react';
import styles from './App.css';
import { Instructions } from './components/Instructions.js';
import { NewTaskSection } from './components/NewTaskSection.js';
import { TaskList } from './components/TaskList.js';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			completeTasks: [],
			incompleteTasks: [],
		};
		this.getAllTasks = this.getAllTasks.bind(this);
	}

	componentWillMount() {
		this.getAllTasks();
	}

	getAllTasks() {
		fetch('http://localhost:8004/api/todos')
			.then(r => r.json())
			.then((data) => {
				console.log(data);
				this.setState({
					completeTasks: data.filter(d => d.done),
					incompleteTasks: data.filter(d => !d.done),
				});
			});
	}

	createTask(desc) {
		fetch('http://localhost:8004/api/todos', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ description: desc }),
		})
			.then(r => r.json())
			.then(() => this.getAllTasks());
	}

	deleteTask(id) {
		fetch(`http://localhost:8004/api/todos/${id}`, {
			method: 'DELETE',
		})
			.then(r => r.json())
			.then(() => this.getAllTasks());
	}

	editTask(id, description) {
		fetch('http://localhost:8004/api/todos', {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ description }),
		})
			.then(r => r.json())
			.then(() => this.getAllTasks());
	}

	render() {
		return (
			<div className={styles.background}>
				<div className={styles.container}>
					<h2>To-Do Application</h2>
					<Instructions />
					<div className={styles.content}>
						<NewTaskSection
							createTask={(desc) => this.createTask(desc)}
						/>
						<div className={styles.leftColumn}>
							<h3>Incomplete Tasks</h3>
							<div className={styles.taskNumber}>
								<b>{this.state.incompleteTasks.length}</b> tasks
							</div>
							<div className={styles.buttonContainer}>
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
							<TaskList
								tasks={this.state.incompleteTasks}
							/>
						</div>
						<div className={styles.rightColumn}>
							<h3>Complete Tasks</h3>
							<div className={styles.taskNumber}>
								<b>{this.state.completeTasks.length}</b> tasks
							</div>
							<div className={styles.buttonContainer}>
								<div
									className={styles.button}
									onClick={this.deleteTask}
								>
									Delete Task
								</div>
							</div>
							<TaskList
								tasks={this.state.completeTasks}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
