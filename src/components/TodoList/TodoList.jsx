import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faEdit, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function TodoList({ todo, setTodo, filter, setFilter, activeBtnId, setActiveBtnId, upload, checked, setChecked, unChecked, setUnChecked  }) {

  const [editId, setEditId] = React.useState(null);
  const [value, setValue] = React.useState('');

  const removeTodo = (id) => {
    setTodo([...todo].filter(item => item.id !== id))
    setFilter([...todo].filter(item => item.id !== id))
    setActiveBtnId({activeBtnId: 'button1'});
    [...todo].map(item => {
      if (item.id === id && item.completed) setChecked(checked - 1)
      if (item.id === id && !item.completed) setUnChecked(unChecked - 1)
    })
  }
  const toggleTodo = (id) => {
    const newTodo = todo.map(item => {
      if (item.id === id) item.completed = !item.completed;
      return item;
    })
    const checked = newTodo.filter(item => item.completed)
    const unchecked = newTodo.filter(item => !item.completed)
    setFilter([...unchecked, ...checked]);
    setTodo([...unchecked, ...checked]);
    setChecked(checked.length);
    setUnChecked(unchecked.length);
    setActiveBtnId({activeBtnId: 'button1'});

  }

  const editTodo = (id, task) => {
      setEditId(id);
      setValue(task);
  }

  const saveTodo = (id) => {
    const newTodo = [...todo].map(item => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    })
    setTodo(newTodo);
    setEditId(null);
  }
  const toggleFilter = (status) => {
    if (status === 'all') return setFilter(todo)
    else {
      setFilter([...todo].filter(item => item.completed === status));
    }
  }

  const handleKey = (e, id) => {
    if (e.key === 'Enter') {
      saveTodo(id);
    }
  }

  return (
    <>
      {
        filter.length
        ? <div className="filters">
            <button
              className='filter filter-all active'
              onClick={
                () => { setActiveBtnId({activeBtnId: 'button1'}); toggleFilter('all') }
              }
              className={activeBtnId.activeBtnId === 'button1' ? 'filter filter-all active' : 'filter filter-all'}
              >
                All
            </button>
            <button
              disabled={!unChecked}
              onClick={
                () => { setActiveBtnId({activeBtnId: 'button2'}); toggleFilter(false) }
              }
              className={activeBtnId.activeBtnId === 'button2' ? 'filter filter-all active' : !unChecked ? 'filter filter-all disabled' : 'filter filter-all'}
              >
                Unfulfilled
            </button>
            <button
              disabled={!checked}
              onClick={
                () => { setActiveBtnId({activeBtnId: 'button3'}); toggleFilter(true) }
              }
              className={activeBtnId.activeBtnId === 'button3' ? 'filter filter-all active' : !checked ? 'filter filter-all disabled' : 'filter filter-all'}
              >
                Fulfilled
            </button>
          </div>
        : null
      }
      {
        !filter.length
        ? <h1 className='empty'>You've done everything :)</h1>
        : filter.map(item => (
              <div className={item.completed ? 'todo checked' : 'todo'} key={item.id}>
                {
                  item.id === editId
                  ? <input
                  className='input-edit'
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                  onKeyPress={(e) => handleKey(e, item.id)}
                  value={value}
                  />
                  : <li className='item'>{item.title}</li>
                }
                {
                  item.id === editId
                  ? <button className='save' onClick={() => saveTodo(item.id)}>
                      <FontAwesomeIcon icon={faSave} color='#000080	'/>
                    </button>
                    : <div className='buttons'>
                        <button
                          className='edit'
                          onClick={() => editTodo(item.id, item.title)}
                          disabled={activeBtnId.activeBtnId === 'button3'}
                          >
                        <FontAwesomeIcon icon={faEdit} color='SaddleBrown'/>
                        </button>
                        <button
                          className='done'
                          onClick={() => toggleTodo(item.id)}
                          disabled={activeBtnId.activeBtnId === 'button3'}
                          >
                        <FontAwesomeIcon icon={faCheckSquare} color='green'/>
                        </button>
                        <button
                          className='delete'
                          onClick={() => removeTodo(item.id)}
                          disabled={activeBtnId.activeBtnId === 'button3'}
                          >
                        <FontAwesomeIcon icon={faTrashAlt} color='grey'/>
                        </button>
                      </div>
                }
              </div>

            ))
      }
      {
        filter.length ? <h1 className='taskCount'>You need to solve
        <span>
          {
            todo.filter(item => !item.completed).length
          }
        </span>
        task
      </h1>
      : ''
      }
    </>
  )
}

export default TodoList
