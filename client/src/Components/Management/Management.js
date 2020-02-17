import React from 'react';
import { Box } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';
import PurchaseForm from './Forms/Purchase_Request/PurchaseForm'
import ManagePurchase from './ManagePurchase';
import ProtectedRoute from '../Auth/ProtectedRoute';
import { Route } from 'react-router';

const Management = (props) => {
   var dashboardList = [];
   const purchaseDept = [
      { Name: 'Manage Purchase', Path: `manage-purchase` },
      { Name: 'Manage Stock', Path: 'manage-stock' },
      { Name: 'Manage Wastage', Path: 'manage-wastage' },
      { Name: 'Logout', Path: 'login' }
   ];
   const financeDept = [
      { Name: 'Manage Finance', Path: 'manage-finance' },
      { Name: 'Logout', Path: 'login' }
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
               path='/management/manage-purchase/add-purchase'
               component={PurchaseForm}
            />
         </Box>
      </Box>
      //) : <h3 style={{ textAlign: 'center' }}>Cannot be access this page without login</h3>
   );
};

export default Management;
