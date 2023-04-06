import { useState, useEffect } from "react";

function App() {

  const [listNames, setListNames] = useState([]);
  const [name, setName] = useState("");

  const loadNames = () => {
    fetch("http://localhost:3001/names")
      .then((response) => {
        response.json().then((list) => {
          setListNames(list);
        });
      });
  };

  const sortearName = () => {
   const max = listNames.length;
   const randomIndex = Math.floor(Math.random() * max);
   setName(listNames[randomIndex]);
  };


  useEffect(() => {
    loadNames();
  }, []);

  return (
    <div>
      {name ? <span>O nome da sorte é: {name}</span> : ""}
      <ul>
        {/* o index é para remover o Warning que solicita uma key para cada elemento */}
        {listNames.map((name, index)=>{
          return <li key={index}>{name}</li>
        })}
      </ul>
      <button onClick={loadNames}>Carregar Nome</button>
      <button onClick={sortearName}>Sortear Nome</button>
    </div>
  );
}

export default App;
