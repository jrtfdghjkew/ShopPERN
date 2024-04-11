import React, {useContext, useEffect, useState} from 'react';
import {
    Button, Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormControl,
    Modal,
    Row
} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import data from "bootstrap/js/src/dom/data";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i=> i.number !==number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, []);

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data=>onHide())
    }
    console.log(file)
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-wrap">
                    <Dropdown>
                        <DropdownToggle>{device.selectedType.name || "Выберите тип"}</DropdownToggle>
                        <DropdownMenu>
                            {device.types.map(type=>
                                <DropdownItem
                                    onClick={()=> device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown style={{marginLeft: '4px'}}>
                        <DropdownToggle>{device.selectedBrand.name || "Выберите тип"}</DropdownToggle>
                        <DropdownMenu>
                            {device.brands.map(brand=>
                                <DropdownItem
                                    onClick={()=> device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <FormControl
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название устройства"
                    />
                    <FormControl
                        value={price}
                        onChange={(e)=> setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <FormControl
                        className="mt-3"
                        type="file"
                        onChange={(e)=>selectFile(e)}
                    />
                    <Button
                        className="mt-2"
                        onClick={addInfo}
                        variant={"outline-dark"}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i=>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <FormControl
                                    value={i.title}
                                    onChange={(e)=> changeInfo('title', e.target.value, i.number)}
                                placeholder="Введите название свойства"
                                >

                                </FormControl>
                            </Col>
                            <Col md={4}>
                                <FormControl
                                    value={i.description}
                                    onChange={(e)=> changeInfo('description', e.target.value, i.number)}
                                placeholder="Введите описание свойства"
                                >

                                </FormControl>
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={()=>removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;