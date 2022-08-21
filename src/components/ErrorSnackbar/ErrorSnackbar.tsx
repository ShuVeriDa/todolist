import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppSelector} from "../../app/store";
import {useActions} from "../../utils/redux-utils";
import {appActions} from "../../features/CommonActions/App";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {
   const error = useAppSelector((state) => state.app.error)
   const {setAppErrorAC} = useActions(appActions)

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return
      }
      setAppErrorAC({error: null})
   }

   const isOpen = error !== null;

   return (
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose} severity="error">
            {error}
         </Alert>
      </Snackbar>
   )
}