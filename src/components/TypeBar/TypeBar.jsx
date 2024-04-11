import React, {useContext} from 'react';
import {Context} from "../../index";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <ListGroup>
            {device.types.map(type=>
                <ListGroupItem
                    style={{cursor: 'pointer', marginTop: '6px'}}
                    active={type.id === device.selectedType.id}
                    onClick={()=>device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroupItem>
            )}
        </ListGroup>
    );
});

export default TypeBar;