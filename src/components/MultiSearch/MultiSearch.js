import React, { Component } from 'react';
import { Input, Icon } from "semantic-ui-react";
import './MultiSearch.scss';
import axios from "axios";
import Results from "./MultiSearchResults";

class MultiSearch extends Component {
    state = {
        searchInput: '',
        queryString: '',
        searchDelay: 500,
        searchMinLength: 3,
        isLoading: false,
        isResults: false,
        results: {},
    };
    clearSearch = () => {
        this.setState({
            isResults: false,
            results: {},
        })
    };

    handleClearInput = () => {
        this.setState({searchInput: ''});
        this.clearSearch();
    };

    handleKeyDown = e => e.keyCode === 13 && this.doSearch(); // Enter

    handleOnChange = (e, {value}) => {
        if (this.state.isLoading) return;

        this.setState({searchInput: value});

        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
            if (this.state.searchInput.length < this.state.searchMinLength) {
                this.clearSearch();
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
                    queryString: this.state.searchInput,
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
            queryString,
            isLoading,
            isResults,
            results,
        } = this.state;

        return (
            <div className="multisearch">
                <Input
                    fluid
                    placeholder='Zacznij wpisywać'
                    icon={<Icon
                        name={isResults ? 'close' : 'search'}
                        link={isResults}
                        onClick={this.handleClearInput}
                    />}
                    iconPosition='left'
                    action={{
                        content: 'Szukaj',
                        onClick: this.doSearch,
                        loading: isLoading,
                        disabled: isLoading,
                    }}
                    className={isLoading ? 'disabled' : ''}
                    value={searchInput}
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleKeyDown}
                />

                {isResults && <Results results={results} queryString={queryString}/>}
            </div>
        );
    }
}

export default MultiSearch;
