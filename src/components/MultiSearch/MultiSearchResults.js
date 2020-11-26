import React from 'react';
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { ResultTypes } from './consts'

import ResultsNotes from './components/ResultsNotes'

import 'semantic-ui-css/components/table.min.css'; // TODO - import this in specific component

const ResultsWrapper = ({children}) => (
    <Table size='small' className="multisearch__results">
        <Table.Body>
            <Table.Row>
                <Table.Cell>{children}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
);

const ResultsResult = ({resultsComponent, title, titleUrlTo, count}) => (
    <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell className={'result__title'}>
                    Znaleziono {count} rekordów {titleUrlTo && title && <>typu <Link to={titleUrlTo}>{title}</Link></>}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>
                    więcej >
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        {(count > 0)
            ? <ResultsContent className='data-cell-scroll' children={resultsComponent}/>
            : <ResultsContent className='no-data'>No data found &nbsp;&nbsp;&nbsp;&nbsp; ¯\_( ͡° ͜ʖ ͡°)_/¯</ResultsContent>
        }
    </Table>
);

const ResultsContent = ({children, className}) => (
    <Table.Body>
        <Table.Row>
            <Table.Cell
                style={{position: 'relative'}}
                className={className}
                colSpan={2}
            >
                {children}
            </Table.Cell>
        </Table.Row>
    </Table.Body>
);

const MultiSearchResults = ({results}) => {
    return (
        <ResultsWrapper>
            {results.map(({type, data}) => {
                switch (type) {
                    case ResultTypes.NOTES:
                        return <ResultsResult
                            key={type}
                            title={'Notes'}
                            titleUrlTo={'/notatki'}
                            count={data.length}
                            resultsComponent={<ResultsNotes data={data}/>}
                        />;

                    case ResultTypes.NOTES123:
                        return <ResultsResult
                            key={type}
                            title={'Notes'}
                            titleUrlTo={'/notatki'}
                            count={data.length}
                            resultsComponent={<ResultsNotes data={data}/>}
                        />;

                    default:
                        return null;
                }
            })}
        </ResultsWrapper>
    );
};

export default MultiSearchResults;
