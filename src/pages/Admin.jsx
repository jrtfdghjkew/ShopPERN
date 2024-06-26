import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-2 p-2"
                style={{width: '400px'}}
                onClick={()=>setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2 p-2"
                style={{width: '400px'}}
                onClick={()=>setBrandVisible(true)}
            >Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2 p-2"
                style={{width: '400px'}}
                onClick={()=>setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateBrand show={brandVisible} onHide={()=> setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={()=> setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={()=> setTypeVisible(false)}/>
        </Container>
    );
};

export default Admin;