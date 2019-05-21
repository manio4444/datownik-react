import React, {Component} from 'react';
import { Card, Icon, Button } from 'semantic-ui-react'
import 'semantic-ui-css/components/button.css';
import 'semantic-ui-css/components/card.css';
import 'semantic-ui-css/components/icon.css';
import 'semantic-ui-css/components/form.css';
import 'semantic-ui-css/components/input.css';
import 'semantic-ui-css/components/checkbox.css';

class SingleTodo extends Component {
    state = {
        isDeadline: this.props.isDeadline,
        isFinished: this.props.isFinished,
    };

    handleToggleDeadline = () => {
        this.setState(prevState => ({
            isDeadline: !prevState.isDeadline,
        }))
    };

    render() {
        const title = this.props.title;
        const deadline = this.props.deadline;
        const isDeadline = this.state.isDeadline;
        const isFinished = this.state.isFinished;
        const countdown = this.state.countdown;
        const isFinishedClass = isFinished ? 'done' : '';
        const isDeadlineClass = isDeadline ? 'deadline' : '';

        return (

            <div className={`todo_element ui card task ${isFinishedClass} ${isDeadlineClass}`}>
                <div className="content">
                    <div className="header">{title}</div>
                    <span data-task-details className="meta far fa-eye"/>

                    <div className="description ui form">

                        <div className="field">
                            <div className="ui toggle checkbox">
                                <input type="checkbox" name="no_deadline" onChange={this.handleToggleDeadline} defaultChecked={isDeadline}/>
                                <label>enable deadline</label>
                            </div>
                        </div>

                        <div className="field deadline">
                            <label>deadline:</label>
                            <div className="ui icon input">
                                <input type="text" name="deadline" readOnly className="flatpickr" value={deadline}/>
                            </div>
                        </div>

                        <div className="field">
                            <label>countdown:</label>
                            <input type="text" name="" readOnly value={countdown}/>
                        </div>

                    </div>
                </div>


                <button className="ui teal button">
                    <i className="square outline icon"/>
                    Zrobione
                </button>
            </div>

        );
    }
}

export default SingleTodo;
