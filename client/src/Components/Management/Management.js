import React from 'react';
import { Box } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';
import PurchaseForm from './Forms/Purchase_Request/PurchaseForm'
import ManagePurchase from './ManagePurchase';
import { Route } from 'react-router';

const Management = () => {
   const dashboardList = [
      { Name: 'Manage Purchase', Path: 'manage-purchase' },
      { Name: 'Manage Stock', Path: 'manage-stock' },
      { Name: 'Manage Wastage', Path: 'manage-wastage' },
      { Name: 'Logout', Path: 'login' }
   ];
   return (
      <Box display='flex' height='100vh'>
         <Dashboard items={dashboardList} componentName='management' />
         <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            width='100%'
            marginTop='20px'
            justifyContent='center'
         >
            <Route
               exact
               path='/management/manage-purchase'
               component={ManagePurchase}
            />
            <Route
               path='/management/manage-purchase/add-purchase'
               component={PurchaseForm}
            />
         </Box>
      </Box>
   );
};

export default Management;
