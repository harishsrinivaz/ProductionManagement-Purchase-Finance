import React, { Component } from 'react';
import Styles from "./styles/FormStyles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Datepick } from "./Date/Datepick";
import ProtectedRoute from '../../Auth/ProtectedRoute'
import { Link as RefLink } from 'react-router-dom'
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
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
            invoice_quantity: null,
            unitList: [],
            munit: '',
            vendors: [],
            vendor: '',
            invoice_amount: null,
            invoice_date: null,
            invoice_document_url: [],
            status: '',
            file: [],
            Id: [{ id: "" }],
            a_id: '',
            idType: null
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

        this.showFile = () => {
            let temp = [];
            for (let i = 0; i < this.state.file.length; i++) {
                temp.push(
                    <Box key={i}>
                        {this.state.file[i].name}
                    </Box>
                )
            }
            return temp
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

        this.onSubmit = () => {
            if (isNaN(this.state.invoice_quantity) || this.state.invoice_quantity === null || isNaN(this.state.invoice_amount)
                || this.state.invoice_amount === null || this.state.munit === "" || this.state.invoice_date === null
                || this.state.file.length === 0 || this.state.status === ""
            ) {
                alert('Some fields contain invalid value!')
            }
            else {
                const formData = new FormData();
                for (let i = 0; i < this.state.file.length; i++) {
                    formData.append('file', this.state.file[i]);
                }
                axios.post('/files', formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }).then(file => {
                    axios.post('/request-details/invoice', {
                        _id: this.props.Purchase._id,
                        Invoice_Quantity: this.state.invoice_quantity,
                        Invoice_Measuring_Unit: this.state.munit,
                        Invoice_Amount: this.state.invoice_amount,
                        Invoice_Date: this.state.invoice_date,
                        Invoice_Document: file.data,
                        Id_Type: this.state.Id_Type,
                        Id: this.state.Id,
                        Status: this.state.status
                    }).then(res => {
                        axios.post('/purchase-stocks/add', {
                            Purchase_Id: this.props.Purchase._id,
                            Measuring_Unit: this.props.Purchase.Measuring_Unit,
                            Total_Quantity: res.data
                        }).then(res => {
                            console.log(res);
                            this.props.closeDialog();
                        }).catch(err => {
                            console.log('Stock not added', err)
                        })
                    }).catch(err => {
                        console.log('Invoice not added', err);
                    })
                }).catch(err => {
                    console.log('File not added', err)
                })

                //this.props.closeDialog()
            }
        }
    }

    componentDidMount() {
        axios.get("/measuring-unit").then(res => {
            this.setState({
                unitList: [...res.data.MeasuringUnits]
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
                            label="Invoice_Quantity"
                            required
                            value={this.state.invoice_quantity}
                            onChange={event => {
                                this.setState({
                                    invoice_quantity: event.target.value
                                });
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
                                    paddingRight: "2px",
                                }}
                            >
                                Measuring Unit
                        </InputLabel>
                            <Select
                                name="Measuring_Unit"
                                variant="outlined"
                                required
                                value={this.state.munit}
                                onChange={event => {
                                    this.setState({
                                        munit: event.target.value
                                    });
                                    console.log(event.target.value);
                                }}
                            >
                                {this.state.unitList.map(
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
                        <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            label="Invoice_Amount"
                            required
                            value={this.state.invoice_amount}
                            onChange={event => {
                                this.setState({
                                    invoice_amount: event.target.value
                                });
                            }}
                        ></TextField>
                    </Box>
                    <Box width="100%" style={style}>
                        <Datepick
                            disabled={false}
                            id="4"
                            variant="outlined"
                            Name="Invoice_Date"
                            value={this.state.invoice_date}
                            setDate={date => {
                                this.setState({
                                    invoice_date: date
                                });
                                console.log(date);
                            }}
                        />
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
                                Status
                        </InputLabel>
                            <Select
                                variant="outlined"
                                required
                                value={this.state.status}
                                onChange={(event) => {
                                    this.setState({
                                        status: event.target.value
                                    })
                                }}
                            >
                                {this.loadStatus()}
                            </Select>
                        </FormControl>
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
                                    paddingRight: "2px",
                                }}
                            >
                                Id Type
                            </InputLabel>

                            <Select
                                variant="outlined"
                                required
                                value={this.state.idType}
                                onChange={event => {
                                    this.setState({
                                        idType: event.target.value
                                    });
                                }}
                            >
                                <MenuItem value='Box'>Box</MenuItem>
                                <MenuItem value='Individual'>Individual</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box style={styles.boxSize2}>
                    <Box
                        width="100%"
                        style={style}
                        display='flex'
                        flexWrap='wrap'
                        flexDirection='row'
                    >
                        {this.state.Id.map((poc, index) => {
                            return (
                                <Box
                                    display="flex"
                                    alignItems='center'
                                    width='100%'
                                >
                                    <TextField
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        label="Id"
                                        required
                                        value={this.state.Id[index].id}
                                        onChange={event => {
                                            this.setState({
                                                a_id: event.target.value
                                            });
                                            console.log(event.target.value);
                                            this.setState(prevState => {
                                                prevState.Id[index].id = prevState.a_id;
                                            });
                                        }}
                                    ></TextField>

                                    {this.state.Id.length === index + 1 ? (
                                        <AddBoxOutlinedIcon
                                            color="secondary"
                                            style={{
                                                display: 'flex',
                                            }}
                                            onClick={() => {
                                                this.setState({});
                                                this.setState(prevState => {
                                                    prevState.Id.push({
                                                        id: ""
                                                    });
                                                    console.log(prevState.Id);
                                                });
                                            }}
                                        />
                                    ) : (
                                            <DeleteOutlineIcon
                                                color="secondary"
                                                style={{
                                                    display: 'flex',
                                                }}
                                                onClick={() => {
                                                    this.setState({});
                                                    this.setState(prevState => {
                                                        prevState.Id.splice(index, 1);
                                                        console.log(prevState.Id);
                                                    });
                                                }}
                                            />
                                        )}
                                </Box>
                            );
                        }).reverse()}
                    </Box>
                </Box>
                <Box style={styles.boxSize2}>
                    <Box
                        display={this.props.uploadFile}
                        display='flex'
                        flexDirection='column'
                    >
                        <input
                            style={{ display: 'none' }}
                            id="#file2"
                            type='file'
                            multiple='multiple'
                            onChange={(event) => {
                                let temp = event.target.files;
                                this.setState({
                                    file: temp
                                })
                                console.log('temp: ', temp)
                            }}
                        />
                        <label htmlFor='#file2'>
                            <Button
                                style={{ marginLeft: '10px' }}
                                variant='contained'
                                component='span'
                                color='default'
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Invoice
                            </Button>
                        </label>
                        <Box style={{ marginLeft: '10px', paddingTop: '5px' }}>
                            {this.showFile()}
                        </Box>
                        <Box
                            display={
                                this.state.invoice_document_url.length > 0
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
                            onClick={this.onSubmit}
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