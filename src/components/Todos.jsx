import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'

function Todos() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [editedTodoText, setEditedTodoText] = useState('')
  const [editedTodoId, setEditedTodoId] = useState(null)

  const handleEditeChange = (e) => {
    setEditedTodoText(e.target.value)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (editedTodoId !== null) {
      dispatch(updateTodo({ id: editedTodoId, text: editedTodoText }))
      setEditedTodoId(null)
      setEditedTodoText("")
    }
  }

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >

            {
              editedTodoId === todo.id
                ?
                (
                  <form onSubmit={handleEditSubmit}>
                    <input
                      type='text'
                      value={editedTodoText}
                      onChange={handleEditeChange}
                      className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <button type='submit' className="text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-md">
                      Save
                    </button>
                  </form>
                )
                :
                (<>
                  <div className='text-white'>{todo.text}</div>
                  <button onClick={() => setEditedTodoId(todo.id)}>
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                  >
                    Delete
                  </button>
                </>)

            }
          </li >
        ))
        }
      </ul >
    </>
  )
}

export default Todos