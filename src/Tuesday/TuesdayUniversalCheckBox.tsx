import {ChangeEvent, FC} from "react";

type UniversalCheckBoxPropsType = {
   callBack: (checked: boolean) => void
   checked: boolean
}


export const TuesdayUniversalCheckBox:FC<UniversalCheckBoxPropsType> = ({callBack, ...props}) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
     callBack(event.currentTarget.checked)
  }

   return (
      <input type="checkbox"
             checked={props.checked}
             onChange={onChangeHandler}
      />
   )
}