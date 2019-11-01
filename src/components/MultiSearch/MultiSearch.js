import React, {Component} from 'react';
import {Input} from "semantic-ui-react";
import './MultiSearch.scss';

class MultiSearch extends Component {
    state = {
        searchInput: '',
    };

    handleChange = (e, {name, value}) => this.setState({ [name]: value });

    onSearch = () => {
        console.log('onSearch');
    };

    render() {

        const {searchInput} = this.state;

        return (
            <React.Fragment>
                <Input
                    fluid
                    placeholder='Zacznij wpisywać'
                    icon='search'
                    iconPosition='left'
                    action={{
                        content: 'Szukaj',
                        onClick: this.onSearch,
                    }}
                    name={'searchInput'}
                    value={searchInput}
                    onChange={this.handleChange}
                />
            </React.Fragment>
        );
    }
}

export default MultiSearch;
