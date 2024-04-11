import React from 'react';
import {DEVICE_ROUTE} from "../../utils/consts";
import {Card, Col, Image, Row} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Star from "../../assets/Star.svg";

const BasketItem = ({gadget}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className="mt-3" onClick={()=> navigate(DEVICE_ROUTE + "/" + gadget.id)}>
            <Card style={{width: '150px', cursor: 'pointer'}} border={"light"}>
                <Image style={{width: '150px', height: '150px'}} src={process.env.REACT_APP_API_URL + gadget.img}/>
                <div className="d-flex justify-content-between">
                    <div style={{overflowX: "hidden"}} className="text-black-50 d-flex flex-nowrap justify-content-sm-between">
                        <div style={{marginRight: '2px'}}></div>
                        <div></div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div>{gadget.rating}</div>
                        <Image src={Star}/>
                    </div>
                </div>
                <Row className="d-flex flex-nowrap justify-content-sm-between">
                    <div style={{width: 'auto'}}>{gadget.name}</div>
                    <div style={{width: 'auto'}}>{gadget.price + ' Р'}</div>
                </Row>
            </Card>
        </Col>
    );
};

export default BasketItem;