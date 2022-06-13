import React from 'react';
import './App.css';
import {Button, Container, LinearProgress, } from "@mui/material";
import {useAppSelector} from "./state/store";
import {TaskType} from "./api/todolists-api";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {TodolistsList} from "./components/TodolistsList";

export type TasksStateType = {
   [key: string]: Array<TaskType>
}

function AppWithRedux() {
   //С - create
   //R - read !!!!!!
   //U - update
   //D - delete
   const status = useAppSelector((state) => state.app.status)

   return (
      <div className="App">
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu/>
               </IconButton>
               <Typography variant="h6">
                  News
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
         {status === 'loading' && <LinearProgress color="secondary"/>}
         <Container fixed>
            <TodolistsList />
         </Container>
      </div>
   );
}

export default AppWithRedux;