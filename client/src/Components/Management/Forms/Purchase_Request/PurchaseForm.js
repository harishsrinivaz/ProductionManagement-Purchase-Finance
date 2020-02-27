import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@material-ui/core';
import useStyles from './PurchaseFormstyles';
import UploadBtn from '../Upload/Upload';
import Axios from 'axios';

const style = {
   marginRight: '20px'
};
const PurchaseForm = (props) => {
   const classes = useStyles();
   var unitsList = [];
   var vendorsList = [];
   const [state, setState] = useState({
      reqDetails: {
         quantity: props.data.Quantity,
         munit: props.data.Measuring_Unit,
         vendor: props.data.Vendor,
         amount: props.data.Total_Price,
         quotationURL: props.data.Quotation_Document_URL,
         status: props.data.Status,
         comments: props.data.Comments
      }
   })

   // useEffect(() => {

   //    // Axios.get('/measuring_units')
   //    //    .then(res => {
   //    //       unitsList = res.data.MeasuringUnits;
   //    //       console.log('UnitsList: ', res.data.MeasuringUnits)
   //    //    })
   // }, [vendorsList])

   useEffect(() => {
      console.log("Details: ", state.reqDetails)
   }, [state.reqDetails])

   var qURL = [];
   const childState = (url) => {
      qURL = url
   }
   const onCancel = () => {
      var amount = document.getElementsByName('amount')[0].value;
      if (qURL.length === 0 || ((amount <= 0) || (isNaN(amount)))) {
         setState(state => ({
            ...state,
            quantity: props.data.Quantity,
            munit: props.data.Measuring_Unit,
            amount: props.data.Total_Price,
            vendor: props.data.Vendor,
            quotationURL: props.data.Quotation_Document_URL,
            status: props.data.Status,
            comment: props.data.Comment
         }))
      }
      props.handler();
   }
   const onSubmit = () => {
      //console.log('onSubmit: ', state.reqDetails)
      var amount = document.getElementsByName('amount')[0].value;
      var quantity = document.getElementsByName('quantity')[0].value;
      if ((qURL.length === 0) ||
         ((amount <= 0) || (isNaN(amount))) ||
         ((quantity <= 0) || (isNaN(quantity)))) {
         alert('Check properly')
         setState(state => ({
            ...state,
            quotationURL: props.data.Quotation_Document_URL
         }))
      }
      else {
         Axios.post('/measuring_units/name', {
            name: state.reqDetails.munit
         }).then(res => setState({ ...state, munit: res }))

         Axios.post('/vendors/name', {
            name: state.reqDetails.vendor
         }).then(res => setState({ ...state, vendor: res }))
         // Axios.post('/logs', {
         //    logs: {
         //       reqId: props.data._id,
         //       from: 'Purchase',
         //       to: 'Finance',
         //       comments: state.reqDetails.comments
         //    }
         // }).then(res => { console.log(res) })
         Axios.post('/request_details', {
            Edit: {
               _id: props.data._id,
               quantity: state.reqDetails.quantity,
               munit: state.reqDetails.munit,
               vendor: state.reqDetails.vendor,
               amount: state.reqDetails.amount,
               quotationURL: qURL,
               status: state.reqDetails.status,
               //comments: state.reqDetails.comments
            }
         }).then(console.log("Updated: ", state.reqDetails, qURL),
            props.handler()
         )
      }
   }
   const setValue = (event) => {
      setState({
         ...state,
         reqDetails: {
            quantity: event.target.name === 'quantity' ? event.target.value
               : document.getElementsByName('quantity')[0].value,
            munit: event.target.name === 'munit' ? event.target.value
               : document.getElementsByName('munit')[0].value,
            vendor: event.target.name === 'vendor' ? event.target.value
               : document.getElementsByName('vendor')[0].value,
            amount: event.target.name === 'amount' ? event.target.value
               : document.getElementsByName('amount')[0].value,
            status: event.target.name === 'status' ? event.target.value
               : document.getElementsByName('status')[0].value,
            // comment: event.target.name === 'comments' ? event.target.value
            //    : document.getElementsByName('comments')[0].value
         }
      })
   }

   const loadUnits = () => {
      console.log('unitlist', unitsList);
      return (
         unitsList.map((unit, index) => (
            <MenuItem key={index} value={unit.measuring_unit_name}>{unit.measuring_unit_name}</MenuItem>
         ))
      )
   }

   const loadVendors = () => {
      Axios.get('/vendors')
         .then(res => {
            vendorsList = res.data.Vendors;
            console.log('VendorsList: ', vendorsList)
         })
      return (
         vendorsList.map((vendor, index) => (
            <MenuItem>{vendor.vendor_name}</MenuItem>
         )))
   }

   const loadStatus = () => {
      let status = [];
      if (props.action === 'Finance') {
         status = [
            'ForwardedToFinance',
            'Finance-Accepted',
            'Finance-Rejected',
            'ForwardedToAdmin',
         ];
      }
      else {
         status = [
            'Requesting',
            'ForwardedToFinance',
            'Purchase-Delivered',
            'Purchase-Rejected',
            'Purchase-Inprogress',
         ];
      }
      //console.log('Status loaded');
      return (
         status.map((msg, index) => (
            <MenuItem key={index} value={msg} disabled={(msg === 'ForwardedToFinance' && props.action === 'Finance') || msg === 'Requesting'}>{msg}</MenuItem>
         )))
   }

   const Form = (
      <Box className={classes.form}>
         <Box className={classes.boxSize2}>

            <TextField
               name='rmname'
               size='small'
               fullWidth
               variant='outlined'
               label='Material Name'
               value={props.data.Raw_Material_Id}
               style={style}
               required
               disabled
            ></TextField>

            <TextField
               name='rmid'
               size='small'
               fullWidth
               variant='outlined'
               label='Material Code'
               value={props.data.Raw_Material_Code}
               required
               disabled
            ></TextField>
         </Box>

         <Box className={classes.boxSize2}>
            <TextField
               disabled={props.form.materialQuantity}
               name='quantity'
               size='small'
               style={style}
               fullWidth
               value={state.reqDetails.quantity}
               variant='outlined'
               label='Material Quantity'
               onChange={(event) => setValue(event)}
            ></TextField>

            <FormControl
               fullWidth
               variant='outlined'
               size='small'
               required
            >
               <InputLabel
                  style={{ backgroundColor: 'white', padding: "0 5px" }}
               >
                  Measuring Unit
               </InputLabel>
               <Select
                  disabled={props.form.materialUnit}
                  name='munit'
                  fullWidth
                  variant='outlined'
                  value={state.reqDetails.munit}
                  required
                  onChange={(event) => setValue(event)}
               >
                  <MenuItem value='Measuring_Unit'>
                     Measuring Unit
                  </MenuItem>
                  {/* {loadUnits()} */}
               </Select>
            </FormControl>

         </Box>

         <Box className={classes.boxSize2}>
            <FormControl
               fullWidth
               variant='outlined'
               size='small'
               style={style}
               required
            >
               <InputLabel
                  style={{ backgroundColor: 'white', padding: "0 5px" }}
               >
                  Vendor
               </InputLabel>
               <Select
                  disabled={props.form.vendor}
                  name='vendor'
                  variant='outlined'
                  value={state.reqDetails.vendor}
                  onChange={(event) => setValue(event)}
                  required
               >
                  {/* <MenuItem value='Vendor' disabled selected>
                     Vendor
                  </MenuItem> */}
                  {loadVendors()}
               </Select>
            </FormControl>

            <TextField
               disabled={props.form.amount}
               name='amount'
               size='small'
               fullWidth
               variant='outlined'
               label='Total Price'
               value={state.reqDetails.amount}
               onChange={(event) => setValue(event)}
            ></TextField>
         </Box>

         <Box className={classes.boxSize2}>
            <FormControl
               fullWidth
               variant='outlined'
               size='small'
               style={style}
               required
            >
               <InputLabel
                  style={{ backgroundColor: 'white', padding: "0 2px" }}
               >
                  Priority
               </InputLabel>
               <Select
                  name='priority'
                  fullWidth
                  variant='outlined'
                  value={props.data.Priority}
                  required
                  disabled
               >
                  <MenuItem value='Priority' disabled>
                     Priority
               </MenuItem>
                  <MenuItem value='Low'>Low</MenuItem>
                  <MenuItem value='Medium'>Medium</MenuItem>
                  <MenuItem value='High'>High</MenuItem>
               </Select>
            </FormControl>

            <Box width='100%' disabled style={{ position: 'relative', bottom: "5px" }}>
               {/* <Datepick id='1' Req='true' value={state.reqDetails.date} /> */}
            </Box>
         </Box>

         <Box className={classes.boxSize2}>
            <FormControl
               fullWidth
               variant='outlined'
               size='small'
               required
            >
               <InputLabel
                  style={{ backgroundColor: 'white', padding: "0 5px" }}
               >
                  Status
               </InputLabel>

               <Select
                  disabled={props.form.status}
                  name='status'
                  variant='outlined'
                  value={state.reqDetails.status}
                  required
                  onChange={(event) => setValue(event)}
               >
                  <MenuItem value='Status' disabled>
                     Status
                  </MenuItem>
                  {loadStatus()}
               </Select>
            </FormControl>

            <TextField
               disabled={props.form.comment}
               name='comments'
               size='small'
               style={{ marginLeft: '20px' }}
               fullWidth
               value={state.reqDetails.comments}
               variant='outlined'
               label='Comments'
               // onChange={(event) => setValue(event)}
               multiline
               rowsMax='2'
            ></TextField>
         </Box>

         <Box className={classes.lastboxSize2}>
            <UploadBtn
               url={props.data.Quotation_Document_URL}
               _id={props.data._id}
               action={props.action}
               setDocUrl={childState}
               icon={props.iconVisible}
            />
         </Box>
      </Box >
   );
   return (
      <Box width="100%" >
         <Box>
            <Box textAlign="center"><h1>{props.heading}</h1></Box>
            <Box className={classes.lbox}>{Form}</Box>
            <Box display='flex' justifyContent='flex-end' m={0} pr={9.5}>
               <Box pb={4}>
                  <Button
                     style={{ fontWeight: 'bold' }}
                     size='large'
                     color='primary'
                     variant='contained'
                     onClick={onCancel}
                  >{props.btnName}</Button>
               </Box>
               <Box display={props.btnDisplay} justifyContent='flex-end' pl={2} pb={4}>
                  <Button
                     style={{ fontWeight: 'bold' }}
                     size='large'
                     color='primary'
                     variant='contained'
                     onClick={() => { onSubmit() }}
                  >Submit</Button>
               </Box>
            </Box>
         </Box>
      </Box >
   );
};

export default PurchaseForm;
