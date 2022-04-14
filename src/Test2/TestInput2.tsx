import {ChangeEvent, KeyboardEvent} from "react";
import classes from './Test2.module.css'

type TestInput2PropsType = {
   titleNew: string
   callBack: () => void
   setTitleNew: (titleNew: string) => void
   error: string | null
   setError: (error: string | null) => void
}

export const TestInput2:React.FC<TestInput2PropsType> = ({titleNew, callBack, error, ...props}) => {
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.setTitleNew(e.currentTarget.value)
   }

   const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      props.setError(null)
      if (e.key === 'Enter') {
         callBack()
      }
   }
   return (
      <>
         <input className={error ? classes.inputError : ''} value={titleNew} onChange={onChangeHandler} onKeyPress={keyPressHandler}/>
      </>
   );
};
