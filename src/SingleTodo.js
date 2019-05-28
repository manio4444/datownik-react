import React, {Component} from 'react';
import { Card, Icon, Button, Checkbox, Form } from 'semantic-ui-react';
import ModalTodoFinish from './ModalTodoFinish';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/card.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/form.min.css';
import 'semantic-ui-css/components/input.min.css';
import 'semantic-ui-css/components/checkbox.min.css';
import axios from "axios";

class SingleTodo extends Component {
    state = {
        isDeadline: this.props.isDeadline,
        isFinished: this.props.isFinished,
        isDeadlineLoading: false,
        isFinishedLoading: false,
        openModalTodoFinish: false,
    };
    placeholder = {
        questionFinish: 'Czy na pewno chcesz potwierdzić wykonanie zadania?',
        questionUnFinish: 'Czy na pewno chcesz cofnąć status?',
    };

    handleToggleDeadline = () => {
        this.setState(prevState => ({
            isDeadline: !prevState.isDeadline,
        }))
    };

    handleToggleDone = () => {
        this.setState({
            openModalTodoFinish: true,
            isFinishedLoading: true,
        });
    };

    closeFinishModal = () => {
        this.setState({
            openModalTodoFinish: false,
        });
        setTimeout(() => {
            this.setState({
                isFinishedLoading: false,
            })
        }, 500);
    };

    setFinished() {
        axios.post('http://localhost/datownik/', {
            ajax_action: 'tasksAjax',
            operation: 'doneTask',
            id: this.props.id,
        })
            .then(res => {
                this.setState({
                    isFinished: true,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    setUnfinished() {
        axios.post('http://localhost/datownik/', {
            ajax_action: 'tasksAjax',
            operation: 'unDoneTask',
            id: this.props.id,
        })
            .then(res => {
                this.setState({
                    isFinished: false,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    trueCallback() {
        if (this.state.isFinished === true) {
            this.setUnfinished();
        } else if (this.state.isFinished === false) {
            this.setFinished();
        }
        this.closeFinishModal();
    };

    falseCallback() {
        this.closeFinishModal();
    };

    render() {
        const { title, deadline } = this.props;
        const { isDeadline, isFinished, countdown, isFinishedLoading, openModalTodoFinish } = this.state;
        const isFinishedClass = isFinished ? 'done' : '';
        const isDeadlineClass = isDeadline ? 'deadline' : '';

        return (

            <Card className={`todo_element task ${isFinishedClass} ${isDeadlineClass}`}>
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>
                        <Icon name='ellipsis horizontal'/>
                    </Card.Meta>
                    <Card.Description className="ui form">
                        <Form.Field>
                            <Checkbox
                                toggle
                                label={<label>enable deadline</label>}
                                onChange={this.handleToggleDeadline}
                                defaultChecked={isDeadline}/>
                        </Form.Field>

                        <Form.Field className="deadline">
                            <label>deadline:</label>
                            <div className="ui icon input">
                                <input type="text" name="deadline" readOnly className="flatpickr" value={deadline}/>
                            </div>
                        </Form.Field>

                        <Form.Field>
                            <label>countdown:</label>
                            <input type="text" name="" readOnly value={countdown}/>
                        </Form.Field>
                    </Card.Description>
                </Card.Content>

                <Button
                    color={"teal"}
                    onClick={this.handleToggleDone}
                    loading={isFinishedLoading}
                >
                    <Icon name={((isFinished === true) ? 'check ' : '') + 'square outline'}/>
                    {isFinished === false && 'Oznacz jako wykonane'}
                    {isFinished === true && 'Cofnij'}
                </Button>

                <ModalTodoFinish
                    open={openModalTodoFinish}
                    header={title}
                    txt={isFinished ? this.placeholder.questionUnFinish : this.placeholder.questionFinish}
                    trueCallback={this.trueCallback.bind(this)}
                    falseCallback={this.falseCallback.bind(this)}
                />
            </Card>

        );
    }
}

export default SingleTodo;
