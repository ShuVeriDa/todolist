// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {combineReducers} from 'redux';
import {tasksReducer} from "../features/TodolistsList/tasks-reducers";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware from 'redux-thunk'
import {applicationReducer} from "../features/Application/application-reducer";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {AppDispatchType, AppRootStateType, DispatchType} from "../utils/types";

export const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: applicationReducer,
   auth: authReducer
})
// непосредственно создаём store
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(thunkMiddleware)
});
// определить автоматически тип всего объекта состояния

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const AppDispatch = () => useDispatch<DispatchType>()


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;