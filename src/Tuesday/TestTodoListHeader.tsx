type TestTodoListHeaderPropsType = {
   title: string
   callBack: () => void
}

export const TestTodoListHeader = (props:TestTodoListHeaderPropsType) => {
   const clickHandler = () => {
      props.callBack()
   }
   return (
      <h3 onClick={clickHandler}>{props.title}</h3>
   )
}