import React from 'react';
import AppBarBase from  '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {makeStyles} from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid'


const useStyles = makeStyles(
 (theme) => (
  console.log(theme),
  {
   menuButton: {
    marginLeft: 'auto',
   },
   listItem: {
    textAlign: 'left',
   
    backgroundColor:'rgba(0,0,0,.03)',
   

   },
   drawerPaper: {
    marginTop: theme.mixins.toolbar.minHeight,
   },
   drawerModal: {
    zIndex: theme.zIndex.appBar,
   },
  }
 )
);

const FullList = () => {
 const classes = useStyles();
 return (
  <List style={{width:'100%'}}>
   <ListItem className={classes.listItem}>
    <ListItemText>Home</ListItemText>
   </ListItem>
   <ListItem className={classes.listItem}>
    <ListItemText>Page 1</ListItemText>
   </ListItem>
   <ListItem className={classes.listItem}>
    <ListItemText>Page 2</ListItemText>
   </ListItem>
   <ListItem className={classes.listItem}>
    <ListItemText>About</ListItemText>
   </ListItem>
  </List>
 );
};

export default function AppBar({children}) {
 const classes = useStyles();

 const [isOpen, setState] = React.useState(true);

 const toggleDrawer = (open) => (event) => {
  setState(open);
 };

 return (
  <React.Fragment>
   <Grid className={classes.root}>
    <AppBarBase position="relative" className={classes.appBar}>
     <Toolbar>
      <Typography variant="h6" color="inherit">
       Title
      </Typography>
      <IconButton color="inherit" aria-label="Open drawer" className={classes.menuButton} onClick={toggleDrawer(!isOpen)}>
       <MenuIcon />
      </IconButton>
     </Toolbar>
    </AppBarBase>
    {/* <Drawer
    variant="temporary"
    anchor="left"
    open={isOpen}
    onClose={toggleDrawer(false)}
    classes={{
     paper: classes.drawerPaper,
     modal: classes.drawerModal,
    }}
   > */}

    {/* </Drawer> */}
    <Grid container spacing={2}>
     <Grid item xs={1.5} style={{backgroundColor:'rgba(0,0,0,.03)',height:'70vh'}}>
      <FullList />
     </Grid>
     <Grid item xs={9}>
      {children}
     </Grid>
     <Grid item xs={1.5} className={classes.listItem}></Grid>
    </Grid>
   </Grid>
  </React.Fragment>
 );
}
