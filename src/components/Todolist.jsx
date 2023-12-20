// TodoList.js
import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import api from '../services/api';
import '../styles/App.css';
import TodoItem from './Todoitem';

function TodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await api.get('/todos');
    setTasks(response.data);
  };

  const addTask = async (task) => {
    const response = await api.post('/todos', task);
    setTasks([...tasks, response.data]);
  };

  const completeTask = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await api.put(`/todos/${taskId}`, { completed: !tasks.find((task) => task.id === taskId).completed });
  };

  const deleteTask = async (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
    await api.delete(`/todos/${taskId}`);
  };

  return (
    <div className='Section'>
        <div className='Todolist'>
          <h1>Todo List</h1>
         <AddTaskForm addTask={addTask} />
        </div> 
        <div>
        <ul className='List'>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
        </div>
     
    </div>
  );
}

export default TodoList;
