import React, {Component} from 'react';
import {
    Card,
    Icon,
    Button,
    Dropdown
} from 'semantic-ui-react';

import { getDiffTimestamps } from '../../utils/commonTime'

import ModalYesNo from './ModalYesNo';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/card.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/form.min.css';
import 'semantic-ui-css/components/input.min.css';
import 'semantic-ui-css/components/checkbox.min.css';
import axios from "axios";
import Placeholder from '../Placeholder/Placeholder';
import { deleteTodo } from "./actions";

import './SingleTodo.scss'

class SingleTodo extends Component {
    interval = null; // can't be in state
    state = {
        isDeadline: this.props.isDeadline,
        isFinished: this.props.isFinished,
        isDeleted: this.props.isDeleted,
        isDeleting: false,
        isDeadlineLoading: false,
        isLoading: false,
        openModalYesNo: false,
        modalProps: {},
        countdown: '',
        isDeadlineExceeded: false,
    };
    placeholder = {
        questionFinish: 'Czy na pewno chcesz potwierdzić wykonanie zadania?',
        questionUnFinish: 'Czy na pewno chcesz cofnąć status?',
        questionDelete: 'Czy na pewno chcesz usunąć zadania?',
        questionUnDelete: 'Czy na pewno chcesz cofnąć usunięcie?',
    };

    componentDidMount() {
        if (this.state.isDeadline) {
            this.renderCountdown();
            this.interval = setInterval(()=> {
                this.renderCountdown();
            }, 1000);
        }
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    };

    handleAddNew = (data) => this.props.handleAddNew(data);


    handleToggleDone = () => this.handleModalYesNo({
        icon: 'edit',
        txt: this.state.isFinished ? this.placeholder.questionUnFinish : this.placeholder.questionFinish,
        trueCallback: this.state.isFinished ? this.setUnfinished : this.setFinished,
    });

    handleToggleDelete = () => this.handleModalYesNo({
        icon: 'trash alternate',
        txt: this.state.isDeleted ? this.placeholder.questionUnDelete : this.placeholder.questionDelete,
        trueCallback: this.state.isDeleted ? this.setUndeleted : this.setDeleted,
    });

    handleModalYesNo = modalProps => {
        this.setState({
            modalProps: {
                ...modalProps,
                open: true,
                header: this.props.title,
                falseCallback: this.closeModalYesNo.bind(this),
            },
            openModalYesNo: true,
        });
    };

    setFinished = () => axios
        .post(
            process.env.REACT_APP_ENDPOINT_URL,
            {
                ajax_action: 'tasksAjax',
                operation: 'doneTask',
                id: this.props.id,
            })
        .then(() => this.setState({
            isFinished: true,
            openModalYesNo: false,
        }))
        .catch( error => console.log(error));

    setUnfinished = () => axios
        .post(
            process.env.REACT_APP_ENDPOINT_URL,
            {
                ajax_action: 'tasksAjax',
                operation: 'unDoneTask',
                id: this.props.id,
            })
        .then(() => this.setState({
            isFinished: false,
            openModalYesNo: false,
        }))
        .catch( error => console.log(error));

    setDeleted = () => {
        deleteTodo({
            id: this.props.id
        })
            .then(() => this.setState({
                isDeleted: true,
                openModalYesNo: false,
                isDeleting: true,
            }, () => {
                setTimeout(() => {
                    this.props.deletedCallback(this.props.id);
                }, 300);
            }))
            .catch(error => console.error(error))
            .finally();
    };

    setUndeleted = () => axios
        .post(
            process.env.REACT_APP_ENDPOINT_URL,
            {
                ajax_action: 'tasksAjax',
                operation: 'unDeleteTask',
                id: this.props.id,
            })
        .then(() => this.setState({
            isDeleted: false,
            openModalYesNo: false,
            isLoading: false,
        }))
        .catch( error => console.log(error));

    closeModalYesNo() {
        this.setState({openModalYesNo: false});
    };

    renderCountdown = () => {
        const nowTs = new Date().getTime();
        const deadlineTs = new Date(this.props.deadline).getTime();
        const diff = getDiffTimestamps(nowTs, deadlineTs);

        const isDeadlineExceeded = (deadlineTs <= nowTs);
        const countdown = `${diff.days} Dni, ${diff.hours} Godz. ${diff.minutes} Min. ${diff.seconds} Sek.`;

        this.setState({
            isDeadlineExceeded,
            countdown,
        });
    };

    actionOptions = [
        {
            key: 'done',
            text: 'Wykonane',
            icon: 'user',
            onClick: this.handleToggleDone
        },
        {
            key: 'edit',
            text: 'Edytuj',
            icon: 'settings',
            // onClick: this.handleEdit
        },
        {
            key: 'delete',
            text: 'Usuń',
            icon: 'trash',
            onClick: this.handleToggleDelete
        },
    ];

    render() {
        const {
            title,
            deadline,
            viewOnly,
            placeholder
        } = this.props;
        const {
            isDeadline,
            isFinished,
            isDeleted,
            countdown,
            openModalYesNo,
        } = this.state;
        const isFinishedClass = isFinished ? 'done' : '';
        const isDeadlineClass = isDeadline ? 'deadline' : '';
        const isDeletingClass = (this.state.isDeleting) ? 'deleting' : '';
        const isViewOnlyClass = viewOnly ? 'teal' : '';

        if (placeholder) {
            return (
                <Card className={`todo_element task ${isViewOnlyClass}`}>
                    <Card.Content>
                        <Card.Header><Placeholder /></Card.Header>
                        <Card.Meta><Placeholder /></Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Placeholder />
                    </Card.Content>
                    {!viewOnly && <Button color={"teal"} disabled>
                        <Icon name={'check square outline'}/>
                        Oznacz jako wykonane
                    </Button>}
                </Card>
            );
        }

        return (
            <Card className={`todo_element task ${isFinishedClass} ${isDeadlineClass} ${isDeletingClass} ${isViewOnlyClass}`}>
                <Card.Content>
                    <Card.Header className={'withDropdown'}>
                        {title}
                        {!viewOnly && <Dropdown
                            trigger={<Icon name='ellipsis horizontal'/>}
                            options={this.actionOptions}
                            icon={null}
                        />}
                    </Card.Header>
                    <Card.Meta>
                        {isDeadline ? deadline : 'brak deadline'}
                    </Card.Meta>
                    {isDeleted && <Card.Description>DELETED</Card.Description>}
                </Card.Content>

                {countdown && <Card.Content extra>
                    <Icon name='stopwatch'/>
                    {countdown}
                </Card.Content>}

                {!viewOnly && <Button
                    color={"teal"}
                    onClick={this.handleToggleDone}
                >
                    <Icon name={((isFinished === true) ? 'check ' : '') + 'square outline'}/>
                    {!isFinished && 'Oznacz jako wykonane'}
                    {isFinished && 'Cofnij'}
                </Button>}

                {openModalYesNo && <ModalYesNo {...this.state.modalProps} />}
            </Card>
        );
    }
}

export default SingleTodo;
