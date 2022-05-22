import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'

function App() {

  const [ users, setUsers ] = useState([])
  const [ userSelected, setUserSelected ] = useState(null)

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  }, [])

  /* console.log(users); */

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  }

  const selectUser = (user) => setUserSelected(user)
  const deselectUser = () => setUserSelected(null)

  const addUser = (userItem) => {
    axios
      .post("https://users-crud1.herokuapp.com/users/", userItem)
      .then(() => getUsers())
      .catch((error) => console.log(error.response))
  }

  const removeUser = (id) => {
    axios
    .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(() => getUsers())
  }

  const editProduct = (userEdited) => {
    axios
      .put(`https://users-crud1.herokuapp.com/users/${productSelected.id}`, userEdited)
      .then(() => getUsers())
  }
  
  return (
    <div className="App container mt-5">
      
      <div className='form-container'>
      <h2 className='h1'>New User</h2>
      <UsersForm 
        getUsers={getUsers}
        userSelected={userSelected}
        deselectUser={deselectUser}
        addUser={addUser}
        editProduct={editProduct}
      />
      </div>

      <UsersList 
        users={users}
        selectUser={selectUser}
        removeUser={removeUser}
      />
    </div>
  )
}

export default App
