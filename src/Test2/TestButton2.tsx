import {FC} from "react";

type TestButton2Type = {
   title: string
   callBack: () => void
   btnClass?: string
}

export const TestButton2: FC<TestButton2Type> = ({btnClass, title, callBack, ...props}) => {
   const onClickHandler = () => {
      callBack()
   }

   return (
      <>
         <button className={btnClass} onClick={onClickHandler}>{title}</button>
      </>
   );
};
