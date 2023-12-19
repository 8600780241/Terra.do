import axios from 'axios';

// Action creators
const setTasks = (tasks) => ({
    type: 'SET_TASKS',
    payload: tasks,
});

const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task,
});

const updateTask = (task) => ({
    type: 'UPDATE_TASK',
    payload: task,
});

const deleteTask = (taskId) => ({
    type: 'DELETE_TASK',
    payload: taskId,
});

// Async actions
export const fetchTasks = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/gettask');
        dispatch(setTasks(response.data));
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

export const createTask = (taskData) => async (dispatch) => {
    try {
        const response = await axios.post('/api/savetask', taskData);
        dispatch(addTask(response.data));
    } catch (error) {
        console.error('Error creating task:', error);
    }
};

export const editTask = (taskId, taskData) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/edittask/${taskId}`, taskData);
        dispatch(updateTask(response.data));
    } catch (error) {
        console.error('Error updating task:', error);
    }
};

export const removeTask = (taskId) => async (dispatch) => {
    try {
        await axios.delete(`/api/deletetask/${taskId}`);
        dispatch(deleteTask(taskId));
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};
