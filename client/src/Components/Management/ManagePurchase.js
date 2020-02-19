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
            { title: 'Vendor', field: 'Vendor_Name' },
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
         alert: false,
      };
      this.closeAlert = this.closeAlert.bind(this);
      this.handler = this.handler.bind(this);
      this.items = [];
   }
   handler() {
      this.setState({
         open: false,
      })
      this.callDetails();
   }
   callDetails() {
      // Axios.get('/request_details')
      //    .then(res => res.data)
      //    .then(data => {
      //       this.items = data;
      //       this.items.map((item, index) => {
      //          Axios.get('/vendors')
      //             .then(vendor => {
      //                var vendorsList = vendor.data.Vendors;
      //                console.log('Items: ', this.items)
      //                vendorsList.map(vendor => {
      //                   if (vendor._id === item.Vendor) {
      //                      console.log(vendor.vendor_name)
      //                      this.items[index].Vendor = vendor.vendor_name
      //                   }
      //                })
      //             })
      //       })
      //       this.setState({ data: this.items },
      //          () => { console.log("Data:", this.state.data) })
      //    })
      let req = [];
      Axios.get('/request_details')
         .then(res => res.data)
         .then(RequestDetails => {
            //if (this.props.load) {
            RequestDetails.map(RequestDetail => {
               //if (RequestDetail.Status === 'ForwardedToAdmin') {
               console.log('hello');
               Axios.post('/vendors', {
                  _id: RequestDetail.Vendor
               })
                  .then(res => {
                     RequestDetail.Vendor_Name =
                        res.data.Vendor[0].vendor_name;
                     req.push(RequestDetail);
                     console.log(req);
                     this.setState({
                        data: [...req]
                     });
                  })
                  .catch(err => {
                     RequestDetail.Vendor = 'Problem loading vendor';
                     req.push(RequestDetail);
                     console.log(req);
                     this.setState({
                        data: [...req]
                     });
                  });
            });
         });
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
            width='95%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            height='100vh'
            m={0}
         >
            <Box mb={2} fontSize={2 + 'vw'} fontWeight='bold'>
               Request Details
            </Box>
            <MaterialTable
               title=''
               height
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
                  // oldData => ({
                  //    icon: 'cancel',
                  //    tooltip: 'Reject',
                  //    onClick: (event, oldData) => {
                  //       if (oldData.Status === 'Requesting') {
                  //          this.setState(prevState => {
                  //             const data = [...prevState.data];
                  //             Axios.post('/request_details', { deleteID: data[data.indexOf(oldData)]._id })
                  //                .then(this.componentDidMount())
                  //             return { ...prevState, data };
                  //          });
                  //       } else {
                  //          this.setState({ alert: true })
                  //       }
                  //    }
                  // })
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

