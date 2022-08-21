// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {AppDispatchType, AppRootStateType} from "../utils/types";
import {rootReducer} from "./reducers";

// непосредственно создаём store
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(thunkMiddleware)
});
// определить автоматически тип всего объекта состояния

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatchType>()
// export const AppDispatch = () => useDispatch<DispatchType>()


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

if (process.env.NODE_ENV === 'development' && module.hot) {
   module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer)
   })
}
