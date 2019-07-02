import React, {Component} from 'react';
import SingleTodo from './SingleTodo';
import ModalTodoAdd from './ModalTodoAdd';
import './ListTodo.scss';
import axios from 'axios';

class ListTodo extends Component {
    state = {
        list: [],
        openModalTodoAdd: false,
    };

    mapQuery(data) {
        return {
            id: data.id,
            txt: data.txt,
            deadline: data.deadline,
            created: data.date_mk,
            finished: data.date_fn,
            isDeadline: (data.no_deadline !== "1"),
            isFinished: (data.finished === "1"),
        }
    };

    getTodoList() {
        axios.post(process.env.REACT_APP_ENDPOINT_URL, {
            ajax_action: 'tasksAjax',
            operation: 'getData',
            limit: this.props.limit,
            getFinished: this.props.getFinished,
            getFinishedOnly: this.props.getFinishedOnly,
        })
            .then(res => {
                const list = res.data.result.map(todo => this.mapQuery(todo));
                this.setState({list});

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    ModalTodoAdd = () => {
        this.setState({
            openModalTodoAdd: true,
        });
    };

    ModalTodoAddClose = () => {
        this.setState({
            openModalTodoAdd: false,
        })
    };

    handleAddNew = (data) => {
        axios.post(process.env.REACT_APP_ENDPOINT_URL, {
            ajax_action: 'tasksAjax',
            operation: 'saveTask',
            txt: data.title,
            no_deadline: data.isDeadline ? '0' : '1',
            deadline: data.deadline,
        })
            .then(res => {
                const list = [this.mapQuery(res.data.result.newElement), ...this.state.list];
                this.setState({ list });
                this.ModalTodoAddClose();
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getTodoList();
    };

    render() {
        const todos = this.state.list;
        const { openModalTodoAdd } = this.state;
        const { viewOnly } = this.props;

        return (
            <div className="todos__list">

                {!viewOnly && <SingleTodo
                    addNew={true}
                    handleAddNew={this.ModalTodoAdd}
                />
                }

                {openModalTodoAdd && <ModalTodoAdd
                    open={openModalTodoAdd}
                    trueCallback={this.handleAddNew.bind(this)}
                    falseCallback={this.ModalTodoAddClose.bind(this)}
                />}

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
                            viewOnly={viewOnly}
                        />
                    );
                })}

            </div>
        );
    }
}

export default ListTodo;
