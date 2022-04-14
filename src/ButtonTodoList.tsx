import React from 'react';
import {FilterValuesType} from "./App";
import {Button} from "@mui/material";

type ButtonPropsType = {
   title: string
   onClickHandler: () => void
   btnClass?: string

   variant?: any
   color?: any
   size?: any
}

const ButtonTodoList = (props: ButtonPropsType) => {
   return (
      <>
         {/*<button className={props.btnClass} onClick={props.onClickHandler}>{props.title}</button>*/}
         <Button onClick={props.onClickHandler}
                 variant={props.variant}
                 size={props.size}
         >
            {props.title}
         </Button>
      </>
   );
};

export default ButtonTodoList;
