import React, { Component } from 'react';
import { connect } from 'react-redux'


let todoId = 0;

class TodoApp extends Component {
    render() {
        return (
            <div>
                <input ref={node => {this.input = node}} />
                <button onClick={() => {this.props.handleAddTodo(this.input.text)}}>add todo</button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id} onClick={() => {this.props.handleToggleTodo(todo.id)}}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleAddTodo: () => {
            console.log(this, this.input)
            dispatch({
                type: 'ADD_TODO',
                id: todoId++,
                text: this.input.value
            });
            this.input.value = '';
        },
        handleToggleTodo: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id: id
            })
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoApp)

// Доделать все кроме роутинга
// разбиение на простые компоненты и контейнеры
// полная функциональность туду приложения (добавление, тугл, фильтр)
// прикрутить редаксовский дебагер для простоты отладки