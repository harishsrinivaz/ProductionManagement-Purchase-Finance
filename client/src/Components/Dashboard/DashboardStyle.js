import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
   boxOutProp: {
      color: '#',
      backgroundColor: grey[50],
      padding: 0,
      minWidth: '20vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      maxHeight: '100vh',
      overflow: 'auto'
   },

   boxInProp: {
      fontSize: '1.2 vw',
      color: 'white',
      textDecoration: 'none',
      '&:hover': {
         cursor: 'pointer',
         color: '#3f51b5',
         transition: 'all .2s',
         backgroundColor: grey[200]
      }
   },

   position: {
      display: 'flex',
      position: 'sticky',
      fontSize: '2.0vw',
      backgroundColor: '#3f51b5',
      color: 'white',
      padding: 20,
      top: 0,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      fontWeight: 'bold'
   }
}));
