import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const [listNames, setListName] = useState([]);

  const gerarNome = () => {
    const index = Math.floor(Math.random() * listNames.length);
    setName(listNames[index]);
  } 

  const loadNomes = () => {
    console.log("Carregar Nomes");
    fetch('http://localhost:3001/names')
      .then((Response) => {
        console.log("Nomes carregados");
        Response.json().then((dados) => {
          setListName(dados);
          gerarNome();
          console.log("Dados Carregados: ", dados);
        });
      }, (error) => {
        console.error(error);
      });
  }

  return (
    <div className="App">
      <span>Selecionado: {name}</span>
      <br/>
      <span>Nomes Disponiveis: {listNames.join(', ')}</span>
      <br/>
      <button onClick={loadNomes}>Carregar Nomes</button>
      <button onClick={gerarNome}>Sortear Nome</button>
    </div>
  );
}

export default App;
