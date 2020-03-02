import React from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';
import ManagePurchase from './Purchase/Manage_Purchase';
import ManageFinance from './Finance/Manage_Finance';
import ProtectedRoute from '../Auth/ProtectedRoute';
import auth from '../Auth/auth';

const Management = (props) => {
   const purchaseDept = [
      { Name: 'Manage Purchase', Path: 'manage-purchase' },
      { Name: 'Manage Finance', Path: 'manage-finance' },
      { Name: 'Manage Stock', Path: 'manage-stock' },
      { Name: 'Manage Wastage', Path: 'manage-wastage' },
      { Name: 'Reports', Path: 'reports' },
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
            <ProtectedRoute
               exact
               path='/management/manage-finance'
               component={ManageFinance}
            />
         </Box>
         <Box
            position='absolute'
            left='87%'
            top='5%'
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
