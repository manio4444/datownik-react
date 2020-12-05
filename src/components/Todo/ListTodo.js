import React, {Component} from 'react';

import SingleTodo from './SingleTodo';
import SingleTodoAdd from './SingleTodoAdd';
import ModalTodoAdd from './ModalTodoAdd';

import './ListTodo.scss';
import axios from 'axios';

class ListTodo extends Component {
    state = {
        list: [],
        openModalTodoAdd: false,
        fetchingData: true,
        placeholders: Number.isInteger(this.props.placeholders) ? this.props.placeholders : 3,
    };

    mapQuery(data) {
        return {
            id: data.id,
            title: data.txt,
            deadline: data.deadline,
            created: data.date_mk,
            finished: data.date_fn,
            isDeadline: (data.no_deadline !== "1"),
            isFinished: (data.finished === "1"),
            isDeleted: (data.deleted === "1"),
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
                this.setState({
                    list,
                    fetchingData: false
                });

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

    handleAddNew = (newElement) => {
        this.setState({
            list: [this.mapQuery(newElement), ...this.state.list],
        });
        this.ModalTodoAddClose();
    };

    componentDidMount() {
        this.getTodoList();
    };

    render() {
        const todos = this.state.list;
        const {
            fetchingData,
            openModalTodoAdd,
            placeholders,
        } = this.state;
        const { viewOnly } = this.props;

        const placeholdersRender = [];

        for (let i = 0; i < placeholders; i++) {
            placeholdersRender.push(<SingleTodo key={i} placeholder {...this.props}/>)
        }

        return (
            <div className="todos__list">

                {!viewOnly && <SingleTodoAdd handleAddNew={this.ModalTodoAdd}/>}

                {openModalTodoAdd && <ModalTodoAdd
                    trueCallback={this.handleAddNew}
                    falseCallback={this.ModalTodoAddClose}
                />}

                {fetchingData && <React.Fragment>{placeholdersRender}</React.Fragment>}

                {!fetchingData && todos.map((todo) => {
                    return (
                        <SingleTodo
                            key={todo.id}
                            {...todo}
                            viewOnly={viewOnly}
                        />
                    );
                })}

            </div>
        );
    }
}

export default ListTodo;
