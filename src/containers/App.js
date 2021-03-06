import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FooterLink } from '../components/footer-link'

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
    };

    render() {
        const { todos, handleAddTodo, handleToggleTodo } = this.props;

        return (
            <Fragment>
                <input ref={node => {this.input = node}} />
                <button onClick={() => handleAddTodo(this.input)}>add todo</button>
                <ul>
                    {this.getCurrentTodoList(todos).map(todo =>
                        <li key={todo.id}
                            onClick={() => handleToggleTodo(todo.id)}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : '',
                                color: todo.completed ? '#a0a0a0' : '#000',
                                cursor: 'pointer'
                            }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
                <footer className="footer">
                    <FooterLink onFiltered={() => this.props.handleFiltered('SHOW_ALL')} currentFilter={this.props.visibilityFilter}>reset</FooterLink>&nbsp;
                    <FooterLink onFiltered={() => this.props.handleFiltered('SHOW_COMPLETED')} currentFilter={this.props.visibilityFilter}>completed</FooterLink>&nbsp;
                    <FooterLink onFiltered={() => this.props.handleFiltered('SHOW_UNCOMPLETED')} currentFilter={this.props.visibilityFilter}>uncompleted</FooterLink>
                </footer>
            </Fragment>
        )
    }

    getCurrentTodoList(todos) {
        const { visibilityFilter } = this.props;

        return todos.filter(todoItem => {
            switch(visibilityFilter) {
                case 'SHOW_ALL':
                    return todoItem;

                case 'SHOW_COMPLETED':
                    return todoItem.completed;

                case 'SHOW_UNCOMPLETED':
                    return !todoItem.completed;

                default:
                    return null;
            }
        });
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

// разбиение на простые компоненты и контейнеры
// отображение выбранного фильтра
// сохранение листа в localStorage
// роутинг