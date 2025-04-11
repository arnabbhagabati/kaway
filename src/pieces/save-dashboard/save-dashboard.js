import React from 'react';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { KawayContext } from '../../kawayContext';
import { useContext, useState,useEffect } from 'react';
import * as constants from '../../constants';
import * as httpReq from "../../http/httpReq";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

const SaveButton = () => {

  const {selectedSec,usrProf} = useContext(KawayContext); 
  const [selectedSecs, setSelectedSecs] = selectedSec;  
  const [profileData, setProfileData] = usrProf;
  const [pData, setPData] = useState(false);
  const [opnSaveDialog, setOpenSaveDialog] = useState(false);
  const [opnMsgDialog, setOpenMsgDialog] = useState(false);
  const [msgDialogText, setMsgDialogText] = useState("");

  const [dashBoardName, setDashBoardName] = useState("");


  let uid = profileData.userData.uid;
  let email = profileData.userData.email;
  let tkn = "";//profileData.userData.stsTokenManager.accessToken;

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      tkn = await getIdToken(user);
    }
  });

  const openSaveDialog = () => {
    if(uid && email){
      setOpenSaveDialog(true);    
    }else{
      setMsgDialogText(" You can save your selection as a dashboard here. Please log in by clicking on profile icon to save dashboards");
      setOpenMsgDialog(true);
    }  
  }

  const closeSaveDialog = () => {
    setOpenSaveDialog(false);
  }

  const handleMsgDialogClose = () => {
    setOpenMsgDialog(false);
  }

  //handleMsgDialogClose
  
  const HandleSave = () => {

    var pattern =  /^[A-Za-z0-9_]*$/;
    if ( dashBoardName && dashBoardName.length > 2 && pattern.test(dashBoardName)) {

      let payld = {
        name:dashBoardName,
        securityList : selectedSecs
        }
      // Logic to save data
      
      let url = constants.SERVER_BASEURL+"/users/"+email+"/dashboard"+"?uid="+uid;
  
      setPData(null);
      //console.log('SaveButton '+url);
      let httpData  = httpReq.sendHttpReq(
        null,
        url,
        "POST",		
        payld,
        setPData,
        tkn
      );	
  
      setOpenSaveDialog(false);
     
    } else{
      setMsgDialogText("Dashboard name can have only alphabets,numbers and underscores and needs to have at least 2 characters");
      setOpenMsgDialog(true);
      return false;
    }

    
  };


  useEffect(() => {
    if(pData){
        //console.log('SaveButton pData '+JSON.stringify(pData));        
        setMsgDialogText(pData);
        setOpenMsgDialog(true);
    }   
  }, [pData]); 


  return (
    <div>
      <IconButton 
        variant="outlined"
        size="large"
        onClick={openSaveDialog}
        sx={{      
          borderRadius: 0        
        }}    
      >
        <SaveIcon fontSize="large" />
      </IconButton >
      <Dialog open={opnSaveDialog} onClose={closeSaveDialog}>
      <DialogTitle>Save Dashboard</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can save your selection as a dashboard here. 
          Once saved, you can access your dashboards from profile section
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Dashboard Name"
          fullWidth
          variant="standard"
          onChange={(event) => {
            setDashBoardName(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeSaveDialog}>Cancel</Button>
        <Button onClick={HandleSave}>Save</Button>
      </DialogActions>
    </Dialog>
    <Dialog
        open={opnMsgDialog}      
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"      >
        <DialogTitle id="alert-dialog-title">
          {"Save Dashboard"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msgDialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>        
          <Button onClick={handleMsgDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
   </div>
  );
};

export default SaveButton;