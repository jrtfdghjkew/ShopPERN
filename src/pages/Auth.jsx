import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Link, useLocation, useNavigate} from "react-router-dom"
import {login, registration} from "../http/userAPI";
import {$host} from "../http";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email,password)
                user.setUser(data)
            } else {
                data = await registration(email,password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            localStorage.setItem('userEmail', user.user.email)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш password"
                        value={password}
                        type="password"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between flex-nowrap mt-3 align-items-center">
                        {isLogin ?
                            <div style={{width: 300}}>
                                Нет аккаунта? <Link style={{textDecoration: "none"}} to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</Link>
                            </div>
                            :
                            <div style={{width: 300}}>
                                Есть аккаунт? <Link style={{textDecoration: "none"}} to={LOGIN_ROUTE}>Войдите!</Link>
                            </div>

                        }
                        <Button
                            onClick={click}
                            style={{width: 130}}
                            className="align-self-end"
                            variant={"outline-success"}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;