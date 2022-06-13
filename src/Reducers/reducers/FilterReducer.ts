import {FilterValuesType} from "../AppReducers";

export const FilterReducer = (state: FilterValuesType, action:any) => {
   switch (action.type) {
      case 'CHANGE-FILTER':
         return action.payload.value
      default: return state
   }
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType) => {
   return {
      type: 'CHANGE-FILTER',
      payload: {
         value: value
      }
   } as const
}