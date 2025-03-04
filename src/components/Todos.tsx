import React from 'react'
import { type Todo as TodoType , TodoId, type ListOfTodos } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodos,
  onRemoveTodo: ({id}: TodoId) => void,
  onToggleCompleted: ({id, completed}: Pick<TodoType, 'id' | 'completed' >) => void,
  onEditTodo: ({id, title}: Pick<TodoType, 'id' | 'title' >) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleted,onEditTodo }) => {
  return (
    <ul className='todo-list'>
  {
    todos.map(todo => (
      <Todo
        key={todo.id}
        id={todo.id}
        title={todo.title}
        completed={todo.completed}
        onRemoveTodo={onRemoveTodo}
        onToggleCompleted={onToggleCompleted}
        onEditTodo={onEditTodo}
      />
    ))
  }
</ul>

  )
}
