import React from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.description}
            <Link to={`/edittask/${task._id}`}>Edit</Link>
            <button >Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add-task">Add Task</Link>
    </div>
  );
};

export default TaskList;
