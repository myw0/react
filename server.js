// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// 더미 데이터
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// REST API 1: 모든 사용자 조회
app.get('/api/users', (req, res) => {
  res.json(users);
});

// REST API 2: 특정 사용자 조회
app.get('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

// REST API 3: 사용자 추가
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// REST API 4: 사용자 수정
app.put('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
});

// REST API 5: 사용자 삭제
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send('User not found');
  }
  users.splice(userIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
