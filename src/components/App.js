import React, { Component } from 'react';
import { connect } from 'react-redux'


let todoId = 0;

class TodoApp extends Component {
    render() {
        return (
            <div>
                <input ref={node => {this.input = node}} />
                <button onClick={this.handleAddTodo}>add todo</button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id} onClick={this.handleToggleTodo(todo.id)}>
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
            dispatch({
                type: 'ADD_TODO',
                id: todoId++,
                text: `${this.input.value}`
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