import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import BigStar from "../assets/BigStar.svg"
import {useParams} from 'react-router-dom'
import {addToBasket, fetchOneDevices, getBasket} from "../http/deviceAPI";
import {Context} from "../index";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {user} = useContext(Context)
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevices(id).then(data => setDevice(data))
    }, []);
    function addItemInBasket() {
            const formData = new FormData()
            formData.append('deviceId', id)
            addToBasket(formData).then(response => alert(`Товар ` + device.name + ` был добавлен в корзину.`))
            getBasket().then(data => {
                user.setDevicesInBasket(data)
            }).catch(alert('Товар уже в корзине'))
    }
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4} style={{width: "300px"}}>
                    <Row className="d-flex flex-column">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${BigStar}) no-repeat center center`, width:200, height: 200, backgroundSize: "cover", fontSize: 36, fontWeight:"bold"}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button variant={"outline-dark"}
                            onClick={addItemInBasket}
                        >Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h2>Характеристики:</h2>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title} : {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;