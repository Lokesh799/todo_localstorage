import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setTodo, addTodo, updateTodo } from '../action/index';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';
import { useHistory } from 'react-router';
import todos from '../reducer/todos';

// const getLocalItem=()=>{
// 	let list=localStorage.getItem('list');
// 	console.log(list);
// 	if(list){
// 		return JSON.parse(localStorage.getItem('list'));
// 	}else{
// 		return[];
// 	}
// }

function TodoForm(props) {
	const history = useHistory();
	const { todo, updatingTodoIndex } = props.todos;
	// const [item , setTodo]=useState(getLocalItem());

	const handleChangeInput = (event) => {
		const { name, value } = event.target;
		const updatedTodo = { ...todo, [name]: value };
		props.setTodo(updatedTodo);

	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!todo.title) return;
		if (!updatingTodoIndex && updatingTodoIndex !== 0) {
			props.addTodo({ ...todo, id: new Date().getTime() });
			const list = localStorage.getItem('getlist') || '[]'
			const data = JSON.parse(list)

			data.push({
				todo: todo,
				id: new Date().getTime().toString()
			})
			localStorage.setItem('getlist', JSON.stringify(data))
		} else {
			props.updateTodo({ ...todo });
		}
	}

	const handleRedirect = () => {
		history.push('/todolist');
	};


	const handleActive = () => {
		history.push('/showActive')
	};

	return (
		<div>
			<form className="form-group" onSubmit={handleSubmit}>
				<div>
					<label>
						Title:
						<input className='form-control' name="title" value={todo.title} onChange={handleChangeInput} />
					</label>
				</div>
				<div>
					<label>
						Description:
						<textarea className='form-control' name="description" value={todo.description} onChange={handleChangeInput} />
					</label>
				</div>
				<div>
					<button className="btn btn-primary" type="submit">{updatingTodoIndex ? 'Update' : 'Submit'}</button>
				</div>
			</form>
			<Button className="btn btn-dark" onClick={handleRedirect} >showAllTodo</Button>
			<Button className="btn btn-dark" onClick={handleActive} >ShowActive</Button>
		</div>
	);
}

const mapState = (state) => ({
	todos: state.todos,
});

const mapDispatch = {
	setTodo,
	addTodo,
	updateTodo,
};

export default connect(mapState, mapDispatch)(TodoForm);