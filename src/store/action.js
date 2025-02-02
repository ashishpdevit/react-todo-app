// Action Types
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';

// Action Creators
export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,  
});

export const editTask = (taskId, updatedTask) => ({
  type: EDIT_TASK,
  payload: { taskId, updatedTask },
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});
