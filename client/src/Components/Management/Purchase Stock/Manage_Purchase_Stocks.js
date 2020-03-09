import React, { Component } from "react";
import MaterialTable from "material-table";
import { Box, Button, DialogContent } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";

export default class ManageProductStock extends Component {
  constructor(props) {
    super();
    this.EditData = {};
    this.state = {
      columns: [
        { title: "Material Code", field: "Raw_Material_Code" },
        { title: "Material Name", field: "Raw_Material_Id" },
        { title: "Quantity", field: "Total_Quantity" },
        { title: "Measuring Unit", field: "Measuring_Unit" }
      ],
      data: [],
      materialList: [],
      unitList: []
    };

    this.getMaterialName = (id) => {
      let temp = id;
      this.state.materialList.map(material => {
        if (material._id === id) {
          temp = material.raw_material_name;
        }
      })
      return temp;
    }

    this.getUnit = (id) => {
      let temp = id;
      this.state.unitList.map(unit => {
        if (unit._id === id) {
          temp = unit.measuring_unit_name;
        }
      })
      return temp;
    }

    this.callDetails = () => {

      axios.get('/raw-material').then(res => {
        this.setState({
          materialList: [...res.data.RawMaterials]
        })
      }).catch(err => {
        console.log('cannot get materialList', err)
      })

      axios.get('/measuring-unit').then(res => {
        this.setState({
          unitList: [...res.data.MeasuringUnits]
        })
      }).catch(err => {
        console.log('cannot get unitList', err)
      })

      axios.get('/request-details').then(res => {
        let temp = [];
        console.log('Details: ', res.data)
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Status === "Purchase-Completed") {
            console.log(res.data[i].Status)
            res.data[i].Raw_Material_Id = this.getMaterialName(res.data[i].Raw_Material_Id);
            res.data[i].Measuring_Unit = this.getUnit(res.data[i].Measuring_Unit)
            console.log('rm: ', res.data[i].Raw_Material_Id)
            temp.push(res.data[i]);
          }
        }
        this.setState({
          data: temp
        })
      })
    }

  }
  componentDidMount() {
    this.callDetails();
  }
  render() {
    return (
      <Box
        width="80%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <Box fontSize="30px" mb={8} fontWeight="bold ">
          Manage Product Stock
        </Box>
        {/* <Box display="flex" alignSelf="start">
          <Button
            variant="contained"
            color="primary"
            style={{
              marginBottom: "20px",
              display: "flex",
              marginRight: "10px"
            }}
            size="large"
            onClick={() => {
              this.setState({
                openAdd: true
              });
            }}
          >
            Add
          </Button>
        </Box> */}

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
        />
      </Box>
    );
  }
}
