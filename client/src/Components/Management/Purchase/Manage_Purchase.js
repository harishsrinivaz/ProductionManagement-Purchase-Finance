import React, { Component } from "react";
import MaterialTable from "material-table";
import { Box, DialogContent, Snackbar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import EditPurchase from "./Edit_Purchase";
import Alert from "@material-ui/lab/Alert";

export default class ManagePurchase extends Component {
  constructor(props) {
    super();
    this.EditData = {};
    this.state = {
      columns: [
        // { title: "Material ID", field: "Raw_Material_Id" },
        { title: "Material Name", field: "Raw_Material_Id" },
        { title: "Quantity", field: "Quantity" },
        { title: "Measuring Unit", field: "Measuring_Unit" },
        { title: "Vendor", field: "Vendor" },
        { title: "Total Price", field: "Total_Price" },
        //{ title: "Priority", field: "Priority" },
        { title: "Status", field: "Status" },
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
        btnText: 'Close'
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
          console.log(res.data[0]);
          this.EditData = { ...res.data[0] };
          console.log(this.EditData);
          this.setState({
            openEdit: true
          });
        });
    };
    this.handleClose = () => {
      axios.get("/request-details").then(res => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].id = i + 1;
          //Axios
          axios
            .post("/measuring-unit/measuring-unit", {
              _id: res.data[i].Measuring_Unit
            })
            .then(MeasuringUnit => {
              console.log(MeasuringUnit);
              if (MeasuringUnit.data.MeasuringUnit[0]) {
                console.log(
                  MeasuringUnit.data.MeasuringUnit[0].measuring_unit_name
                );
                res.data[i].Measuring_Unit =
                  MeasuringUnit.data.MeasuringUnit[0].measuring_unit_name;
                this.setState({
                  data: [...res.data]
                });
              } else {
                res.data[i].Measuring_Unit = "problem loading Measuring Unit";
                this.setState({
                  data: [...res.data]
                });
              }
            });
          //end
          //Axios
          axios
            .post("/raw-material", {
              _id: res.data[i].Raw_Material_Id
              //_id: res.data[i].Product_ID
            })
            .then(MaterialId => {
              console.log(MaterialId);
              if (MaterialId.data.RawMaterial[0]) {
                console.log(MaterialId.data.RawMaterial[0].raw_material_name);
                res.data[i].Raw_Material_Id =
                  MaterialId.data.RawMaterial[0].raw_material_name;
                this.setState({
                  data: [...res.data]
                });
              } else {
                res.data[i].Raw_Material_Id = "problem loading";
                this.setState({
                  data: [...res.data]
                });
              }
            });
          //end
          //Axios
          if (res.data[i].Vendor != "") {
            axios
              .post("/vendors", {
                _id: res.data[i].Vendor
              })
              .then(VendorName => {
                console.log('Vendor: ', VendorName);
                if (VendorName.data.Vendor[0]) {
                  console.log(VendorName.data.Vendor[0].vendor_name);
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
          //end
          if (res.data[i].Comments != "") {
            axios
              .post('/logs', {
                _id: res.data[i].Comments
              })
              .then(comments => {
                console.log('Comments: ', comments);
                res.data[i].Comments = comments.data[0].Comments;
                this.setState({
                  data: [...res.data]
                });
              }).catch(err => console.log(err))
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
          style={{ width: "100%", overflow: "auto", alignItems: "left" }}
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
                if (rowData.Status === 'Requesting') {
                  this.setState({
                    logComments: rowData.Comments,
                    fieldDisabled: {
                      quantity: false,
                      unit: false,
                      vendor: false,
                      amount: false,
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
              dept='Purchase'
              logComments={this.state.logComments}
              Purchase={this.EditData}
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
