import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Box, Dialog, Snackbar } from '@material-ui/core';
import Axios from 'axios';
import PurchaseForm from './Forms/Purchase_Request/PurchaseForm'
import Alert from '@material-ui/lab/Alert';
import ProtectedRoute from '../Auth/ProtectedRoute'
import { Link as RefLink } from 'react-router-dom'

export default class ManagePurchase extends Component {
    constructor(props) {
        super();
        this.state = {
            columns: [
                { title: 'Material Name', field: 'Raw_Material_Name' },
                { title: 'Quantity', field: 'Quantity' },
                //{ title: 'Unit', field: 'Measuring_Unit' },
                //{ title: 'Vendor', field: 'Vendor_Name' },
                { title: 'Total Price', field: 'Total_Price' },
                {
                    title: 'Quotation Document', field: 'Quotation_Document_URL',
                    render: rowData => {
                        var temp = rowData.Quotation_Document_URL;
                        //console.log(`Temp: ${temp}`)
                        try {
                            var store = [];
                            temp.map((file, index) => {
                                var tempFile = require(`../../file storage/${file}`);
                                //console.log('Else: ', file);
                                store.push(<Box key={index}>
                                    <RefLink
                                        to='document'
                                        target='_blank'
                                        onClick={(event) => {
                                            event.preventDefault();
                                            window.open(tempFile);
                                        }}
                                        style={{ textDecoration: 'none', color: 'black' }}
                                    >
                                        {file}
                                        {console.log('File: ', file)}
                                    </RefLink>
                                    <ProtectedRoute path='document' component={tempFile} />
                                </Box>
                                )
                            }
                            )
                            return store;
                        }
                        catch (err) { console.log(err); return ('File not found') }
                    }
                },
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
            formDisabled: false,
            btnName: 'Cancel'
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
        let req = [];
        Axios.get('/request_details')
            .then(res => res.data)
            .then(RequestDetails => {
                RequestDetails.map(RequestDetail => {
                    if (RequestDetail.Status === 'ForwardedToFinance') {
                        Axios.post('/vendors', {
                            _id: RequestDetail.Vendor
                        })
                            .then(res => {
                                RequestDetail.Vendor_Name =
                                    res.data.Vendor[0].vendor_name;
                                req.push(RequestDetail);
                                //console.log(req);
                                this.setState({
                                    data: [...req]
                                });
                            })
                            .catch(err => {
                                RequestDetail.Vendor = 'Problem loading vendor';
                                req.push(RequestDetail);
                                //console.log(req);
                                this.setState({
                                    data: [...req]
                                });
                            });
                    }
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
                width='85%'
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
                    style={{ whiteSpace: 'break-spaces' }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit',
                            onClick: (event, rowData) => {
                                if (rowData.Status === "ForwardedToFinance") {
                                    this.setState({
                                        open: true,
                                        childbtnDisplay: 'flex',
                                        heading: 'Edit Request Details',
                                        action: 'Edit',
                                        fieldData: rowData,
                                        visible: 'flex',
                                        btnName: 'Cancel',
                                        formDisabled: false
                                    })
                                } else {
                                    this.setState({
                                        open: true,
                                        formDisabled: true,
                                        heading: 'Request Details',
                                        childbtnDisplay: 'none',
                                        action: 'Edit',
                                        fieldData: rowData,
                                        btnName: 'ok',
                                        visible: 'none'
                                    })
                                }
                            }
                        }
                    ]}
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
                            form={this.state.formDisabled}
                            iconVisible={this.state.visible}
                            btnName={this.state.btnName}
                        />
                    </Box>
                </Dialog >
                <Snackbar
                    open={this.state.alert}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={this.closeAlert}
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
