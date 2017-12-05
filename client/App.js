import React from 'react';
import styles from './App.css';

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

const getTodos = () => {
	return new Promise((resolve) => {
		fetch('http://localhost:8004/api/todos')
			.then(r => r.json())
			.then(data => resolve(data));
	});
};


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {test: 'foo'};
	}

	componentWillMount() {
		this.getTodos();
	}

	getTodos() {
		console.log('fetching');
		fetch('http://localhost:8004/server/api/todos')
			.then((r) => {
				console.log(r);
				return r.json();
			})
			.then(data => console.log(data));
	}

	render() {
		return (
			<div className={styles.app}>
				bar
			</div>
		);
	}
}
