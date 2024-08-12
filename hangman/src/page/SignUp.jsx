import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../config/serverUrl';
import LoadingPage from '../components/LoadingPage';
import { gameFolder } from '../config/serverFolders';
import useFetchImage from '../hooks/useFetchImage';
import { Button, Input, message, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameExists, setUsernameExists] = useState(null);
    const [loading, setLoading] = useState(false);
    const { loading: l, data: img } = useFetchImage(gameFolder, "user_portal");

    const abortControllerRef = useRef(new AbortController());

    const checkDetails = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (usernameExists){
            message.error("Username already exist")
            return true;
        }
        if (!emailPattern.test(email)) {
            message.error("Please enter a valid email address", 5);
            return true;
        }
        if (password.length < 6) {
            message.error("Password must be at least 6 characters long", 5);
            return true;
        }
        if(password.includes(" ")){
            message.error("Password must not contain any space", 5);
            return true;    
        }
        return false;
    };

    const onSignUp = async (e) => {
        try {
            setLoading(true)
            if (await checkDetails()){
                return;
            }
                e.preventDefault();
            await axios.post(`${serverUrl}/users/register`, { username, email, password });

            message.success("Registered successfully! Please sign in using registered credential", 5)
            navigate("/signin");
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("Error:", error.response.data);
            message.error("Error registering user! Please try again after some time", 5)
        }
    };

    const userNameChange = async (e) => {
        setUsername(e.target.value);
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        try {
            const response = await axios.get(`${serverUrl}/users/check-username`, {
                params: { username: e.target.value },
                signal
            });
            setUsernameExists(response.data.exists);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
            } else {
                // console.log("Error:", error.response ? error.response.data.message : error.message);

                message.error(error.response ? error.response.data.message : error.message, 5)

            }
        }
    };

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <LoadingPage loading={loading || l}>
            <div className="sign-up-container" style={{ backgroundImage: `url(${img})` }}>
                <div className='content-box'>
                    <h1>Register Yourself</h1>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Input
                            size="medium"
                            placeholder="Enter username"
                            prefix={<UserOutlined />}
                            type="text"
                            value={username}
                            onChange={userNameChange}
                            onPressEnter={onSignUp}
                        />
                        {usernameExists !== null && (
                            <span className="username-status" style={{ color: usernameExists ? 'red' : 'green' }}>
                                {usernameExists ? 'Username already exists' : 'Username is available'}
                            </span>
                        )}
                        <Input
                            size="medium"
                            placeholder="Enter email"
                            prefix={<MailOutlined />}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onPressEnter={onSignUp}
                        />
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Input password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onPressEnter={onSignUp}
                        />
                        <Button type="primary" onClick={onSignUp}>
                            Sign Up
                        </Button>
                    </Space>
                    <div className="register-section">
                        <p>
                            Already have an account?
                            <button
                                className="register-button"
                                onClick={() => { navigate("/signin") }}
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </LoadingPage>
    );
};

export default SignUp;
