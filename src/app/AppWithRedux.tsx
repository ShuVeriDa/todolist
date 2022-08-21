import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Button, CircularProgress, Container, LinearProgress,} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Menu} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {selectIsInitialized, selectStatus} from "../features/Application/selectors";
import {appActions} from "../features/Application";
import {useActions} from "../utils/redux-utils";
import {authActions, authSelectors, Login} from "../features/Auth";

type PropsType = {
   demo?: boolean
}

function AppWithRedux({demo = false}: PropsType) {
   const status = useSelector(selectStatus)
   const isInitialized = useSelector(selectIsInitialized)
   const isLoggedIn = useSelector(authSelectors.selectIsLoggedInAC)

   const {logoutTC} = useActions(authActions)
   const {initializeAppTC} = useActions(appActions)

   useEffect(() => {
      if (!isInitialized) {
         initializeAppTC()
      }
   }, [])

   const logoutHandler = useCallback(() => {
      logoutTC()
   }, [])

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