import React, {useState} from 'react';
import axios from "axios";
import { Button, Form, FormGroup, Input } from "reactstrap";

const Register = () => {
    const [cred, setCred] = useState({username: '', password: ''});

    const handleChange = e => {
        e.preventDefault();
        setCred({
            ...cred,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post("http://localhost:4000/api/register", cred)
            .then(res => {
                alert(res.data.message)
                setCred({username: '', password: ''})
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <h1>Sign Up</h1>
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
                    <Button>Sign Up</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default Register;