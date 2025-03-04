import { JSX } from 'react'
import './App.css'
import { Todos } from './components/Todos'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useTodos } from './hooks/useTodos'

const App = (): JSX.Element => {

  const {
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
  } = useTodos()
  
  return (
    <div className='todoapp'>
      <Header onAddTodo={ handleAddTodo}/>
      <Todos 
        onRemoveTodo={handleRemove}
        onToggleCompleted={handleCompleted}
        todos={filteredTodos}
        onEditTodo={handleEditTodo}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
