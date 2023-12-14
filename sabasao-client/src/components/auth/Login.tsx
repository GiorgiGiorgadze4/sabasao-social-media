import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { loginUser } from "../../api/posts.service";
import './login.css';

const Login: React.FC<{ onLogin: (username: string, password: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(''); // Reset the error message

    try {
      const userData = await loginUser(username, password);
      // Handle successful login, such as storing the token and redirecting the user
      // Example: localStorage.setItem('userToken', userData.token);
      onLogin(username, password);
      console.log(username,password);
      history.push('/'); // Redirect to a dashboard or other page
    } catch (error) {
      console.error(error);
      setLoginError('Invalid username or password'); // Or use a more specific error message from the response
    }
  };

  const handleRegister = () => {
    history.push('/register');
  };

  return (
    <Container className="login-container mt-5">
      <h2>Sign In</h2> {/* Added "Sign In" header */}
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="formUsername">
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="formPassword">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
        <Button variant="primary" type="submit" className="mr-2">
          Login
        </Button>
        <Button variant="secondary" onClick={handleRegister}>
          Register
        </Button> 
      </Form>
    </Container>
  );
};

export default Login;
