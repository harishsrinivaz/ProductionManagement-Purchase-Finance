import React, { useState, Component } from 'react';
import { Box, TextField, Button, Paper } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBoxTwoTone';
import LockIcon from '@material-ui/icons/LockTwoTone';
import { Link } from 'react-router-dom';

class Login extends Component {
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
                        id='pswd'
                        size='small'
                        fullWidth
                        variant='outlined'
                        label='Password'
                        type='password'
                        required
                     ></TextField>
                  </Box>
                  <Box pb={3} pt={1}>
                     <Link to='/management' style={{ textDecoration: 'none' }} >
                        <Button
                           color='primary'
                           variant='contained'
                           type='submit'
                           size='large'
                           style={{ fontWeight: 'bold' }}
                        >
                           Login
                        </Button>
                     </Link>
                  </Box>
               </Box>
            </Paper>
         </Box>
      );
   }
};

export default Login;
