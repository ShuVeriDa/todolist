import {ChangeEvent, KeyboardEvent, FC} from "react";
import classes from './Test.module.css'

type TestInputType = {
   valueTitle: string
   setTitle: (title: string) => void
   callBack: () => void
   error: string | null
   setError: (nul: string | null) => void
}

export const TestInput: FC<TestInputType> = ({valueTitle, setTitle, callBack, ...props}) => {
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      props.setError(null)
      if(e.key === "Enter") {
         callBack()
      }
   }

   return (
      <>
         <input value={valueTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={ props.error ? classes.error : ''}
         />
      </>
   );
};