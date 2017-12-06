import React from 'react';
import styles from './App.css';
import { Instructions } from './components/Instructions.js';
import { NewTaskSection } from './components/NewTaskSection.js';
import { TaskList } from './components/TaskList.js';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tasks: [],
		};
		this.getTodos = this.getTodos.bind(this);
	}

	componentWillMount() {
		this.getTodos();
	}

	getTodos() {
		fetch('http://localhost:8004/api/todos')
			.then(r => r.json())
			.then((data) => {
				console.log(data);
				this.setState({ tasks: data });
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
			.then(() => this.getTodos());
	}

	deleteTask() {

	}

	editTask() {

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
								<b>{this.state.tasks.length}</b> tasks
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
								tasks={this.state.tasks}
							/>
						</div>
						<div className={styles.rightColumn}>
							<h3>Complete Tasks</h3>
							<div className={styles.taskNumber}>
								<b>{this.state.tasks.length}</b> tasks
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
								tasks={this.state.tasks}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
