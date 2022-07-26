import React, {useEffect} from 'react';
import './App.css';
import {Button, CircularProgress, Container, LinearProgress,} from "@mui/material";
import {useAppSelector} from "./store";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Menu} from "@mui/icons-material";
import {logoutTC} from "../features/Login/authReducer";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";

type PropsType = {
   demo?: boolean
}

function AppWithRedux({demo = false}: PropsType) {
   const {status, isInitialized} = useAppSelector((state) => state.app)
   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
   const dispatch = useDispatch()

   const logoutHandler = () => {
      dispatch(logoutTC())
   }

   useEffect(() => {
      dispatch(initializeAppTC())
   })

   if (!isInitialized) {
      return <div
         style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
         <CircularProgress/>
      </div>
   }

   return (
      <div className="App">
         <ErrorSnackbar/>
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu/>
               </IconButton>
               <Typography variant="h6">
                  News
               </Typography>
               {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>LOGOUT</Button>}
               <Button color="inherit">Login</Button>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
         </AppBar>
         <Container fixed>
            <Routes>
               <Route path='/' element={<TodolistsList demo={demo}/>}/>
               <Route path='login' element={<Login />}/>
               <Route path='404' element={<h1 style={{display: "flex", justifyContent: "center"}}>404: PAGE NOT FOUND</h1>} />
               <Route path='*' element={<Navigate to={'404'}/>} />
            </Routes>
         </Container>
      </div>
   );
}

export default AppWithRedux;