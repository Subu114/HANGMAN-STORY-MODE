import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../config/serverUrl';
import { isAuth, userAuthenticated, userDataRemove } from '../auth';
import { Button, Input, message, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./SignIn.css"
import LoadingPage from '../components/LoadingPage';
import useFetchImage from '../hooks/useFetchImage';
import { gameFolder } from '../config/serverFolders';

const SignIn = () => {
    const navigate = useNavigate();
    if (isAuth()) {
        navigate("/user")
        return;
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)


    const { loading: l, data: img } = useFetchImage(gameFolder, "user_portal")
    useEffect(() => {
        setLoading(l);
    }, [l]);


    const checkDetails = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    const onSignIn = async (e) => {
        try {
            if (await checkDetails()) {
                return;
            }
            setLoading(true)
            e.preventDefault();
            const response = await axios({
                method: "POST",
                url: `${serverUrl}/users/login`,
                data: { email, password }
            })


            //Setting to localstorage
            if (userAuthenticated(response)) {
                message.success("Signed In successfully", 5)
                console.log("Successfully signed in")
                setLoading(false)
                setTimeout(navigate("/user"), 1000)
            }
        } catch (error) {
            console.log("Error : ", error.response.data.message)
            message.error(error.response ? error.response.data.message : error.message, 5)
            userDataRemove();
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <LoadingPage loading={loading}>
            <div className="sign-in-container" style={{ backgroundImage: `url(${img})` }}>
                <div className="content-box">
                    <h1>Sign In</h1>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Input
                            size="medium"
                            placeholder="Enter email"
                            prefix={<UserOutlined color='black'/>}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onPressEnter={onSignIn}
                        />
                        
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Input password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onPressEnter={onSignIn}
                        />
                        <Button onClick={onSignIn} type="primary">
                            Sign In
                        </Button>
                    </Space>
                    <div className="register-section">
                        <p>
                            Don't have an account?
                            <button
                                className="register-button"
                                onClick={() => navigate("/signup")}
                            >
                                Register Here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </LoadingPage>
    );
}

export default SignIn