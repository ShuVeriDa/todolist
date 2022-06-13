import {ChangeEvent, FC} from "react";

type UniversalCheckBoxPropsType = {
   callBack: () => void
   checked: boolean
}


export const UniversalCheckBox:FC<UniversalCheckBoxPropsType> = ({callBack, ...props}) => {
  const onChangeHandler = () => {
     callBack()
  }

   return (
      <input type="checkbox"
             checked={props.checked}
             onChange={onChangeHandler}
      />
   )
}