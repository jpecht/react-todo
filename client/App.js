import React from 'react';
import styles from './App.css';
import { Instructions } from './components/Instructions.js';
import { NewTaskSection } from './components/NewTaskSection.js';
import { Task } from './components/Task.js';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tasks: [],
		};
	}

	componentWillMount() {
		this.getTodos();
	}

	getTodos() {
		fetch('http://localhost:8004/server/api/todos')
			.then(r => r.json())
			.then((data) => {
				console.log(data);
				this.setState({ tasks: data });
			});
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
						<NewTaskSection />
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
						<div className={styles.taskContainer}>
							<div className={styles.taskList}>
								{this.state.tasks.map((task, i) =>
									<Task
										key={i}
										description={task.description}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
