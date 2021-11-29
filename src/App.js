import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import showActive from './component/ShowActive';

function App() {
  return (
    <div className="App">
      {/* <TodoForm/> */}
      {/* <TodoList/> */}
      <Router>
        <Route  exact path="/" component={TodoForm} />
        <Route path="/todolist" component={TodoList} />
        <Route path="/showActive" component={showActive} />
      </Router>

    </div>
  );
}

export default App;
