import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
 const [jokes, setJokes] = useState([]);

 useEffect(() => {
  axios.get('/api/jokes')
  .then((res) => {
    setJokes(res.data)
  })
  .catch((err) => {
    console.log(err)
  })

 })

  return (
    <>
      <h1>Jokes: {jokes.length}</h1>
      {
      jokes.map((joke) => (
        <div key={joke.id}>
          <h4>{joke.title}</h4>
          <p>{joke.content}</p>
        </div>
      ))
    }

    </>
  )
}

export default App
