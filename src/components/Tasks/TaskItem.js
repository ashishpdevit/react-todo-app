import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import useHttp from '../../hooks/use-http';
// import { removeTodo } from '../../store/todoSlice';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../../store/thunks';

const TaskItem = ({ task, index, setTasks, isLoading, error }) => {
    const { isLoading: deleteLoading, error: deleteError, sendRequest: sendTaskRequest } = useHttp();
    const [todo, setTodo] = useState([]);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        console.log(id);
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(removeTodo({ id }));
        }
    };

    return (
        <>
            {
                <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.priority}</td>
                    <td>{task.expire}</td>
                    <td>
                        <Link to={`/edit/${task.id}`} className="btn btn-primary" >Edit</Link>
                        <Button variant="danger" onClick={() => handleDelete(task.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            }
        </>
    )
};

export default TaskItem;