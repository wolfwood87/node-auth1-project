import React, {useState, useContext} from 'react';
import axios from "axios";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { UserContext } from './contexts/UserContext'
const Login = (props) => {
    const [cred, setCred] = useState({username: '', password: ''});

    const { state, dispatch } = useContext(UserContext);

    const handleChange = e => {
        e.preventDefault();
        setCred({
            ...cred,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"})
        axios
            .post("http://localhost:4000/api/login", cred)
            .then(res => {
                const newUser = JSON.parse(res.config.data);
                console.log(newUser);
                dispatch({ type: "LOGIN_SUCCESS", payload: newUser.username })
                localStorage.setItem("userState", JSON.stringify(newUser));
                setCred({username: '', password: ''})
                props.history.push('/')
            })
            .catch(err => {
                console.log(err.message);
                dispatch({type: "LOGIN_FAIL", payload: err.message})
            });
    };

    return (
        <div>
            <h1>Log In</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={cred.username}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={cred.password}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Button>Log In</Button>
                </FormGroup>
            </Form>
            {state.error && <p>{state.error}</p>}
        </div>
    )
}

export default Login;