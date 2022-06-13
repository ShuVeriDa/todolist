import {ChangeEvent, FC, KeyboardEvent} from "react";

type TestInput2Type = {
   title: string
   setTitle: (title: string) => void
   callBack: () => void
   error: string | null
   setError: (error: string | null) => void
 }

export const TestInput2: FC<TestInput2Type> = ({title, setTitle, callBack, error, setError, ...props}) => {
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null)
      }
      if (e.key === "Enter") {
         callBack()
      }
   }
   return (
      <>
         <input type="text"
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
                value={title}
         />
      </>
   );
};
