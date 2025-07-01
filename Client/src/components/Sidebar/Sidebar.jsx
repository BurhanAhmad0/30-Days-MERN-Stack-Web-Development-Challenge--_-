import { useState, useContext, useRef } from 'react';
import { UserContext } from '../../UserContext/UserContext';
import styles from './Sidebar.module.css';
import toast, { Toaster } from 'react-hot-toast';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Sidebar = () => {

  const filterRef = useRef()

  const { setFilter, TodosState, TodoDispatch } = useContext(UserContext);
  const [TodoInput, setTodoInput] = useState('')
  const [updateTodo, setupdateTodo] = useState('')
  const [updateTodoIndex, setUpdateTodoIndex] = useState(null);

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  }

  const handleUpdateInputChange = (e) => {
    setupdateTodo(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const localTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const newTodo = {
      id: Date.now(),
      text: TodoInput,
      completed: false
    };

    if (TodoInput === '') {
      console.error('Write Something')
      return;
    }

    localTodos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(localTodos));
    TodoDispatch({ type: 'ADD_TODO', payload: newTodo })

    setTodoInput(''); // Clear the input field after submission
    toast.success('Todo added successfully!', {
      removeDelay: 2500,
    })
  }

  const handleToggleTodo = (index) => {
    const updatedTodos = TodosState.todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );

    // setTodos(updatedTodos);
    TodoDispatch({ type: 'TOGGLE_TODO', payload: { index: index } })
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleTodoDelete = (index) => {
    const updatedTodos = TodosState.todos.filter((_, i) => i !== index);

    TodoDispatch({ type: 'DELETE_TODO', payload: { index: index } })
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    toast.success('Todo deleted successfully!', {
      removeDelay: 2500,
    })
  };

  const handleTodoUpdate = (index) => {
    if (TodosState.todos[index].completed === true) {
      toast.error('Todo is already marked completed!')
      return;
    }
    const toBeUpdatedTodo = TodosState.todos[index];
    setupdateTodo(toBeUpdatedTodo.text)
    setUpdateTodoIndex(index)
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (updateTodo === '') {
      console.error('Write Something');
      return;
    }

    const localTodos = JSON.parse(localStorage.getItem('todos')) || [];

    // Update the specific todo
    localTodos[updateTodoIndex] = {
      ...localTodos[updateTodoIndex],
      text: updateTodo,
    };

    TodoDispatch({ type: 'UPDATE_TODO', payload: { index: updateTodoIndex, text: updateTodo } })
    localStorage.setItem('todos', JSON.stringify(localTodos));

    // Reset update state
    setupdateTodo('');
    setUpdateTodoIndex(null);
    toast.success('Todo updated successfully!', {
      removeDelay: 2500,
    })
  };


  return (
    <aside className={styles.sidebar}>

      <Toaster position='top-right' />

      <div className={styles.sidebarHead}>
        <h2>Todos</h2>
        <div className={styles.filter}>
          <p>Filter:</p>
          <select onChange={() => { setFilter(filterRef.current.value) }} ref={filterRef} name="filter" id={styles.filterSelect}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className={styles.addTodo}>
        <input onChange={handleInputChange} type="text" value={TodoInput} placeholder="Add a new todo" className={styles.addTodoInput} />
        <button onClick={(e) => handleSubmit(e)} className={styles.addTodoButton}>Add</button>
      </div>

      <div className={styles.todosList}>
        <ErrorBoundary>
          {(TodosState.todos.length >= 1) ?
            TodosState.todos.map((todo, index) => (
              <div key={index} className={styles.todoItem}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(index)}
                  className={styles.checkbox}
                />
                <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
                  {todo.text}
                </span>
                <button onClick={() => { handleTodoUpdate(index) }} className={styles.iconButton} title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 8 13.27 8.73 12.53 9.47 13.53 10.47 14.53 11.47 15.27 10.73 16 10 15 9 14 8z" />
                    <path d="M8 14 8 16 10 16 13.82 12.18 11.82 10.18 8 14z" />
                    <path d="m19,3H5c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2V5c0-1.1-.9-2-2-2ZM5,19V5h14v14s-14,0-14,0Z" />
                  </svg>
                </button>
                <button onClick={() => { handleTodoDelete(index) }} className={styles.iconButton} title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z" />
                  </svg>
                </button>
              </div>
            )) :
            <div className="info">
              <p>No Todos Available</p>
            </div>
          }
        </ErrorBoundary>
      </div>

      <div className={styles.updateTodo}>
        <input onChange={handleUpdateInputChange} type="text" value={updateTodo} placeholder="Update todo" className={styles.addTodoInput} />
        <button onClick={(e) => handleUpdate(e)} className={styles.addTodoButton}>Update</button>
      </div>

    </aside >
  );
};

export default Sidebar;
