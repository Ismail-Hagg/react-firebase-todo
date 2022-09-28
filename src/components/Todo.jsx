import React,{useState} from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'


function Todo({todo,toggleCompleate,deleteTodo}) {
    
  return (
    <li className={todo.compleated? 'flex justify-between bg-slate-400 p-4 my-2 capitalize':'flex justify-between bg-slate-200 p-4 my-2 capitalize'}>
        <div className='flex'>
            <input onChange={()=>toggleCompleate(todo)} type="checkbox" checked={todo.compleated} />
            <p onClick={()=>toggleCompleate(todo)} className={todo.compleated?'ml-2 cursor-pointer line-through' :'ml-2 cursor-pointer'}>{todo.todo}</p>
        </div>
        <button onClick={()=>deleteTodo(todo.id)}><FaRegTrashAlt className='flex items-center cursor-pointer'/></button>
    </li>
  )
}

export default Todo