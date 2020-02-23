import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import useStyles from '../Purchase_Request/PurchaseFormstyles';
import { Button, Typography, Fab } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ProtectedRoute from '../../../Auth/ProtectedRoute'
import { Link as RefLink } from 'react-router-dom'
const Upload = (props) => {
   const classes = useStyles();
   const [state, setState] = useState({
      fileList: [],
      inputDisable: false,
      btnStyle: {
         display: ''
      },
      Icons: {
         display: 'none'
      },
      deleteIcon: {
         display: 'none'
      },
      xtraFile: 'no'
   });

   useEffect(() => {
      if (props.action === 'Edit' && props.url.length !== 0) {
         setState(state => ({
            ...state,
            fileList: props.url,
            inputDisable: true,
            btnStyle: {
               display: 'none'
            },
            Icons: {
               display: props.icon
            }
         }))
         console.log('Uploading...')
      }
   }, [props.action, props.url])

   let addfile = [];
   const addFile = (event) => {
      addfile = state.fileList;
      let inputFile = event.target.value;
      let fileName = inputFile.substring(12);
      addfile.push(fileName);
      setState({
         fileList: addfile,
         inputDisable: true,
         btnStyle: {
            display: 'none',
         },
         Icons: {
            display: 'flex'
         }
      });
      if (addfile.length === 0) {
         setState({
            btnStyle: {
               display: ''
            }
         });
      }
      console.log('File Added...' + state.fileList);
   };
   const xtraFile = () => {
      addfile = state.fileList;
      setState({
         fileList: addfile,
         inputDisable: false,
         btnStyle: {
            display: 'none'
         },
         Icons: {
            display: 'flex'
         }
      });
   };
   let fileInput = (
      <input
         style={{ display: 'none' }}
         accept='image/*, application/pdf'
         id='#file'
         multiple
         type='file'
         disabled={state.inputDisable}
         onChange={(event) => { addFile(event) }}

      />
   );
   const deleteFile = () => {
      addfile = state.fileList;
      addfile.pop();
      setState({
         fileList: addfile,
         inputDisable: false,
         btnStyle: {
            display: 'none'
         },
         Icons: {
            display: 'flex'
         }
      });
      if (addfile.length === 0) {
         setState({
            fileList: addfile,
            inputDisable: false,
            btnStyle: {
               display: ''
            },
            Icons: {
               display: 'none'
            }
         });
      }
      console.log('File Deleted...' + state.fileList);
      props.setDocUrl(state.fileList);
   };

   const link = () => {
      try {
         var store = [];
         state.fileList.map((file, index) => {
            var tempFile = require(`../../../../file storage/${file}`);
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
   return (
      <Box display='flex' onChange={props.setDocUrl(state.fileList)} width='100%'>
         <Box>
            {fileInput}
            <label htmlFor='#file'>
               <Button
                  style={state.btnStyle}
                  variant='contained'
                  component='span'
                  color='default'
                  id='upload-btn'
                  startIcon={<CloudUploadIcon />}
               >
                  Upload Quotation Document
               </Button>
            </label>
         </Box>
         <Box pt={1} pl={1}>
            {link()}
         </Box>
         <Box style={state.Icons}>
            <Box className={classes.iconBtn}>
               <Fab color='secondary' size='small' onClick={deleteFile}>
                  <DeleteIcon />
               </Fab>
            </Box>
            <Box className={classes.iconBtn}>
               <label htmlFor='#file'>
                  <Fab
                     component='span'
                     color='secondary'
                     size='small'
                     onClick={xtraFile}
                  >
                     <AddIcon />
                  </Fab>
               </label>
            </Box>
         </Box>
      </Box>
   );
};

export default Upload;
