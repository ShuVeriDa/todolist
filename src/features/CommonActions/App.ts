import {createAction} from '@reduxjs/toolkit'
import {RequestStatusType} from '../Application/application-reducer'


const setAppStatusAC = createAction<{status: RequestStatusType}>('appActions/setAppStatus')
const setAppErrorAC = createAction<{error: string | null}>('appActions/setAppError')

export const appActions = {
    setAppStatusAC,
    setAppErrorAC
}
