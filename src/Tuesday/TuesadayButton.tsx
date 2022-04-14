import {FC} from "react";
import classes from "./Tuesday.module.css";

type TestButtonType = {
   title: string
   callback: () => void
   btnClass?: string
}

export const TuesadayButton: FC<TestButtonType> = ({title, callback, ...props}) => {
   const onClickHandler = () => {
      callback()
   }

   return (
      <>
         <button className={props.btnClass} onClick={onClickHandler}>{title}</button>
      </>
   );
};
