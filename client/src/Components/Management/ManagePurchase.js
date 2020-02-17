import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Box, Dialog, Snackbar } from '@material-ui/core';
import Axios from 'axios';
import PurchaseForm from './Forms/Purchase_Request/PurchaseForm'
import Alert from '@material-ui/lab/Alert';

export default class ManagePurchase extends Component {
   constructor(props) {
      super();
      this.state = {
         columns: [
            { title: 'Material Name', field: 'Raw_Material_Name' },
            { title: 'Quantity', field: 'Quantity' },
            { title: 'Unit', field: 'Measuring_Unit' },
            { title: 'Vendor', field: 'Vendor' },
            { title: 'Total Price', field: 'Total_Price' },
            { title: 'Quotation Document', field: 'Quotation_Document_URL' },
            { title: 'Status', field: 'Status' }
         ],
         data: [],
         open: false,
         heading: '',
         visible: 'none',
         childbtnDisplay: 'none',
         fieldData: [],
         action: '',
         addIcon: false,
         alert: false
      };
      this.closeAlert = this.closeAlert.bind(this);
      this.handler = this.handler.bind(this);
   }
   handler(row, ch) {
      this.setState({
         open: false,
      })
      console.log(row, ch);
      if (row.Status === "Requesting" && ch === 1) {
         Axios.post('/home', {
            Status: {
               _id: row._id,
               status: "Processing"
            }
         })
      }
      this.componentDidMount();
   }

   callDetails() {
      Axios.get('/request_details')
         .then(res => res.data)
         .then(data => {
            var items = data;
            this.setState({ data: items })
         })
   }

   close() {
      this.setState({ open: false })
   }
   closeAlert() {
      this.setState({ alert: false })
   }

   componentDidMount() {
      this.callDetails();
   }

   render() {
      return (
         <Box
            width='85%'
            display='flex'
            alignItems='center'
            flexDirection='column'
            height='100vh'
         >
            <Box m={2} fontSize={2 + 'vw'} fontWeight='bold'>
               Request Details
            </Box>
            <MaterialTable
               title=''
               fullWidth
               columns={this.state.columns}
               data={this.state.data}
               actions={[
                  {
                     icon: 'edit',
                     tooltip: 'Edit',
                     onClick: (event, rowData) => {
                        if (rowData.Status === "Requesting") {
                           this.setState({
                              open: true,
                              heading: 'Edit Request Details',
                              childbtnDisplay: 'flex',
                              action: 'Edit',
                              fieldData: rowData
                           })
                        } else {
                           this.setState({ alert: true })
                        }
                     }
                  },
                  oldData => ({
                     icon: 'cancel',
                     tooltip: 'Reject',
                     onClick: (event, oldData) => {
                        if (oldData.Status === 'Requesting') {
                           this.setState(prevState => {
                              const data = [...prevState.data];
                              Axios.post('/reqDetails', { deleteID: data[data.indexOf(oldData)]._id })
                                 .then(this.componentDidMount())
                              return { ...prevState, data };
                           });
                        } else {
                           this.setState({ alert: true })
                        }
                     }
                  })
               ]}
               // editable={{
               //    onRowDelete: oldData =>
               //       new Promise((resolve, reject) => {
               //          setTimeout(() => {
               //             resolve();
               //             if (oldData.Status === 'Requesting') {
               //                this.setState(prevState => {
               //                   const data = [...prevState.data];
               //                   Axios.post('/home', { deleteID: data[data.indexOf(oldData)]._id })
               //                      .then(this.componentDidMount())
               //                   return { ...prevState, data };
               //                });
               //             } else {
               //                this.setState({ alert: true })
               //             }
               //          }, 600);
               //       })
               // }}
               options={{
                  draggable: false,
                  sorting: true,
                  headerStyle: {
                     backgroundColor: '#3f51b5',
                     color: 'white',
                     fontSize: 'medium',
                     textAlign: 'left',
                     fontWeight: 'bold',
                  },
                  alignItems: 'space-evenly'
               }}
               style={{ width: '100%', height: '73%', overflow: 'auto' }}
            />
            <Dialog
               maxWidth='md'
               open={this.state.open}
               fullWidth
            >
               <Box>
                  <PurchaseForm
                     heading={this.state.heading}
                     handler={this.handler}
                     btnDisplay={this.state.childbtnDisplay}
                     data={this.state.fieldData}
                     action={this.state.action}
                  />
               </Box>
            </Dialog >
            <Snackbar
               open={this.state.alert}
               autoHideDuration={3000}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
               onClose={this.closeAlert}
               style={{ paddingRight: "25%" }}
            >
               <Alert
                  severity='error'
                  variant='filled'
                  onClose={this.closeAlert}
               >
                  You cannot modify / reject this record
               </Alert>
            </Snackbar>
         </Box >
      );
   }
}

