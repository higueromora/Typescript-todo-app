import React, { useState } from 'react'
import { TodoTitle } from '../types'

interface Props {
    saveTodo: ({title}: TodoTitle) => void
}


export const CreateTodo: React.FC<Props> = ({saveTodo}) => {
    const [inputValue, setInputValue] = useState('')
    const handleSubmit = (event: React.KeyboardEvent<HTMLFormElement>): void => {
        event.preventDefault()
        saveTodo({title: inputValue })
        setInputValue('')
    }

  return (
    <form onSubmit={handleSubmit}>
        <input 
            type="text"
            className='new-todo'
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder='¿Qué quieres hacer?'
            autoFocus
        />
    </form>
  )
}