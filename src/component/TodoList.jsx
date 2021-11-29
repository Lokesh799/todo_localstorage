import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { completeTodo, setUpdatingTodoIndex, deleteTodo } from '../action/index';

export default function TodoList() {
  let todo;
	if(localStorage.getItem('getlist')==null){
		todo=[]
	}else{
		todo=JSON.parse(localStorage.getItem("getlist"))
	}

	const history = useHistory();
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);

	const handleEdit = (todoId) => {
		const todoIndex = todo.records.findIndex((todo) => todo.id === todoId);
		dispatch(setUpdatingTodoIndex(todoIndex));
		history.push("/")
		console.log(todoIndex)
	}

	const handleDelete = (todoId) => {
		dispatch(deleteTodo(todoId));
	}

	const handleComplete = (event, todoId) => {
		dispatch(completeTodo({ todoId, completed: event.target.checked }));
	}

	return (
		<div>
			<div>
				<h1>Show All Todo</h1>
			</div>
			<ul class="list-group">
				{todo.map((todo) => (
					<li key={todo.todo.id}>
						<span  className="list-group-item list-group-item-warning">
							{todo.todo.title}: {todo.todo.description}
						</span>
						<span>
							<button className="btn btn-warning" onClick={() => handleDelete(todo.todo.id)}>Delete</button><br/>
							<button className="btn btn-info" onClick={() => handleEdit(todo.todo.id)}>Edit</button><br/>
							<label>
								complete
								<input
									type="checkbox"
									checked={todo.completed}
									onClick={(event) => handleComplete(event, todo.id)}
								/>
							</label>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}