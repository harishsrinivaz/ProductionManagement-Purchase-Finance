import React, { Component } from "react";
import MaterialTable from "material-table";
import { Box, DialogContent, Snackbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import EditPurchase from "./Finance_Edit_Purchase";
import Alert from "@material-ui/lab/Alert";

export default class Manage_Finance extends Component {
    constructor(props) {
        super();
        this.EditData = {};
        this.state = {
            columns: [
                // { title: "Material ID", field: "Raw_Material_Id" },
                { title: "Material Name", field: "Raw_Material_Id" },
                { title: "Quantity", field: "Quantity" },
                // { title: "Measuring Unit", field: "Measuring_Unit" },
                //{ title: "Vendor", field: "Vendor" },
                { title: "Total Price", field: "Total_Price" },
                // {
                //     title: 'Quotation Document', field: 'Quotation_Document_URL',
                //     render: rowData => {
                //         var recFile = rowData.Quotation_Document_URL;
                //         try {
                //             if (recFile.length > 0) {
                //                 recFile.map((file) => {
                //                     require(`../../../file storage/${file}`)
                //                 })
                //                 return recFile;
                //             }
                //             else {
                //                 return 'File not uploaded'
                //             }
                //         }
                //         catch (err) {
                //             return 'File not found'
                //         }
                //     }
                // },
                //{ title: "Priority", field: "Priority" },
                { title: "Status", field: "Status" },
                // { title: "From", field: "From" },
                // { title: "To", field: "To" },
                { title: "Comments", field: "Comments" }
            ],
            data: [],
            openAdd: false,
            openEdit: false,
            alert: false,
            fieldDisabled: {
                quantity: false,
                unit: false,
                vendor: false,
                amount: false,
                status: false,
                comment: false,
                btnDisplay: 'none',
                btnText: 'Close',
                from: '',
                to: '',
                uploadFile: 'flex'
            },
            logComments: ''
        };
        this.closeAlert = () => {
            this.setState({ alert: false })
        };
        this.OnEditHandler = (event, rowData) => {
            axios
                .post("/request-details", {
                    _id: rowData._id
                })
                .then(res => {
                    //console.log(res.data[0]);
                    this.EditData = { ...res.data[0] };
                    //console.log(this.EditData);
                    this.setState({
                        openEdit: true
                    });
                });
        };
        this.handleClose = () => {
            axios.get("/request-details").then(res => {
                console.log('reqDetials: ', res.data);
                var temp = [];
                for (let i = 0; i < res.data.length; i++) {

                    if (res.data[i].Status === 'ForwardedToFinance') {
                        console.log('status: ', res.data[i].Status)
                        res.data[i].id = i + 1;
                        //temp = res.data[i];
                        axios
                            .post("/measuring-unit/measuring-unit", {
                                _id: res.data[i].Measuring_Unit
                            })
                            .then(MeasuringUnit => {
                                // console.log(MeasuringUnit);
                                if (MeasuringUnit.data.MeasuringUnit[0]) {
                                    // console.log(
                                    //   MeasuringUnit.data.MeasuringUnit[0].measuring_unit_name
                                    // );
                                    res.data[i].Measuring_Unit =
                                        MeasuringUnit.data.MeasuringUnit[0].measuring_unit_name;
                                    this.setState({
                                        data: [...res.data]
                                    });
                                } else {
                                    res.data[i].Measuring_Unit = "problem loading Measuring Unit";
                                    // this.setState({
                                    //     data: [temp]
                                    // });
                                }
                            });
                        //end
                        axios
                            .post("/raw-material", {
                                _id: res.data[i].Raw_Material_Id
                                //_id: res.data[i].Product_ID
                            })
                            .then(MaterialId => {
                                //console.log(MaterialId);
                                if (MaterialId.data.RawMaterial[0]) {
                                    // console.log(MaterialId.data.RawMaterial[0].raw_material_name);
                                    res.data[i].Raw_Material_Id =
                                        MaterialId.data.RawMaterial[0].raw_material_name;
                                    this.setState({
                                        data: [...res.data]
                                    });
                                } else {
                                    res.data[i].Raw_Material_Id = "problem loading";
                                    // this.setState({
                                    //     data: [temp]
                                    // });
                                }
                            });
                        //end
                        if (res.data[i].Vendor !== "") {
                            axios
                                .post("/vendors", {
                                    _id: res.data[i].Vendor
                                })
                                .then(VendorName => {
                                    // console.log('Vendor: ', VendorName);
                                    if (VendorName.data.Vendor[0]) {
                                        //  console.log(VendorName.data.Vendor[0].vendor_name);
                                        res.data[i].Vendor = VendorName.data.Vendor[0].vendor_name;
                                        this.setState({
                                            data: [...res.data]
                                        });
                                    } else {
                                        res.data[i].Vendor = "problem loading";
                                        this.setState({
                                            data: [...res.data]
                                        });
                                    }
                                });
                        }
                        console.log(temp)
                        //end
                        // if (res.data[i].Comments != "") {
                        //   axios
                        //     .post('/logs', {
                        //       _id: res.data[i].Comments
                        //     })
                        //     .then(comments => {
                        //       console.log('Comments: ', comments);
                        //       res.data[i].Comments = comments.data[0].Comments;
                        //       res.data[i].From = comments.data[0].Address.From;
                        //       res.data[i].To = comments.data[0].Address.To;
                        //       this.setState({
                        //         data: [...res.data]
                        //       });
                        //     }).catch(err => console.log(err))
                        // }
                    }
                }

            });
        };
    }
    componentDidMount() {
        this.handleClose();
    }
    render() {
        return (
            <Box
                width="85%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                height="100vh"
            >
                <Box fontSize="30px" mb={3} fontWeight="bold">
                    Request Details
        </Box>
                <MaterialTable
                    title=" "
                    columns={this.state.columns}
                    data={this.state.data}
                    style={{
                        width: "100%",
                        overflow: "auto",
                        alignItems: "left",
                        whiteSpace: 'break-spaces'
                    }}
                    options={{
                        sorting: true,
                        headerStyle: {
                            backgroundColor: "#3f51b5",
                            color: "#FFF",
                            fontSize: "medium",
                            fontWeight: "bold"
                        }
                    }}
                    actions={[
                        {
                            icon: "edit",
                            tooltip: "Edit User",
                            onClick: (event, rowData) => {
                                if (rowData.Status === 'ForwardedToFinance') {
                                    this.setState({
                                        logComments: rowData.Comments,
                                        from: rowData.From,
                                        to: rowData.To,
                                        uploadFile: 'flex',
                                        fieldDisabled: {
                                            quantity: false,
                                            unit: false,
                                            vendor: true,
                                            amount: true,
                                            status: false,
                                            comment: false,
                                            btnDisplay: 'flex',
                                            btnText: 'Cancel'
                                        }
                                    })
                                    this.OnEditHandler(event, rowData);
                                }
                                else {
                                    this.setState({ alert: true })
                                }
                            }
                        }
                    ]}
                    onRowClick={(event, rowData) => {
                        this.setState({
                            logComments: rowData.Comments,
                            from: rowData.From,
                            to: rowData.To,
                            uploadFile: 'none',
                            fieldDisabled: {
                                quantity: true,
                                unit: true,
                                vendor: true,
                                amount: true,
                                status: true,
                                comment: true,
                                btnDisplay: 'none',
                                btnText: 'Close'
                            }
                        })
                        this.OnEditHandler(event, rowData);
                    }}
                />
                <Dialog open={this.state.openEdit} maxWidth="md" fullWidth>
                    <DialogContent>
                        <EditPurchase
                            disabled={this.state.fieldDisabled}
                            dept='Finance'
                            uploadFile='none'
                            From={this.state.from}
                            To={this.state.to}
                            logComments={this.state.logComments}
                            Finance={this.EditData}
                            cancel={() => {
                                this.setState({
                                    openEdit: false
                                });
                                this.handleClose();
                            }}
                        />
                    </DialogContent>
                </Dialog>
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
            </Box>
        );
    }
}
