import {ChangeEvent, KeyboardEvent} from "react";

type TestInput2Type = {
   title: string
   callBack: (title: string) => void
   setTitle: (title: string) => void
   setError: (error: string | null) => void
}

export const TestInput2 = (props: TestInput2Type) => {
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      props.setError(null)
      if (e.key === 'Enter') {
         props.callBack(e.currentTarget.value)
      }
   }

   return (
      <>
         <input value={props.title} type="text" onKeyPress={onKeyPressHandler} onChange={onChangeHandler}/>
      </>
   );
};
