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
        const { title, deadline } = this.props;
        const { isDeadline, isFinished, countdown } = this.state;
        const isFinishedClass = isFinished ? 'done' : '';
        const isDeadlineClass = isDeadline ? 'deadline' : '';

        return (

            <Card className={`todo_element task ${isFinishedClass} ${isDeadlineClass}`}>
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
            </Card>

        );
    }
}

export default SingleTodo;
