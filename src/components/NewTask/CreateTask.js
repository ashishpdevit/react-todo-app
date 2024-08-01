import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useHttp from "../../hooks/use-http";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTodo, fetchTodos, updateTodo } from '../../store/thunks';
// import {  fetchTodos, createTodo, updateTodo } from '../../store/todoSlice';

export const CreateTask = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const { sendRequest: sendTaskRequest } = useHttp();
    const { id } = useParams();

    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const [form, setForm] = useState({
        id: null,
        title: '',
        description: '',
        priority: 'Low',
        expire: '',
    });

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            // Fetch existing task data
            dispatch(fetchTodos()).then(action => {
                const task = action.payload.find(task => task.id === id);
                if (task) {
                    setForm(task);
                }
            });
        } else {
            setIsEdit(false);
        }
    }, [id, dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const createTask = async (taskText, taskData) => {
        const generatedId = taskData.name; // generated id
        const createdTask = { id: generatedId, ...taskText };

        props.onAddTask(createdTask);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            // sendTaskRequest(
            //     {
            //         url: `https://todo-app-87ffe-default-rtdb.firebaseio.com/tasks/${id}.json`,
            //         method: "PATCH",
            //         headers: { "Content-type": "application/json" },
            //         body: form,
            //     },
            //     () => {
            //         setTodos(todos.map((todo) => (todo.id === form.id ? form : todo)));
            //         setIsEdit(false);
            //     }
            // );
            dispatch(updateTodo({ id, updatedTodo: form }));

            navigate('/')
        } else {
            const randomId = Date.now().toString()
            // setTodos([...todos, { ...form, id: randomId }]);
            // sendTaskRequest(
            //     {
            //         url: `https://todo-app-87ffe-default-rtdb.firebaseio.com/tasks.json`,
            //         method: "POST",
            //         headers: { "Content-type": "application/json" },
            //         body: { ...form, id: randomId },
            //     },
            //     createTask.bind('', form)
            // );
            const newTask = { ...form, id: randomId };
            dispatch(createTodo(newTask));
        }
        setForm({ id: "", title: '', description: '', priority: 'Low', expire: '' });
    };



    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                    as="select"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    required
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formExpireDate">
                <Form.Label>Expire Date & Time</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="expire"
                    value={form.expire}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                {isEdit ? 'Update' : 'Add'}
            </Button>
        </Form>
    );
};
