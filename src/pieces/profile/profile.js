import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@material-ui/styles';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image'

import Link from '@mui/material/Link';

import { getAuth, signOut } from "firebase/auth";

import { KawayContext } from '../../kawayContext';
import { useContext, useState,useEffect } from 'react';
import * as constants from '../../constants';
import * as httpReq from "../../http/httpReq";



const ProfilePage = () => {

    const {usrProf,selectedSec,selEx,allAvlSec } = useContext(KawayContext); 
    const [profileData, setProfileData] = usrProf;
    const [dashboards, setDashboards] = useState([]);
    const [delRet, setDelRet] = useState();
    const [selectedSecs, setSelectedSecs] = selectedSec;  
    const [selectedExs, setSelectedExs] = selEx; 
    const [allAvlblSecs, setAllAvlblSecs] = allAvlSec; 

    const [dashBoardsAvl, setDashBoardsAvl] = useState(false);

    let uid = profileData.userData.uid;
    let email = profileData.userData.email;
    let tkn = "" //profileData.userData.stsTokenManager.accessToken;   // commented out for local

  // Sample data for the user profile
  let userProfile = {
    name: profileData.userData.displayName,
    imageSrc: profileData.userData.photoURL    
  };

  const handleLogout = () => {
    // Handle logout logic here
    // e.g., redirect to login page or clear session data
    userProfile.imageSrc = null;
    userProfile.name = null;
    userProfile = null;
    profileData.logoutFunction();
    //console.log('in profile handlelogout');
  };

  let getDashboardsUrl = constants.SERVER_BASEURL+"/users/"+email+"/dashboards"+"?uid="+uid;

  useEffect(() => {
    httpReq.sendHttpReq(
      null,
      getDashboardsUrl,
      "GET",		
      null,
      setDashboards,
      tkn
    );
  },[]);

  useEffect(() => {
    if(dashboards){
      setDashBoardsAvl(true);
    }else{
      setDashBoardsAvl(false);
    }
  },[dashboards]);

  const deleteDashBd = (dashBdName) => {
      //console.log(dashBdName);
      let deleteDashboardsUrl = constants.SERVER_BASEURL+"/users/"+email+"/"+dashBdName+"?uid="+uid;     
      httpReq.sendHttpReq(
        null,
        deleteDashboardsUrl,
        "DELETE",		
        null,
        setDelRet,
        tkn
      );     
  }

  const loadDashboard = (dashboard) => {    
    //let exchanges = [];
    let exchangesObjs = [];
    const exchanges = constants.EXCHANGES_LIST;
    let dasboardSecKeys = [];
    dashboard.securityList.forEach((sec) => {
            let key = sec.code+"_"+sec.id+"_"+sec.exchange;
            dasboardSecKeys.push(key);
            exchanges.forEach((inBltExch) => {
                if(inBltExch === sec.exchange){
                  if(!exchangesObjs.includes(inBltExch)){
                    exchangesObjs.push(inBltExch);
                  }                  
                }
            });            
    });
    setSelectedExs(exchangesObjs);
    //console.log('profile before pushing data  selectedExs '+JSON.stringify(selectedExs));

    const exchngs =[];
    const selSecs = [];

    allAvlblSecs.forEach(  (secs,index) =>{
      exchangesObjs.forEach((ex,index) => {        
        exchngs.push(ex);
      });
      for (var key in secs) {
          if (secs.hasOwnProperty(key)) {
              //console.log('profile loggin secs '+key + " -> " + JSON.stringify(secs[key]));
              //console.log('pushing data  exchngs '+JSON.stringify(exchngs));
              if(exchngs.includes(key)){
                for (var i = 0; i < secs[key].length; i++) {
                  let secHere = secs[key][i];
                  let dbKey = secHere.code+"_"+secHere.id+"_"+secHere.exchange;
                  //console.log('pushing data  dbKey '+dbKey);
                  if(dasboardSecKeys.includes(dbKey)){
                    //console.log('pushing data to selsecs '+JSON.stringify(secHere));
                    selSecs.push(secHere); 
                  }
                               
                }    
              }        
          }
      }
    });

   /* exchanges.forEach((exchng) =>{
      exchangesObjs.push({
          title: exchng,
          code : exchng
        });
    });*/

    //console.log('profile loading dashboard '+JSON.stringify(dashboard));
    //console.log('profile loading exchangesObjs '+JSON.stringify(exchangesObjs));
    //console.log('profile loading selSecs '+JSON.stringify(selSecs));
    setSelectedSecs(selSecs);    
    console.log('profile loading selectedSecs '+JSON.stringify(selectedSecs));
    //console.log('profile loading selectedExs '+JSON.stringify(selectedExs));
    profileData.goToHm();
  }

  useEffect(() => {
    if(delRet){
        //console.log('profile delRet '+JSON.stringify(delRet));        
        if(delRet && delRet==constants.SUCCESS){
          //console.log('calling dashbrd list again');        
          httpReq.sendHttpReq(
            null,
            getDashboardsUrl,
            "GET",		
            null,
            setDashboards,
            tkn
          );
        }
    }   
  }, [delRet]);


  return (
    <div style={{ textAlign: 'center', margin:"50px 10px" }}>
      <img src={userProfile.imageSrc} alt="Profile" style={{ maxWidth: '200px' }} />
      <Typography
        component="h3"
        variant="h4"
        color="primary">
        {userProfile.name}
      </Typography>

        <Button color="primary" varant="contained" onClick={handleLogout}>Logout</Button>

        <Typography
            component="h3"
            variant="h4"
            color="primary.dark"
            style={{ textAlign: 'center', margin:"100px 10px 20px 10px" }}>
            Saved Dashboards 
        </Typography>

        {!dashBoardsAvl &&
           <Typography
           component="h3"
           variant="h6"
           color="primary.dark"
           style={{ textAlign: 'center', margin:"100px 10px 20px 10px" }}>
            Loading your dashboards...
          </Typography>

        }

        {dashBoardsAvl &&
        <List>
        {dashboards.map((item, index) => (
          <ListItem key={index} style={{display:'flex', justifyContent:'center', cursor: 'pointer' }}>    
            <Link onClick={() => { loadDashboard(item) }}>
                {item.name}
            </Link>        
            <Link style={{margin:'0px 10px 0px 10px' }} color="secondary.dark" onClick={() => { deleteDashBd(item.name) }} >
                    Delete
            </Link>
          </ListItem>
        ))}
      </List>
       }
    </div>
  );
};

export default ProfilePage;