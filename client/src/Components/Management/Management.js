import React from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';
import ManagePurchase from './ManagePurchase';
import ProtectedRoute from '../Auth/ProtectedRoute';
import auth from '../Auth/auth';

const Management = (props) => {
   var dashboardList = [];
   const purchaseDept = [
      { Name: 'Manage Purchase', Path: `manage-purchase` },
      { Name: 'Manage Stock', Path: 'manage-stock' },
      { Name: 'Manage Wastage', Path: 'manage-wastage' },
   ];
   const financeDept = [
      { Name: 'Manage Finance', Path: 'manage-finance' },
   ];

   return (
      <Box display='flex' height='100vh'>
         <Dashboard items={purchaseDept} componentName={`management`} />
         <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            width='100%'
            marginTop='20px'
            justifyContent='center'
         >
            <ProtectedRoute
               exact
               path='/management/manage-purchase'
               component={ManagePurchase}
            />
         </Box>
         <Box
            position='absolute'
            left='91%'
            top='3%'
         >
            <Button
               size='large'
               variant='contained'
               color='primary'
               style={{ fontWeight: 'bold' }}
               onClick={() => {
                  if (auth.logout()) {
                     props.history.push('/');
                  }
               }}
            >
               Logout
            </Button>
         </Box>
      </Box>
   );
};

export default Management;
