import React, { useState } from 'react';
import { Fab, Button, Paper, Box, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '../Purchase_Request/PurchaseFormstyles';
import PurchaseForm from '../Purchase_Request/PurchaseForm';
import ManagePurchase from '../../ManagePurchase';
import { Link, Route } from 'react-router-dom';
const Demo = () => {
   const classes = useStyles();
   const form = <PurchaseForm />;
   let addform = [];
   const [state, setState] = useState({
      formList: [],
      fncall: 'on',
      deleteDisplay: 'none',
      scroll: ''
   });
   const addNew = Id => {
      addform = state.formList;
      addform.push(form);
      setState({
         formList: addform,
         fncall: 'off',
         deleteDisplay: 'none'
      });
      if (state.fncall === 'off') {
         setState({
            formList: addform,
            fncall: 'off',
            deleteDisplay: 'flex'
         });
         console.log('New Form Added!');
      }
   };
   const deleteNew = () => {
      addform = state.formList;
      addform.pop();
      setState({
         formList: addform,
         fncall: 'off',
         deleteDisplay: 'flex'
      });
      if (addform.length === 1) {
         setState({
            formList: addform,
            fncall: 'off',
            deleteDisplay: 'none'
         });
      }
   };
   if (state.fncall === 'on') {
      addNew();
   }
   return (
      <Box display='flex' width='80%' height='85%' flexDirection='column'>
         <Box className={classes.heading} fontSize={2 + 'vw'}>
            Purchase Request
         </Box>
         <Box display='flex' flexDirection='row' height='85.5%'>
            <Box display='flex' flexDirection='column' width='100%'>
               <Paper elevation={2} className={classes.paper} id='paper'>
                  {state.formList
                     .map((forms, index) => (
                        <Box key={index} id='form'>
                           <Box
                              pl={4}
                              pt={2}
                              mb={0}
                              className={classes.formText}
                           >
                              Form {index + 1}
                           </Box>
                           {forms}
                           {console.log(index)}
                           <Divider className={classes.divider}></Divider>
                        </Box>
                     ))
                     .reverse()}
               </Paper>
               <Box display='flex' justifyContent='flex-end' mt={2}>
                  <Link
                     to='/management/manage-purchase'
                     style={{ textDecoration: 'none' }}
                  >
                     <Button
                        color='primary'
                        variant='contained'
                        size='large'
                        style={{ fontWeight: 'bold' }}
                     >
                        Submit
                     </Button>
                  </Link>
                  <Route
                     exact
                     path='/management/manage-purchase'
                     component={ManagePurchase}
                  />
               </Box>
            </Box>
            <Box display='flex' alignItems='flex-end' pb={8}>
               <Box
                  display={state.deleteDisplay}
                  justifyContent='center'
                  alignItems='flex-end'
                  pl={1}
               >
                  <Fab size='small' onClick={deleteNew} color='secondary'>
                     <DeleteIcon />
                  </Fab>
               </Box>
               {/* <Box
                  display='flex'
                  alignItems='flex-end'
                  justifyContent='flex-end'
                  pl={1}
               >
                  <Fab
                     size='small'
                     color='secondary'
                     onClick={event => {
                        addNew('paper');
                     }}
                  >
                     <AddIcon />
                  </Fab>
               </Box> */}
            </Box>
         </Box>
      </Box>
   );
};

export default Demo;
