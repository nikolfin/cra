import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

let todoId = 0;

class TodoApp extends Component {
    render() {
        return (
            <Fragment>
                <input ref={node => {this.input = node}} />
                <button onClick={() => {this.props.handleAddTodo(this.input)}}>add todo</button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id}
                            onClick={() => {this.props.handleToggleTodo(todo.id)}}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : '',
                                cursor: 'pointer'
                            }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
                <footer className="footer">
                    <span>reset</span>
                    <span>completed</span>
                    <span>uncompleted</span>
                </footer>
            </Fragment>
        )
    }
}

export default connect(
    state => {
        return {
            todos: state.todos
        }
    },
    dispatch => {
        return {
            handleAddTodo: (input) => {
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
                    id: id
                })
            }
        }
    }
)(TodoApp)

// Доделать все кроме роутинга
// разбиение на простые компоненты и контейнеры
// полная функциональность туду приложения (добавление, тугл, фильтр)
// прикрутить редаксовский дебагер для простоты отладки