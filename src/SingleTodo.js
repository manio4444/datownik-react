import React, {Component} from 'react';
import { Card, Icon, Button, Checkbox, Form } from 'semantic-ui-react'
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

                <Button color={"teal"}>
                    <Icon name="square outline"/>
                    Zrobione
                </Button>
            </Card>

        );
    }
}

export default SingleTodo;
