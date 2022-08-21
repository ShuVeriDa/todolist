import {AppRootStateType} from '../../utils/types'

export const selectIsLoggedInAC = (state: AppRootStateType) => state.auth.isLoggedIn
