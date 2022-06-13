import {ChangeEvent, FC} from "react";

type Test2UniversalCheckBoxType = {
   checked: boolean
   callBack: (b: boolean) => void
}

export const Test2UniversalCheckBox: FC<Test2UniversalCheckBoxType> = ({callBack, checked, ...props}) => {

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      callBack(e.currentTarget.checked)
   }

   return (
      <input type="checkbox"
             checked={checked}
             onChange={onChangeHandler}
      />
   );
};