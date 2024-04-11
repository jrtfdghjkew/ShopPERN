import React, {useContext, useEffect} from 'react';
import './Navbar.css'
import {Context} from "../../index";
import {Link} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, USER_ROUTE} from "../../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom"


const Navbar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }
    return (
        <div className="navbar">
            <Link className="navbar__main" to="/">КупиДевайс</Link>
            {user.isAuth ?
                <div className="navbar__navigation">
                    <Button
                        variant={"outline-light"}
                        onClick={()=> navigate(ADMIN_ROUTE)}
                    >
                        Админ панель
                    </Button>
                    <Button
                        onClick={()=>navigate(USER_ROUTE)}
                        variant={"outline-light"}
                    >
                        {localStorage.getItem('userEmail')}
                    </Button>
                    <Button
                        variant={"outline-light"}
                        onClick={()=> logOut()}
                    >
                        Выйти
                    </Button>
                </div>
                :
                <div className="navbar__navigation">
                    <Button variant={"outline-light"} onClick={()=>navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </div>
            }
        </div>
    );
});

export default Navbar;