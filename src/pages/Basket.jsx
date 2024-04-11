import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Container, Row} from "react-bootstrap";
import BasketItem from "../components/BasketItem/BasketItem";
import {getBasket} from "../http/deviceAPI";

const Basket = () => {
    return (
        <Container className="mt-4">
            <Row className="d-flex">
                {JSON.parse(localStorage.getItem('devicesInBasket')).map(gadget=>
                    <BasketItem key={gadget.id} gadget={gadget.device}/>)
                }
            </Row>
        </Container>
    );
};

export default Basket;