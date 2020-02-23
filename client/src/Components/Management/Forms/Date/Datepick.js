import React from 'react';
import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker
} from '@material-ui/pickers';

import MomentUtils from '@date-io/moment';

export const Datepick = props => {
   const [selectedDate, setSelectedDate] = React.useState();
   const handleDateChange = date => {
      setSelectedDate(date);
   };
   const req = props.Req;

   return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
         {req === 'true' ? (
            <KeyboardDatePicker
               disabled
               size='small'
               id={`date-picker-dialog${props.id}`}
               label='Due Date'
               format='DD/MM/YYYY'
               onChange={handleDateChange}
               value={props.value}
               KeyboardButtonProps={{
                  'aria-label': 'change date'
               }}
               fullWidth
               inputVariant='outlined'
               required
               style={{ marginTop: '5px' }}
            // helperText='Due Date*'
            />
         ) : (
               <KeyboardDatePicker
                  id={`date-picker-dialog${props.id}`}
                  label={props.Name}
                  format='DD/MM/YYYY'
                  onChange={handleDateChange}
                  value={selectedDate}
                  KeyboardButtonProps={{
                     'aria-label': 'change date'
                  }}
                  fullWidth
                  inputVariant='outlined'
               />
            )}
      </MuiPickersUtilsProvider>
   );
};
