import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import User from './User.js';
import {UserContext} from './contexts/UserContext.js';

const Users = (props) => {
    const [users, setUsers] = useState([{id: '', username: ''}]);
    const {state, dispatch} = useContext(UserContext)
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        console.log(props.state.user)
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
    //experiments with contextapi and using consumer to store data.very important
    return (
        <UserContext.Consumer>
            {
                
                (apiuser) => {
                    console.log(state.user)
                    console.log(apiuser)
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
            }
        </UserContext.Consumer>
        
    )
}

export default Users;