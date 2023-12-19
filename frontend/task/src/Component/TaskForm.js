import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../Actions/TaskAction';
import { useNavigate } from 'react-router-dom';
const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ title, description }));
    navigate('/task-list')
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TaskForm;
