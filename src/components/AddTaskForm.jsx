import React, { useState } from 'react';

function AddTaskForm({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask({ title: taskTitle, completed: false });
      setTaskTitle('');
    }
  };

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <input
        className='Add-input'
        type="text"
        placeholder="Add a new task"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button className='Add-Button' type="submit">Add</button>
    </form>
  );
}

export default AddTaskForm;
