import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

let todoId = 0;

class TodoApp extends Component {
    static propTypes = {
        todos: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                text: PropTypes.string,
                completed: PropTypes.boolean
            })
        ),
        handleToggleTodo: PropTypes.func,
        handleFiltered: PropTypes.func,
        visibilityFilter: PropTypes.oneOf([
            'SHOW_ALL',
            'SHOW_COMPLETED',
            'SHOW_UNCOMPLETED'
        ])
    }

    render() {
        return (
            <Fragment>
                <input ref={node => {this.input = node}} />
                <button onClick={() => this.props.handleAddTodo(this.input)}>add todo</button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id}
                            onClick={() => this.props.handleToggleTodo(todo.id)}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : '',
                                cursor: 'pointer'
                            }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
                <footer className="footer">
                    <span onClick={() => this.props.handleFiltered('SHOW_ALL')}>reset</span>&nbsp;
                    <span onClick={() => this.props.handleFiltered('SHOW_COMPLETED')}>completed</span>&nbsp;
                    <span onClick={() => this.props.handleFiltered('SHOW_UNCOMPLETED')}>uncompleted</span>
                </footer>
            </Fragment>
        )
    }
}

export default connect(
    state => {
        return {
            todos: state.todos,
            visibilityFilter: state.visibilityFilter
        }
    },
    dispatch => {
        return {
            handleAddTodo: (input) => {
                if (!input.value) return;
                dispatch({
                    type: 'ADD_TODO',
                    id: todoId++,
                    text: input.value
                });
                input.value = '';
            },
            handleToggleTodo: (id) => {
                dispatch({
                    type: 'TOGGLE_TODO',
                    id
                })
            },
            handleFiltered: (filter) => {
                dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                })
            }
        }
    }
)(TodoApp)

// Доделать все кроме роутинга
// разбиение на простые компоненты и контейнеры
// полная функциональность туду приложения (добавление, тугл, фильтр)
// прикрутить редаксовский дебагер для простоты отладки