import {AppInitialStateType, slice,} from "./application-reducer";
import {appActions} from "../CommonActions/App";

const {reducer: appReducer} = slice
const {setAppErrorAC, setAppStatusAC} = appActions

let startState: AppInitialStateType

beforeEach(() => {
   startState = {
      error: null,
      isInitialized: false,
      status: "idle",
   }
})

test('correct error message should be set', () => {
   const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

   expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
   const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))

   expect(endState.status).toBe('loading')
})

