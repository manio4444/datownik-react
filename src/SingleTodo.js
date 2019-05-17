import React, {Component} from 'react';
// import { Card, Icon, Button } from 'semantic-ui-react'
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

    render() {
        const id = this.props.id;
        const title = this.props.title;
        const deadline = this.props.deadline;
        const created = this.props.created;
        const finished = this.props.finished;
        const isDeadline = this.state.isDeadline;
        const isFinished = this.state.isFinished;
        const countdown = this.state.countdown;
        const isFinishedClass = isFinished ? 'done' : '';

        return (

            <div className={`todo_element ui card task ${isFinishedClass}`}>
                <div className="content">
                    <div className="header">{title}</div>
                    <span data-task-details className="meta far fa-eye"/>

                    <div className="description ui form">
                        <div className="field disabled">
                            <label>id:</label>
                            <input type="text" name="id" value={id}/>
                        </div>

                        <div className="field disabled">
                            <label>date_mk:</label>
                            <input type="text" name="" value={created}/>
                        </div>

                        <div className="field">
                            <div className="ui toggle checkbox">
                                <input type="hidden" name="no_deadline" value="1"/>
                                <input type="checkbox" name="no_deadline" value="0" defaultChecked={isDeadline}/>
                                <label>enable deadline</label>
                            </div>
                        </div>

                        <div className="field deadline">
                            <label>deadline:</label>
                            <div className="ui icon input">
                                <input type="text" name="deadline" className="flatpickr" value={deadline}/>
                            </div>
                        </div>

                        <div className="field disabled">
                            <label>no_deadline:</label>
                            <input type="text" name="no_deadline" value={isDeadline}/>
                        </div>

                        <div className="field disabled">
                            <label>date_fn:</label>
                            <input type="text" name="" value={finished}/>
                        </div>

                        <div className="field disabled">
                            <label>finished:</label>
                            <input type="text" name="" value={isFinished}/>
                        </div>

                        <div className="field">
                            <label>countdown:</label>
                            <input type="text" name="" value={countdown}/>
                        </div>

                        <div className="field disabled">
                            <label>txt:</label>
                            <textarea rows="2">{title}</textarea>
                        </div>

                        <div className="field disabled delete">
                            <div className="ui button fluid">Usuń</div>
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
