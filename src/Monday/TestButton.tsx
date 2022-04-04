import {FC} from "react";
import classes from "./Test.module.css";

type TestButtonType = {
   title: string
   callback: () => void
   btnClass?: string
}

export const TestButton: FC<TestButtonType> = ({title, callback, ...props}) => {
   const onClickHandler = () => {
      callback()
   }

   return (
      <>
         <button className={props.btnClass} onClick={onClickHandler}>{title}</button>
      </>
   );
};
