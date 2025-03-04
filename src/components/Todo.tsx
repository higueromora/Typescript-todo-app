import React, { useEffect, useRef, useState } from 'react'
import { TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  onEditTodo: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        onEditTodo({ id, title: editedTitle })
      }

      if (editedTitle === '') {
        onRemoveTodo({ id })
      }

      setIsEditing(false)
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing(false)
    }
  }

  useEffect(() => {
    if (isEditing) {
      inputEditTitle.current?.focus()
    }
  }, [isEditing])

  return (
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => onToggleCompleted({ id, completed: !completed })}
          />
          <label onDoubleClick={handleDoubleClick}>{title}</label>
          <button className="destroy" onClick={() => onRemoveTodo({ id })}></button>
        </div>
        <input
          className="edit"
          value={editedTitle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          ref={inputEditTitle}
        />
    </li>
  )
}
