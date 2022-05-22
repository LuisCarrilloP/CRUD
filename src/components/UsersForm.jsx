import axios from 'axios';
import React, {useState, useEffect} from 'react';


const UsersForm = ({ getUsers, userSelected, deselectUser, addUser, editUser }) => {
    
    const [ name, setName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ birthday, setBirthday ] = useState("")
    const [ password, setPassword ] = useState("")

    useEffect(() => {
        if(userSelected !== null){
            setName(userSelected.first_name)
            setLastName(userSelected.last_name)
            setEmail(userSelected.email)
            setBirthday(userSelected.birthday)
            setPassword(userSelected.password)
        }else{
            setName("")
            setLastName("")
            setEmail("")
            setBirthday("")
            setPassword("")
        }
    },[userSelected])

    const submit = e => {
        e.preventDefault()
        const user = {
            password : password,
            first_name : name,
            last_name : lastName,
            email: email,
            birthday: birthday
        }
        if(userSelected !== null){
            axios //editando
                .put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
                .then(() => {
                    getUsers()
                    deselectUser()
                })
        }else{ //agregando
            axios
                .post("https://users-crud1.herokuapp.com/users/", user)
                .then(() => getUsers())
                .catch(error => console.log(error.response))
        }
    }

    return (
        <form onSubmit={submit} className="mb-5">
            <div className="d-flex">

                <div className="mb-3">
                    <label htmlFor="name" className='form-label'>
                        <i class="fa-solid fa-user icon"></i>
                    </label>
                    <input 
                        type="text"
                        className='form-control'
                        id="name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder="first name"/>
                        
                    <label htmlFor="lastname" className='form-label'>
                    </label>
                    <input 
                        type="text"
                        className='form-control'
                        id="lastname"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName} 
                        placeholder="last name"/>
                </div>

               {/*  <div className="mb-3">
                    <label htmlFor="lastname" className='form-label'>
                       Last name
                    </label>
                    <input 
                        type="text"
                        className='form-control'
                        id="lastname"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName} />
                </div> */}
            </div>

                <div className="mb-3">
                    <label htmlFor="email" className='form-label'>
                        <i class="fa-solid fa-envelope icon"></i>
                    </label>
                    <input 
                        type="email"
                        className='form-control'
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder="email"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className='form-label'>
                        <i class="fa-solid fa-lock icon"></i>
                    </label>
                    <input 
                        type="password"
                        className='form-control'
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password} 
                        placeholder="password"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="birthday" className='form-label'>
                        <i class="fa-solid fa-cake-candles icon"></i>
                    </label>
                    <input 
                        type="text"
                        className='form-control'
                        id="birthday"
                        onChange={e => setBirthday(e.target.value)}
                        value={birthday}
                        placeholder="mm/dd/yyyy" />
                </div>
            
            <button className='btn btn-primary submit-btn'>Submit</button>
            {
                userSelected !== null && (
                    <button type="button" className='btn btn-secondary' onClick={deselectUser}>Cancelar</button>
                )
            }

        </form>
    );
};

export default UsersForm;