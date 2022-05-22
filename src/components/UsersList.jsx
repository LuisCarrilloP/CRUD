import React from 'react';

const UsersList = ({users, selectUser, removeUser}) => {
    return (
        <ul className='list-group'>
            {
                users.map(user => (
                    <li key={user.email} className="list-group-item">
                        <div className='user-content'>
                            <h3>{user.first_name} {user.last_name}</h3>
                            <p className='email'>{user.email}</p>
                            <p className='birthday'><i class="fa-solid fa-cake-candles"></i> {user.birthday}</p>
                        </div>
                        <div className='user-content btns'>
                            <button 
                                onClick={() => selectUser(user)}
                                className="btn btn-warning">
                                    <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                                onClick={() => removeUser(user.id)}>
                                    <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

export default UsersList;