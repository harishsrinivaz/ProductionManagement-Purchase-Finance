import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Box, Dialog } from '@material-ui/core';
import Axios from 'axios';
import PurchaseForm from './Forms/Purchase_Request/PurchaseForm'

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
            //{ title: 'Quotation Document', field: 'Quotation_Document_URL' },
            { title: 'Status', field: 'Status' }
         ],
         data: [],
         open: false,
         heading: '',
         visible: 'none',
         childbtnDisplay: 'none',
         fieldData: [],
         action: '',
         addIcon: false
      };
      this.handler = this.handler.bind(this);
   }
   handler() {
      this.setState({
         open: false,
      })
      this.componentDidMount();
   }
   callDetails() {
      Axios.get('/home')
         .then(res => res.data)
         .then(data => {
            var items = data;
            this.setState({ data: items })
         })
   }
   close() {
      this.setState({ open: false })
   }
   // setValue(event, rowData) {
   //    console.log(rowData)
   //    this.setState({ fieldData: rowData })
   // }
   componentDidMount() {
      this.callDetails();
      if (this.state.data.Vendor === " ") {
         console.log('Vendor mt')
      }
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
                        this.setState({
                           open: true,
                           heading: 'Edit Request Details',
                           childbtnDisplay: 'flex',
                           action: 'Edit',
                           fieldData: rowData
                        })
                     }
                  }
               ]}
               editable={{
                  onRowDelete: oldData =>
                     new Promise(resolve => {
                        setTimeout(() => {
                           resolve();
                           this.setState(prevState => {
                              const data = [...prevState.data];
                              Axios.post('/home', { deleteID: data[data.indexOf(oldData)]._id })
                                 .then(data.splice(data.indexOf(oldData), 1))
                              return { ...prevState, data };
                           });
                        }, 600);
                     })
               }}
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
         </Box >
      );
   }
}

