import React, { useCallback, useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import { Container, Row, Col, Table } from 'react-bootstrap';
import { CreateTask } from '../NewTask/CreateTask';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../store/thunks';
// import { fetchTodos, addTodo, removeTodo, toggleTodo } from '../../store/todoSlice';

export const Tasks = () => {
    const dispatch = useDispatch();
    const { todos, status, error } = useSelector(state => state.todos);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTodos());
        }
        // setTasks(todos)
    }, [status, dispatch]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h1 className="text-center">To-Do App</h1>
                    <CreateTask onAddTask={taskAddHandler} />
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Expire Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <TaskItem tasks={todos} isLoading={isLoading} error={error} setTasks={setTasks} /> */}
                            {status === 'loading' && <tr><td colSpan="6">Loading...</td></tr>}
                            {status === 'failed' && <tr><td colSpan="6">Error: {error}</td></tr>}
                            {status === 'succeeded' && todos.length === 0 && <tr><td colSpan="6">No tasks found.</td></tr>}
                            {todos && todos.length > 0 && todos?.map((task, index) => (
                                <TaskItem key={task.id} task={task} index={index} />
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
