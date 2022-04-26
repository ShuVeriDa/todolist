import { ChangeEvent } from "react";

type Test2UniversalCheckBoxType = {
   checked: boolean
   callBack: (checked: boolean) => void
}

export const Test2UniversalCheckBox = (props: Test2UniversalCheckBoxType) => {
   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      props.callBack(event.currentTarget.checked)
   }
   return (
      <input type="checkbox" checked={props.checked} onChange={onChangeHandler}/>
   );
};