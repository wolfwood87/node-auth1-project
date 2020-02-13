import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import User from './User.js';
import {UserContext} from './contexts/UserContext.js';

const Users = (props) => {
    const [users, setUsers] = useState([{id: '', username: ''}]);
    const {state, dispatch} = useContext(UserContext)
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        const data = localStorage.getItem('userState');
        console.log(data)
            const newData = JSON.parse(data)
            dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(data) });
            axios
                .get("http://localhost:4000/api/users", {headers: newData})
                .then(res => {
                    console.log(res)
                    setUsers(res.data)
                    setLogged(true)
                })
                .catch(err => {
                    console.log(err.message)
                })
    }, [])

    return (
        <div>
            {!logged && <h2>Must be logged in to view Users</h2>}
            {users.map(user => (
                <User
                    key = {user.id}
                    username = {user.username}
                />
            ))}
        </div>
    )
}

export default Users;