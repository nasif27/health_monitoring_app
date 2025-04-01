import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { APIContext } from "../APIContext";

export default function AuthPage() {
    const [modalShow, setModalShow] = useState(null);

    const handleShowSignIn = () => {
        setModalShow('signIn');
    };

    const handleShowSignUp = () => {
        setModalShow('signUp');
    };

    const handleClose = () => {
        setModalShow(null);
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [usernameEmail, setUsernameEmail] = useState('');
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [authToken, setAuthToken] = useLocalStorage('authToken', '');

    const apiURL = useContext(APIContext).apiURL;

    const [signUpAuthAlert, setSignUpAuthAlert] = useState(false);      // to trigger alert for signing in after successfully signed up

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate('/main');
        }
    }, [authToken, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${apiURL}/signup`, {username, email, password});
            console.log(res.data);
            handleClose();
            setSignUpAuthAlert(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (usernameEmail.includes("@")) {
            setEmail(usernameEmail);
            // for testing purpose
            console.log('usernameEmail = ', usernameEmail);
            console.log('username = ', username);
            console.log('email = ', email);
        } else {
            setUsername(usernameEmail);
            // for testing purpose
            console.log('usernameEmail = ', usernameEmail);
            console.log('username = ', username);
            console.log('email = ', email);
        }

        try {
            const res = await axios.post(`${apiURL}/signin`, {username, email, password});

            if (res.data && res.data.auth === true && res.data.token !== null) {
                setAuthToken(res.data.token);
                console.log('Successfully signed in, token saved');
                handleClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Row style={{height: "100vh"}}>
                <Col className="d-flex flex-column gap-5 justify-content-center align-items-center">
                    <Button onClick={handleShowSignIn}>Sign In</Button>
                    <Button onClick={handleShowSignUp}>Sign Up</Button>
                </Col>
            </Row>

            <Modal
                show={modalShow !== null}
                onHide={handleClose}
                animation={false}
                centered
            >
                <Modal.Body className="my-3">
                    <Form
                        className="d-flex flex-column gap-2 px-3"
                        onSubmit={modalShow === 'signIn' ? handleSignIn : handleSignUp}
                    >
                        <h2 
                            className="mb-3" 
                            style={{fontWeight: "bold"}}
                        >
                            {modalShow === 'signIn' ? 'Sign in to your account' : 'Sign up account'}
                        </h2>

                        {/* <Form.Group hidden={modalShow === 'signIn'}>
                            <Form.Control 
                                type="username"
                                placeholder="Enter your username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group> */}

                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder={modalShow === 'signIn' ? 'Enter your username/email' : 'Enter your username'}
                                onChange={modalShow === 'signIn' ? (e) => setUsernameEmail(e.target.value) : (e) => setUsername(e.target.value)}
                                // required
                            />
                        </Form.Group>

                        <Form.Group hidden={modalShow === 'signIn'}>
                            <Form.Control 
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                // required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control 
                                type="password"
                                placeholder="Enter your password"
                                // value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group hidden={modalShow === 'signIn'}>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                // value={password}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                // required
                            />

                            <p 
                                hidden={password === confirmPassword}
                                style={{color: 'red'}}
                                className="mb-0"
                            >
                                {password !== confirmPassword ? 'Password does not match!' : ''}
                            </p>
                        </Form.Group>

                        <Button className="mt-3" type="submit">
                            {modalShow === 'signIn' ? 'Sign In' : 'Sign Up'}
                        </Button>

                        <p className="mb-0">
                            {modalShow === 'signIn' ? 'Do not have account yet?' : 'Already have account?'} <span> </span>
                            <span>
                                <button 
                                    style={{color: 'blue', background: 'none', border: 'none', padding: 0}} 
                                    onClick={modalShow === 'signIn' ? handleShowSignUp : handleShowSignIn}
                                >
                                    {modalShow === 'signIn' ? 'Sign up' : 'Sign in'}
                                </button>
                            </span>
                        </p>
                    </Form>
                </Modal.Body>
            </Modal>

            <Alert 
                show={signUpAuthAlert === true} 
                variant="success" 
                className="fixed-top text-center"
                onClose={() => setSignUpAuthAlert(false)} 
                dismissible
            >
                <Alert.Heading>Succefully registered!</Alert.Heading>
                <p>
                    Please sign in based on sign up data provided just now
                </p>
            </Alert>
        </>
    );
}