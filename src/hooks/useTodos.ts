import { useState, useEffect } from 'react'
import { FilterValue, TodoTitle, type TodoId, type Todo as TodoType } from '../types'
import { TODO_FILTERS } from '../consts'

export const useTodos = () => {
  const initialTodoState = (): TodoType[] => {
    const savedTodos = localStorage.getItem('todos')
      if (savedTodos) {
        try {
          return JSON.parse(savedTodos)
        } catch (error) {
          console.error('Error al leer los todos desde localStorage', error)
          return []
        }
      }
      return []
    }
  
    const [todos, setTodos] = useState<TodoType[]>(initialTodoState)
  
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
  
  
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
  
  
    const handleRemove = ({id}: TodoId): void => {
      const newTodos = todos.filter(todo => todo.id !== id)
      setTodos(newTodos)
    }
  
    const handleRemoveAllCompleted = (): void => {
      const newTodos = todos.filter(todo => !todo.completed)
      setTodos(newTodos)
    }
  
    const handleCompleted = ({id, completed}: Pick<TodoType, 'id' | 'completed' >): void => {
      const newTodos = todos.map(todo => {
        if(todo.id === id){
          return {...todo, completed}
        }
        return todo
      })
      setTodos(newTodos)
    }
  
    const handleFilterChange = (filter: FilterValue): void => {
      setFilterSelected(filter)
    }
  
    const activeCount = todos.filter(todo => !todo.completed).length
    const completedCount = todos.length - activeCount
  
    const filteredTodos = todos.filter(todo => {
      if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
      if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
      return todo
    })
  
    const handleAddTodo = ({title}: TodoTitle): void => {
      const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        completed: false
      }
  
      const newTodos = [...todos, newTodo]
      setTodos(newTodos)
    }
  
    const handleEditTodo = ({id, title}: Pick<TodoType, 'id' | 'title' >): void => {
      const newTodos = todos.map(todo => {
        if(todo.id === id){
          return {...todo, title}
        }
        return todo
      })
      setTodos(newTodos)
    }

  return {
    todos,
    handleAddTodo,
    handleRemove,
    handleRemoveAllCompleted,
    handleCompleted,
    handleEditTodo,
    filterSelected,
    activeCount,
    completedCount,
    filteredTodos,
    handleFilterChange
  }
}
