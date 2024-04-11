import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Button, Container} from "react-bootstrap";
import {getBasket} from "../http/deviceAPI";
import {useNavigate} from "react-router-dom";
import {BASKET_ROUTE} from "../utils/consts";

const UserAccount = () => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    useEffect(() => {
        getBasket().then(data => {
            user.setDevicesInBasket(data)

        })
        localStorage.setItem('devicesInBasket', JSON.stringify(user.devicesInBasket))
    }, []);
    return (
        <Container className="mt-4">
            <h2>{user.user.email}</h2>
            <div className="mt-4">
                <Button variant={"outline-dark"} style={{width: '260px', height: '50px'}} onClick={()=> navigate(BASKET_ROUTE)}>Корзина</Button>
            </div>
        </Container>
    );
};

export default UserAccount;