import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
   bodybox: {
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#eee',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
   },

   loginbox: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: 'Black',
      display: 'flex',
      marginBottom: '2vw',
      marginTop: '0vw'
   },

   textfieldbox: {
      width: '20vw',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
   },

   submitbox: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1vw',
      marginBottom: '1vw',
      fontWeight: 'bold'
   },

   link: {
      textDecoration: 'none'
   }
});

export default useStyles;
