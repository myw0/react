// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // 서버에서 모든 사용자 조회
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddUser = () => {
    const newUser = { name, email };
    axios.post('http://localhost:5000/api/users', newUser)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error('Error adding user:', error));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleUpdateUser = (id) => {
    const updatedUser = { name, email };
    axios.put(`http://localhost:5000/api/users/${id}`, updatedUser)
      .then(response => {
        const updatedUsers = users.map(user => user.id === id ? response.data : user);
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h1>User Management</h1>
      <div>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleUpdateUser(user.id)}>Update</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
