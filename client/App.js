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
		this.updateTaskList = this.updateTaskList.bind(this);
	}

	componentWillMount() {
		this.updateTaskList();
	}

	updateTaskList() {
		fetch('http://localhost:8004/api/todos')
			.then(r => r.json())
			.then((data) => {
				console.log(data);

				// get tasks and set in state
				this.setState({
					completeTasks: data.filter(d => d.done),
					incompleteTasks: data.filter(d => !d.done),
				});
			});
	}

	onIncompleteTaskSelect(id) {
		// find task; set to done
		const incompleteTasks = this.state.incompleteTasks.slice(0);
		const task = incompleteTasks.find(t => t.id === id);
		task.done = true;
		this.updateTask(id, task);
	}

	onCompleteTaskSelect(id) {
		// find task; set to not done
		const completeTasks = this.state.completeTasks.slice(0);
		const task = completeTasks.find(t => t.id === id);
		task.done = false;
		this.updateTask(id, task);
	}

	updateTaskDescription(id, desc) {
		const tasks = this.state.incompleteTasks.concat(this.state.completeTasks);
		const task = tasks.find(t => t.id === id);
		task.description = desc;
		this.updateTask(id, task);
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
			.then(() => this.updateTaskList());
	}

	updateTask(id, task) {
		fetch(`http://localhost:8004/api/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		})
			.then(r => r.json())
			.then(() => this.updateTaskList());
	}

	deleteTask(id) {
		fetch(`http://localhost:8004/api/todos/${id}`, {
			method: 'DELETE',
		})
			.then(r => r.json())
			.then(() => this.updateTaskList());
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
							{this.state.incompleteTasks.length ?
								<TaskList
									tasks={this.state.incompleteTasks}
									onTaskSelect={(id) => this.onIncompleteTaskSelect(id)}
									updateTaskDescription={(id, desc) => this.updateTaskDescription(id, desc)}
									onTaskTrash={(id) => this.deleteTask(id)}
								/> :
								<div className={styles.noTasksText}>
									All tasks complete! :)
								</div>
							}
						</div>
						<div className={styles.rightColumn}>
							<h3>Complete Tasks</h3>
							<div className={styles.taskNumber}>
								<b>{this.state.completeTasks.length}</b> tasks
							</div>
							{this.state.completeTasks.length ?
								<TaskList
									tasks={this.state.completeTasks}
									onTaskSelect={(id) => this.onCompleteTaskSelect(id)}
									updateTaskDescription={(id, desc) => this.updateTaskDescription(id, desc)}
									onTaskTrash={(id) => this.deleteTask(id)}
								/> :
								<div className={styles.noTasksText}>

								</div>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
