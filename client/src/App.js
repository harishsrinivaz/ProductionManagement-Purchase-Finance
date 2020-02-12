import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Management from './Components/Management/Management';
import { Box } from '@material-ui/core';

class App extends Component {
   render() {
      return (
         <Box>
            < Router >
               <Route exact path='/' component={Login} />
               <Route path='/management' component={Management} />
            </Router >
         </Box >
      );
   }
}

export default App;
