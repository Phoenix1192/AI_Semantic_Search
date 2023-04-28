import { useEffect, useState, useSyncExternalStore } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {

   // new line start
  const [query, setQuery] = useState('')
  const [number, setNumber] = useState('3')
  const [data,setData] = useState([''])
  const [querydata, setQuerydata] = useState('')
  const [numberdata, setNumberdata] = useState('3')
  const handleKeyDown = (event) => {
      setQuerydata(event.target.value);
  };
  const handleKeyDown2 = (event) => {
      setNumberdata(event.target.value);
  };
  const handleKeyDown3 = (event) => {
      setNumber(numberdata);
      setQuery(querydata);
    };
    useEffect(() => {
      axios.get(`back/${query}/${number}`)
      .then((response) => {
        const res = response.data
        const res2 = res['data']
       console.log(res2)
       setData(res2)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
    }, [query,number]);
  return (
    <div className="App">
      <body className="App-header">
      <div className="search">
      <div class = "Query">Query: </div>
       <div class = "Querybar"> 
       <input type="text"  onChange={e => handleKeyDown(e)} /></div>
       <div class = "Number">Number of Results : </div>
       <div className="Numberbar"> 
       <input type="number" onChange={e => handleKeyDown2(e)} /></div>
       <div class = "buttonclass" onClick={e => handleKeyDown3(e)}>
       <br />
       </div>
       </div>
        <div class = "Result">
        {data.map(home => <div class = "Inter">{home}</div>)}
        {query + " : "+number}
        </div>
        
      </body>
    </div>
  );
}

export default App;