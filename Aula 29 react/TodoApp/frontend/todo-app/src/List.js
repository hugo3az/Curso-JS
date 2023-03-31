import logo from './logo.svg';
import './App.css';

let nome = "Lista de Tarefas";

let todos = [
  {title: "Todo #1", description: "###"},
  {title: "Todo #2", description: "###"},
  {title: "Todo #3", description: "###"},
  {title: "Todo #4", description: "###"},
  {title: "Todo #5", description: "###"}
];

function List() {
  return (
    <ul>
      {todos.map( (item) => {
        return <li>{item.title}</li> 
      })}
    </ul>
  );
}

export default List;
