import express from 'express';
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/jokes', (req, res) => {
    const jokes = [
  {
    id: 1,
    title: "Debugging Magic",
    content: "I told my code to behave. Now it only works when my manager is watching."
  },
  {
    id: 2,
    title: "Wi-Fi Love",
    content: "My Wi-Fi and I have a strong relationship... until someone starts downloading a movie."
  },
  {
    id: 3,
    title: "Programmer Diet",
    content: "I started a healthy diet, but then I saw a cookie. It accepted all my preferences."
  },
  {
    id: 4,
    title: "Monday Motivation",
    content: "I love Mondays... said no one before their first cup of coffee."
  },
  {
    id: 5,
    title: "Battery Saver",
    content: "My phone battery lasts longer than my motivation to work on a Friday afternoon."
  }
];
  res.send(jokes)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})