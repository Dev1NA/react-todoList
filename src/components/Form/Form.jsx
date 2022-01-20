import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

function Form({ todo, setTodo, filter, setFilter, activeBtnId, setActiveBtnId, unChecked, setUnChecked }) {

  const [value, setValue] = React.useState('');
  const addTodo = (e) => {
    e.preventDefault();
    if (value) {
      setTodo([...todo,
        {
          id: uuidv4(),
          title: value,
          completed: false,
        },
      ])
      setFilter([...todo,
        {
          id: uuidv4(),
          title: value,
          completed: false,
        },
      ])
      setValue('');
      setActiveBtnId({activeBtnId: 'button1'});
      setUnChecked(unChecked + 1)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      addTodo(e);
    }
  }

  return (
    <form className='form'>
     <input
      type='text'
      placeholder='Enter your task...'
      value={value}
      onKeyPress={handleKey}
      onChange = {(e) => setValue(e.target.value) }
     />
     <button
      className='add'
      onClick={(e) => addTodo(e)}
     >
       <FontAwesomeIcon className='addSvg' icon={faPlusSquare} size="lg" color='white'/>
     </button>
    </form>
  )
}

export default Form
