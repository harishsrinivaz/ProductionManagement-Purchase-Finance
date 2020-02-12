import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import useStyles from '../Purchase_Request/PurchaseFormstyles';
import { Button, Typography, Fab } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
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
               display: 'flex'
            }
         }))
         console.log('Uploading...')
      }
   }, [props.action, props.url])

   let addfile = [];
   const addFile = () => {
      addfile = state.fileList;
      let inputFile = '';
      inputFile = document.getElementById('#file').value;
      let fileName = inputFile.substring(12) + " ";
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
         accept='/*'
         id='#file'
         multiple
         type='file'
         disabled={state.inputDisable}
         onChange={addFile}
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
      props.setDocUrl(state.fileList);
   };

   return (
      <Box display='flex' onChange={props.setDocUrl(state.fileList)}>
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
            {state.fileList.map((files, index) => (
               <Typography key={index} fontSize='1vw'>{files}</Typography>
            ))}
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
