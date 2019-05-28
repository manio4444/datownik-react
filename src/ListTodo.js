import React, {Component} from 'react';
import SingleTodo from './SingleTodo';
import './ListTodo.scss';
import axios from 'axios';

class ListTodo extends Component {
    state = {
        list: [],
    };

    getTodoList() {
        axios.post('http://localhost/datownik/', {
            ajax_action: 'tasksAjax',
            operation: 'getData',
            limit: this.props.limit,
            getFinished: this.props.getFinished || true,
            getFinishedOnly: this.props.getFinishedOnly || false,
        })
            .then(res => {
                const list = res.data.result.map(todo => {
                    return {
                        id: todo.id,
                        txt: todo.txt,
                        deadline: todo.deadline,
                        created: todo.date_mk,
                        finished: todo.date_fn,
                        isDeadline: (todo.no_deadline !== "1"),
                        isFinished: (todo.finished === "1"),
                    }
                });
                this.setState({list});

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getTodoList();
    };

    render() {
        const todos = this.state.list;

        return (
            <div className="todos__list">

                {todos.map((todo) => {
                    return (
                        <SingleTodo
                            id={todo.id}
                            key={todo.id}
                            title={todo.txt}
                            deadline={todo.deadline}
                            created={todo.created}
                            finished={todo.finished}
                            isDeadline={todo.isDeadline}
                            isFinished={todo.isFinished}
                        />
                    );
                })}

            </div>
        );
    }
}

export default ListTodo;
