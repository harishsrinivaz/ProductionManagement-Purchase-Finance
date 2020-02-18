import React, { Component } from 'react';
import { Box, TextField, Button, Paper } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBoxTwoTone';
import LockIcon from '@material-ui/icons/LockTwoTone';
import axios from 'axios';
import auth from '../Auth/auth';

class Login extends Component {
   componentDidMount() {
      auth.logout();
   }
   constructor(props) {
      super(props);
      this.state = {
         user_name: '',
         password: '',
         success: false,
         errors: []
      };
   }
   render() {
      return (
         <Box
            display='flex'
            flexDirection='column'
            width="100vw"
            height='100vh'
            alignItems='center'
            justifyContent='center'
            bgcolor='#eee'
         >
            <Paper elevation={2} style={{ width: '40vw' }}>
               <Box textAlign='center'><h1>Login</h1></Box>
               <Box
                  display='flex'
                  flexDirection="column"
                  alignItems='center'
               >
                  <Box
                     display='flex'
                     flexDirection='row'
                     alignItems='center'
                     width="55%"
                     pb={2}>
                     <AccountBoxIcon fontSize='large' />
                     <TextField
                        size='small'
                        fullWidth
                        variant='outlined'
                        label='Username'
                        required
                        onChange={event => {
                           this.setState({ user_name: event.target.value });
                        }}
                     ></TextField>
                  </Box>
                  <Box
                     display='flex'
                     flexDirection='row'
                     alignItems='center'
                     width='55%'
                     pb={2}
                  >
                     <LockIcon
                        fontSize='large'
                     />
                     <TextField
                        size='small'
                        fullWidth
                        variant='outlined'
                        label='Password'
                        type='password'
                        required
                        onChange={event => {
                           this.setState({ password: event.target.value });
                        }}
                     ></TextField>
                  </Box>
                  <Box pb={3} pt={1}>
                     <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        size='large'
                        style={{ fontWeight: 'bold' }}
                        onClick={() => {
                           axios
                              .post('/users/login', {
                                 name: this.state.user_name,
                                 password: this.state.password
                              })
                              .then(res => {
                                 if (res.data.name === this.state.user_name) {
                                    auth.login(
                                       res.data.name === this.state.user_name
                                    );
                                    console.log(res.data.role)
                                    axios
                                       .post('roles/role', {
                                          _id: res.data.role
                                       })
                                       .then(res => {
                                          let permissions = [];
                                          console.log(res.data);
                                          res.data.Role[0].permissions.map(
                                             permission => {
                                                permissions.push(permission.name);
                                                return null;
                                             }
                                          );
                                          sessionStorage.setItem(
                                             'permissions',
                                             JSON.stringify(permissions)
                                          );
                                          this.props.history.push('/management');
                                       })
                                       .catch(err => {
                                          console.log(err);
                                          this.setState({
                                             errors: [
                                                'Problem in user. Contact Administrator'
                                             ]
                                          });
                                       });
                                 } else {
                                    console.log(res.data.message);
                                    this.setState({
                                       errors: res.data.message
                                    });
                                 }
                              })
                              .catch(err => {
                                 this.setState({
                                    errors: ['Could not reach the server']
                                 });
                                 console.log(err);
                              });
                        }}
                     >
                        Login
                        </Button>
                  </Box>
               </Box>
               {this.state.errors.length > 0 ? (
                  this.state.errors.map((error, index) => {
                     return error != null ? (
                        <Box
                           key={index}
                           bgcolor='#f73067'
                           marginTop='10px'
                           padding='10px'
                           textAlign='center'
                        >
                           {error}
                        </Box>
                     ) : (
                           <Box key={index}></Box>
                        );
                  })
               ) : (
                     <Box></Box>
                  )}
            </Paper>
         </Box >
      );
   }
};

export default Login;
