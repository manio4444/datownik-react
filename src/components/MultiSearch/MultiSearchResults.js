import React, {Component} from 'react';
import { Button, Table } from "semantic-ui-react";
import 'semantic-ui-css/components/table.min.css'; // TODO - import this in specific component

class MultiSearchResults extends Component {
    static Result = ({children}) => <Table>{children}</Table>;

    static Title = ({children}) => (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell verticalAlign={'middle'}>
                    {children}
                </Table.HeaderCell>
                <Table.HeaderCell>
                    <Button size={'mini'} floated='right'>Zobacz więcej</Button>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
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
