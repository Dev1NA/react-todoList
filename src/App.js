import data from './Data'
import React from 'react'
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';

function App() {

  const [todo, setTodo] = React.useState(JSON.parse(localStorage.getItem('todo')));
  const [filter, setFilter] = React.useState(todo);
  const [activeBtnId, setActiveBtnId] = React.useState({activeBtnId: 'button1'});


  const [checked, setChecked] = React.useState(() => {
    let newArr = filter.filter(item => item.completed);
    return newArr.length;
  });
  const [unChecked, setUnChecked] = React.useState(() => {
    let newArr = filter.filter(item => !item.completed);
    return newArr.length;
  });


    localStorage.setItem('todo', JSON.stringify(todo));

  return (
    <div className='app'>
      <Header/>
      <Form
        todo={todo}
        setTodo={setTodo}
        filter={filter}
        setFilter={setFilter}
        setActiveBtnId={setActiveBtnId}
        activeBtnId={activeBtnId}
        checked={checked}
        setChecked={setChecked}
        unChecked={unChecked}
        setUnChecked={setUnChecked}
      />
      <TodoList
        todo={todo}
        setTodo={setTodo}
        filter={filter}
        setFilter={setFilter}
        setActiveBtnId={setActiveBtnId}
        activeBtnId={activeBtnId}
        checked={checked}
        setChecked={setChecked}
        unChecked={unChecked}
        setUnChecked={setUnChecked}
      />
    </div>
  )

}

export default App;
