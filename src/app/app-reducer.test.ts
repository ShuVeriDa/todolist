import {AppInitialStateType, appReducer, setAppErrorAC} from "./app-reducer";

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

