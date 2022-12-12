import {useEffect, useState} from "react";
import './App.css';

function App() {
  const [title,setTitle] = useState("");
  const [todos,setTodos] = useState([]);

  const handleChange = (e)=>{
   setTitle(e.target.value);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    let todo = {
      title,
      status :false
    };

    let res = await fetch('http://localhost:4004/todos',{
      method : "POST",
      body : JSON.stringify(todo),
      headers : {
        'Content-Type' : 'application/json'
      }
    });
    let data = await res.json();

    setTodos([...todos,todo])
  }
   const getData = async()=>{
    let res = await fetch('http://localhost:4004/todos');
    let data = await res.json();
    setTodos(data);
   }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="type here.." onChange={handleChange}/>
          <input type="submit" />
        </form>
        <div>
          {
            todos?.map((e)=><h1 key={e.id}>{e.title}</h1>)
          }
        </div>
      </header>
    </div>
  );
}

export default App;
