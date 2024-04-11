import React, {useContext, useEffect, useState} from 'react';
// import './app.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import Navbar from "./components/Navbar/Navbar"
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            check().then(data =>{
                user.setIsAuth(true)
            }).finally(()=>setLoading(false))
    }, []);
    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
  );
});

export default App;