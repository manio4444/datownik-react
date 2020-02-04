import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import 'semantic-ui-css/components/table.min.css'; // TODO - import this in specific component

class MultiSearchResults extends Component {
    static Result = ({ children, title, titleUrlTo, count }) => (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        className={'result__title'}
                    >
                        {titleUrlTo && <Link to="/notatki">{title}</Link>}
                        {!titleUrlTo && {title}}
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign={'right'}>
                        Znaleziono {count} rekordów
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {children}
        </Table>
    );

    static Content = ({children, className}) => (
        <Table.Body>
            <Table.Row>
                <Table.Cell
                    style={{ position: 'relative' }}
                    className={className}
                    colSpan={2}
                >
                    {children}
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    );

    render() {
        const {children} = this.props;

        return (
            <Table size='small' className="multisearch__results">
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{children}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}

export default MultiSearchResults;
