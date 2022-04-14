import React from "react";
import classes from './Test2.module.css'

export type TestButton2PropsType = {
   title: string
   callBack: () => void
   classBtn?: string
}
export const TestButton2: React.FC<TestButton2PropsType> = ({title, ...props}) => {
   const clickHandler = () => {
      props.callBack()
   }
   return (
     <>
        <button className={props.classBtn} onClick={clickHandler}>{title}</button>
     </>
   );
};