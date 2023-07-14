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
import * as httpReq from "../httpReq";



const ProfilePage = () => {

    const {usrProf } = useContext(KawayContext); 
    const [profileData, setProfileData] = usrProf;
    const [dashboards, setDashboards] = useState([]);
    const [delRet, setDelRet] = useState();

    let uid = profileData.userData.uid;
    let email = profileData.userData.email;
    let tkn = profileData.userData.stsTokenManager.accessToken;

  // Sample data for the user profile
  let userProfile = {
    name: profileData.userData.displayName,
    imageSrc: profileData.userData.photoURL,
    dashboardItems: [{name:'My nasdaq data',modDate:'10-2-23'}, {name:'My Saved dashboard',modDate:'02-02-23'}, {name:'My Saved Dashboard for viewing later',modDate:'10-12-21'}],
  };

  const handleLogout = () => {
    // Handle logout logic here
    // e.g., redirect to login page or clear session data
    userProfile.imageSrc = null;
    userProfile.name = null;
    userProfile = null;
    profileData.logoutFunction();
    console.log('in profile handlelogout');
  };

  let getDashboardsUrl = constants.SERVER_BASEURL+"/users/"+email+"/dashboards"+"?uid="+uid+"&userToken="+tkn;

  useEffect(() => {
    httpReq.sendHttpReq(
      null,
      getDashboardsUrl,
      "GET",		
      null,
      setDashboards
    );
  },[]);

  const deleteDashBd = (dashBdName) => {
      console.log(dashBdName);
      let deleteDashboardsUrl = constants.SERVER_BASEURL+"/users/"+email+"/"+dashBdName+"?uid="+uid+"&userToken="+tkn;     
      httpReq.sendHttpReq(
        null,
        deleteDashboardsUrl,
        "DELETE",		
        null,
        setDelRet
      );     
  }

  useEffect(() => {
    if(delRet){
        console.log('profile delRet '+JSON.stringify(delRet));        
        if(delRet && delRet==constants.SUCCESS){
          console.log('calling dashbrd list again');        
          httpReq.sendHttpReq(
            null,
            getDashboardsUrl,
            "GET",		
            null,
            setDashboards
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

        <List>
        {dashboards.map((item, index) => (
          <ListItem key={index} style={{display:'flex', justifyContent:'center', cursor: 'pointer' }}>    
            <Link >
                {item.name}
            </Link>        
            <Link style={{margin:'0px 10px 0px 10px' }} color="secondary.dark" onClick={() => { deleteDashBd(item.name) }} >
                    Delete
            </Link>
          </ListItem>
        ))}
      </List>
    
    </div>
  );
};

export default ProfilePage;