import React, {Component} from 'react';
import ListTodo from "./ListTodo";

class PageTodo extends Component {

    render() {
        return (
            <section className="todos todos__page">

                <ListTodo
                    viewOnly={false}
                    limit={0}
                />

            </section>
        );
    }
}

export default PageTodo;
