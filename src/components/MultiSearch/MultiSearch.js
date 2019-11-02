import React, {Component} from 'react';
import {Input} from "semantic-ui-react";
import './MultiSearch.scss';
import axios from "axios";

class MultiSearch extends Component {
    state = {
        searchInput: '',
        searchDelay: 500,
        searchMinLength: 3,
        isLoading: false,
    };

    inputSearch = (e, {value}) => {
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
        clearTimeout(this.searchTimeout);

        this.setState({isLoading: true});

        axios.post(process.env.REACT_APP_ENDPOINT_URL, {
            ajax_action: 'multisearchAjax',
            operation: 'getData',
            txt: this.state.searchInput,
        })
            .then(res => {
                console.log('API response');
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState({isLoading: false});
            });
    };

    render() {

        const {searchInput, isLoading} = this.state;

        return (
            <React.Fragment>
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
                    disabled={isLoading}
                    value={searchInput}
                    onChange={this.inputSearch}
                />
            </React.Fragment>
        );
    }
}

export default MultiSearch;
