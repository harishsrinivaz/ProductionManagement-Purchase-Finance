import React from 'react';
import { Box, Button } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';
import ManagePurchase from './Purchase/Manage_Purchase';
import ManageFinance from './Finance/Manage_Finance';
import ManagePurchaseStocks from './Purchase Stock/Manage_Purchase_Stocks'
import ProtectedRoute from '../Auth/ProtectedRoute';
import auth from '../Auth/auth';

const Management = (props) => {
   const purchaseDept = [
      { Name: 'Manage Purchase', Path: 'manage-purchase' },
      { Name: 'Manage Finance', Path: 'manage-finance' },
      { Name: 'Manage Stock', Path: 'manage-purchase-stock' },
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
            <ProtectedRoute
               exact
               path='/management/manage-purchase-stock'
               component={ManagePurchaseStocks}
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
