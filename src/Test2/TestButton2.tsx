type TestButton2Type = {
   title: string
   callBack: () => void
}

export const TestButton2 = (props: TestButton2Type) => {
   const onClickHandler = () => {
      props.callBack()
   }
   return (
      <>
         <button onClick={onClickHandler}>{props.title}</button>
      </>
   );
};
