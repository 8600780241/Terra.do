import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchTasks } from './Actions/TaskAction';
import Register from './USER/Register';
import Login from './USER/Login';
import TaskList from './Component/TaskList';
import TaskForm from './Component/TaskForm';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/task-list" element={<TaskList />} />
          <Route path="/add-task" element={<TaskForm />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
