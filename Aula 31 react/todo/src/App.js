import './App.css';
import { useEffect, useState } from 'react';
import { React } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//wrapper
function request(url, options) {
  url = 'http://localhost:3001' + url;
  return fetch(url, options);
}


function App() {

  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTodos = () => {
    request('/todo').then((Response) => {
      Response.json().then((todos) => {
        setTodoList(todos);
      });
    });
  }

  const deleteTodo = (id) => {
    request('/todo/' + id, {
      method: 'DELETE'
    }).then(() => {
      setTodoList(todoList.filter((todo) => {
        return todo.id != id
      }));
      toast.success('TODO deletado com sucesso!❌');
    });
  };

  const createTodo = () => {
    if (title == "" || description == "") {
      return;
    }
    request('/todo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        categoryId: 1
      })
    }).then(() => {
      loadTodos();
      toast.success('TODO adicionado com sucesso!');
    });
    setTitle('');
    setDescription('');
  };

  useEffect(() => {
    loadTodos();
  }, []);

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let newday;
    let newmonth;
    if(day < '10'){
      newday = '0'+day;
    }
    if(month < '10'){
      newmonth = '0'+month;
    }
    let current = (newday+"/"+newmonth+"/"+year);
  

  return (
    <div className="App">
      <ul className="todo-list">
        <h1 className='titulo'>TO-DO LIST</h1>
        {todoList.map((todo, index) => {
          return <li key={todo.id}>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
            <strong>{todo.title}</strong>
            <br />
            <p className='b'>{todo.description}</p>
            <br />
            <date>Adicionado: {current}</date>
          </li>
        })}
      </ul>
      <div className="outros">
        <label>
          TITULO:
          <br />
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          DESCRIPTION:
          <br />
          <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <br />
        <button onClick={createTodo} className="adc">ADICIONAR</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
