import React, { useState, useRef } from 'react'
import './App.css';

function App() {

  const [currentTask, setCurrentTask] = useState("");
  const [todoList, setTodoList] = useState([]);

  const inputTask = useRef(null);

  const clickHandler = () => {
    setTodoList([...todoList, {task: currentTask, completed: false}]);
    inputTask.current.value = "";
    setCurrentTask("");
  }

  const handleDelete = (value) => {
    setTodoList(
      todoList.filter((item, key) => {
        return key !== value;
      })
    )
  }

  const handleComplete = (value) => {
    setTodoList(
      todoList.map((item, key) => {
        return (key === value ? {task: item.task, completed: true} : {task: item.task, completed: item.completed})
      })
    )
  }

  return (
    <div className="App">
      <h1>Todo - Application</h1>
      <div>
        <input 
        ref={inputTask}
        type="text" 
        placeholder="task..."
        onChange={(event) => {setCurrentTask(event.target.value)}} 
        onKeyDown={(event) => {if(event.code === 'Enter') clickHandler();}}
        />
        <button onClick={clickHandler}>Add Task</button>
      </div>
      <hr/>
      <ul>
        {
          todoList.map((item, key) => {
            return (
              <div id="task">
                <li key={key}>{item.task}</li>
                <button onClick={() => {handleComplete(key)}}>Completed</button>
                <button onClick={() => {handleDelete(key)}}>Delete Me!</button>
                {item.completed ? <h3>Done!!</h3> : <h3>Not Done!!</h3> }
              </div>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
