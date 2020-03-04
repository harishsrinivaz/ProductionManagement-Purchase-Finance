import React, { Component } from 'react';
import Styles from "./styles/FormStyles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Datepick } from "./Date/Datepick";
import ProtectedRoute from '../../Auth/ProtectedRoute'
import { Link as RefLink } from 'react-router-dom'
import {
    Box,
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import axios from 'axios';

const styles = Styles;
const style = {
    marginRight: "6px",
    marginLeft: "6px"
};

class Add_Purchase_Stock extends Component {
    constructor(props) {
        super();
        this.state = {
            quantity: 0,
            measuring_units: [],
            munit: '',
            vendors: [],
            vendor: '',
            invoice_amount: 0,
            invoice_date: null,
            invoice_document_url: [],
            file: []
        }
        this.loadStatus = () => {
            let status = [
                'ForwardedToFinance',
                'Purchase-Accepted',
                'Purchase-Rejected',
                'Purchase-Inprogress',
                'Purchase-Completed',
                'ForwardedToProduction'
            ];
            return (
                status.map((msg, index) => (
                    <MenuItem key={index} value={msg} >{msg}</MenuItem>
                )))
        }
        this.loadFile = () => {
            var temp = [];
            this.props.Purchase.Quotation_Document_URL.map((file, index) => {
                try {
                    require(`../../../file storage/${file}`)
                    temp.push(<Box key={index}>
                        <RefLink
                            to='document'
                            target='_blank'
                            onClick={(event) => {
                                event.preventDefault();
                                window.open(require(`../../../file storage/${file}`));
                            }}
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            {file}
                        </RefLink>
                        <ProtectedRoute
                            path='document'
                            component={require(`../../../file storage/${file}`)}
                        />
                    </Box>)
                }
                catch (err) {
                    //console.log('called')
                    return temp.push('File not found')
                }
            })
            return temp
        }

    }


    componentDidMount() {
        axios.get("/measuring-unit/measuring-units").then(res => {
            this.setState({
                measuring_units: [...res.data.MeasuringUnits]
            });
        });
        axios.get("/vendors").then(res => {
            this.setState({
                vendors: [...res.data.Vendors]
            });
        });
    }
    render() {
        return (
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Box fontSize="30px" mb={3} fontWeight="bold">
                    Add to Stock
                </Box>
                <Box style={styles.boxSize2}>
                    <Box width="100%" style={style}>
                        <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            label="Quantity"
                            required
                            value={this.state.quantity}
                            onChange={(event) => {
                                this.setState({
                                    quantity: event.target.value
                                })
                            }}
                        ></TextField>
                    </Box>
                    <Box width="100%" style={style}>
                        <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            size="small"
                        >
                            <InputLabel
                                style={{
                                    backgroundColor: "white",
                                    paddingLeft: "2px",
                                    paddingRight: "2px"
                                }}
                            >
                                Measuring Unit
                        </InputLabel>
                            <Select
                                name="Measuring_Unit"
                                variant="outlined"
                                value={this.state.munit}
                                onChange={(event) => {
                                    this.setState({
                                        munit: event.target.value
                                    })
                                }}
                                required
                            >
                                {this.state.measuring_units.map(
                                    (measuring_unit, index) => {
                                        return (
                                            <MenuItem
                                                selected
                                                key={index}
                                                value={measuring_unit._id}
                                            >
                                                {measuring_unit.measuring_unit_name}
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box style={styles.boxSize2}>
                    <Box width="100%" style={style}>
                        <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            size="small"
                        >
                            <InputLabel
                                style={{
                                    backgroundColor: "white",
                                    paddingLeft: "2px",
                                    paddingRight: "2px"
                                }}
                            >
                                Vendor Name
                        </InputLabel>
                            <Select
                                variant="outlined"
                                required
                                value={this.state.vendor}
                                onChange={(event) => {
                                    this.setState({
                                        vendor: event.target.value
                                    })
                                }}
                            >
                                {this.state.vendors.map((vendor, index) => {
                                    return (
                                        <MenuItem
                                            //selected
                                            key={index}
                                            value={vendor._id}
                                        >
                                            {vendor.vendor_name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box width="100%" style={style}>
                        <TextField
                            size='small'
                            rowsMax="3"
                            variant="outlined"
                            fullWidth
                            label="Invoice Amount"
                            value={this.state.invoice_amount}
                            onChange={(event) => {
                                this.setState({
                                    invoice_amount: event.target.value
                                })
                            }}
                        ></TextField>
                    </Box>
                </Box>
                <Box style={styles.boxSize2}>
                    <Box width="100%" style={style}>
                        <Datepick
                            disabled={false}
                            id="4"
                            variant="outlined"
                            Name="Due_Date"
                            value={this.state.Due_Date}
                            setDate={date => {
                                this.setState({
                                    invoice_date: date
                                });
                                console.log(date);
                            }}
                        />
                    </Box>
                    <Box width="100%" style={style}>
                        <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            size="small"
                        >
                            <InputLabel
                                style={{
                                    backgroundColor: "white",
                                    paddingLeft: "2px",
                                    paddingRight: "2px"
                                }}
                            >
                                Status
                        </InputLabel>
                            <Select
                                variant="outlined"
                                required
                                name="Status"
                            >
                                {this.loadStatus()}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box style={styles.boxSize2}>
                    <Box
                        width='100%'
                        display={this.props.uploadFile}
                        display='flex'
                    >
                        <input
                            style={{ display: 'none' }}
                            id="#file"
                            type='file'
                            multiple='multiple'
                            onChange={(event) => {
                                this.setState({
                                    file: event.target.files
                                })
                            }}
                        />
                        <label htmlFor='#file'>
                            <Button
                                style={{ display: this.props.uploadFile, marginLeft: '10px' }}
                                variant='contained'
                                component='span'
                                color='default'
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Invoice Document
                            </Button>
                        </label>

                        <Box
                            display={
                                this.props.Purchase.Quotation_Document_URL.length > 0
                                    ? 'flex'
                                    : 'none'
                            }
                            marginLeft="10px"
                            alignSelf='center'
                        >
                            {this.loadFile()}
                        </Box>
                    </Box>
                </Box>
                <Box
                    pt={2}
                    pb={2}
                    m={0}
                    display="flex"
                    justifyContent='flex-end'
                    width='87%'
                >
                    <Box display='flex'>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fontWeight="Bold"
                            onClick={() => {
                                this.props.closeDialog();
                            }}
                            style={{ fontWeight: 'bold' }}
                        >
                            Cancel
                        </Button>
                    </Box>

                    <Box marginLeft='10px' >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fontWeight="bold"
                            onClick={this.props.closeDialog}
                            style={{ fontWeight: 'bold' }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default Add_Purchase_Stock;