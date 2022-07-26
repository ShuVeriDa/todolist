import {ChangeEvent, FC} from "react";

type UniversalCheckBoxPropsType = {
   callBack: (newIsDoneValue: boolean) => void
   checked: boolean
}


export const UniversalCheckBox:FC<UniversalCheckBoxPropsType> = ({callBack, ...props}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
     callBack(e.currentTarget.checked)
  }

   return (
      <input type="checkbox"
             checked={props.checked}
             onChange={onChangeHandler}
      />
   )
}