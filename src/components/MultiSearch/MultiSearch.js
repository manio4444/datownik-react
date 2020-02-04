import React, {Component} from 'react';
import {Input} from "semantic-ui-react";
import './MultiSearch.scss';
import axios from "axios";
import Results from "./MultiSearchResults";
import SingleNote from "../Notes/SingleNote";

class MultiSearch extends Component {
    state = {
        searchInput: '',
        searchDelay: 500,
        searchMinLength: 3,
        isLoading: false,
        isResults: false,
        results: {},
    };

    handleKeyDown = e => e.keyCode === 13 && this.doSearch(); // Enter

    handleOnChange = (e, {value}) => {
        if (this.state.isLoading) return;

        this.setState({searchInput: value});

        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
            if (this.state.searchInput.length < this.state.searchMinLength) {
                console.log('clear search');
                return;
            }
            this.doSearch();
        }, this.state.searchDelay);
    };

    doSearch = () => {
        if (this.state.isLoading) return;

        clearTimeout(this.searchTimeout);

        this.setState({isLoading: true});

        axios.post(process.env.REACT_APP_ENDPOINT_URL, {
            ajax_action: 'multisearchAjax',
            operation: 'getData',
            txt: this.state.searchInput,
        })
            .then(res => {
                this.setState({
                    results: res.data.result,
                    isResults: true,
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState({isLoading: false});
            });
    };

    render() {

        const {
            searchInput,
            isLoading,
            isResults,
            results,
        } = this.state;

        return (
            <div className="multisearch">
                <Input
                    fluid
                    placeholder='Zacznij wpisywać'
                    icon='search'
                    iconPosition='left'
                    action={{
                        content: 'Szukaj',
                        onClick: this.doSearch,
                        loading: isLoading,
                        disabled: isLoading,
                    }}
                    // disabled={isLoading}
                    value={searchInput}
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleKeyDown}
                />

                {isResults && <Results>

                    <Results.Result>
                        <Results.Title>Notes</Results.Title>
                        {(results.notes && results.notes.length) ? <Results.Content className='data-cell-scroll'>
                            <SingleNote style={{opacity: 0}}/> {/*for css hack*/}
                            <div className={'multisearch__result-notes'}>
                                {results.notes.map((el) =>
                                    <SingleNote
                                        key={el.id}
                                        value={el.txt}
                                        readonly
                                    />
                                )}
                            </div>
                        </Results.Content> : <Results.Content className='no-data'>No data found</Results.Content>}
                    </Results.Result>

                </Results>}
            </div>
        );
    }
}

export default MultiSearch;
