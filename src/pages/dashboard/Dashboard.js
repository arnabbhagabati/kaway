import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';

import BasicGraph from "../../pieces/graph/basicGraph/basicGraph";
import CandleStickGraph from "../../pieces/graph/candleStickGraph/candleStickGraph";
import * as constants from '../../constants';
import PageOptions from "../../pieces/page-options-bar/page-options-bar";
import { KawayContext } from '../../kawayContext';
import { useContext, useState,useEffect } from 'react';
import SelectedSecList from "../../pieces/selected-list/selected-list";
import PersonIcon from '@mui/icons-material/Person';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import Profile from "../../pieces/profile/profile";
import Avatar from '@mui/material/Avatar';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


const kawayTheme = createTheme({
  palette: {
    primary: {
      main: '#00b3b3',
      dark: '#058e8e',
    },
    secondary: {
      main: '#adebeb',
    },
  },
});

const refreshPage = function(){
  window.location.reload();
}


export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  let secList = constants.STOCK_CODE_LIST;

  const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart,usrProf } = useContext(KawayContext); 
  const [selectedSecs, setSelectedSecs] = selectedSec;  
  const [ctxDuration, setCtxDuration] = duration; 
  const [candleCh, setCandleCh] = candleChart;
  const [profileData, setProfileData] = usrProf;

  const [viewProfile,setViewProfile] = useState(false);
  //const [viewGraohs,setViewGraphs] = useState(true);

  const [profileImageLnk, setProfileImageLnk] = useState('');
  const firebaseConfig = {
    apiKey: "AIzaSyCWmHX5ohUlbtiAZncTTXxMCv18zUjtVrU",
    authDomain: "bullcharts.org",
    projectId: "kaway-395713",
    storageBucket: "kaway-395713.appspot.com",
    messagingSenderId: "72334033928",
    appId: "1:72334033928:web:0d4548d698d946ad643dbd",
    measurementId: "G-FB3G9DS4EH"
  };
  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  const auth = getAuth();

  const loginAction = function(){
    if(profileData.loggedIn){
      setViewProfile(viewProfile ? false : true);
    }else{      
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          //console.log(JSON.stringify(user));
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          setProfileData({loggedIn:true,userData:user,logoutFunction:logoutFn,goToHm:goToHome});
          setProfileImageLnk(user.photoURL);
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  }
  const logoutFn = function(){
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('logged out');
      setViewProfile(false);
      setProfileData({loggedIn:false,userData:{},logoutFunction:logoutFn,goToHm:goToHome});
      setProfileImageLnk('');
    }).catch((error) => {
      // An error happened.
      setProfileData({loggedIn:false,userData:{},logoutFunction:logoutFn,goToHm:goToHome});
      alert('We encountered some problem while logging out.Please try again');
    });
  }

  const goToHome = function(){
    //console.log('selected secs in db'+selectedSecs);
    setViewProfile(false);
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={kawayTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
         
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h4"
              color="#c1f5f5"
              noWrap         
              fontFamily="Times New Roman"  
              className='appIcon'
              onClick={goToHome}  
            >
              Bullcharts
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="white"
              noWrap              
            >
              .org
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>           
            <IconButton color="inherit"  onClick={loginAction} >             
                <Avatar src={profileImageLnk}/>              
            </IconButton>
          </Toolbar>
        </AppBar>
     
        
        {/* Hiding toolbar for now
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
          */}

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
        <Toolbar />       
        {viewProfile &&
            <Profile></Profile>
        }
        {!viewProfile &&
          <div>
            <PageOptions></PageOptions>
            <div className='rowAXC'>          
              <div style={{ width:'90%'}}>
                { candleCh ? (selectedSecs.map((sec, index) => <CandleStickGraph security={sec}                                                          
                                                              key={index} />))
                        : (selectedSecs.map((sec, index) => <BasicGraph security={sec}                                                           
                                                                key={index} />))                                                        
                } 			
              </div>
              <SelectedSecList style={{ width:'10%'}}/>
            </div>
            <div className='disclaimer'> 
                  Data intended for historical trend analysis only. For queries,feedback or missing symbols please drop an email to admin@bullcharts.org             
            </div>
          </div>
        }
        </Box>
      </Box>
    </ThemeProvider>
  );
}
