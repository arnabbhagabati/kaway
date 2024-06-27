import * as React from 'react';
import { useState, useEffect} from 'react';
import { useContext } from 'react';
import { KawayContext } from '../../kawayContext';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as Constants from '../../constants';
import * as httpReq from "../../http/httpReq";


export default function FilterSecurity() {

  const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart,apiData,usrProf,selectedFilter } = useContext(KawayContext);
  const [selectedFil, setSelectedFil] = selectedFilter; 
  const [selectedSecs, setSelectedSecs] = selectedSec;  
  const [filteredSecs, setFilteredSecs] = useState([]);  
  let tkn = "";//profileData.userData.stsTokenManager.accessToken;

  const handleChange = (event) => {
    console.log('handleChange ...');
    setSelectedFil(event.target.value);
    
    let url = Constants.SERVER_BASEURL+"/filter?filterType="+selectedFil;
    console.log('tmaking apiCall');

    let httpData  = httpReq.sendHttpReq(
      null,
      url,
      "POST",		
      selectedSecs,
      setFilteredSecs,
      tkn
    );	

    console.log("data from api call "+filteredSecs);
  };

  useEffect(() => {
    if(filteredSecs){
        console.log('filteredSecs is '+JSON.stringify(filteredSecs));    
        if(filteredSecs){
          setSelectedSecs(filteredSecs);
        }
           
    }   
  }, [filteredSecs]); 

  
  return (
    <div>
     <Select
        labelId="selectedFil"
        id="selectedFil"
        value={selectedFil}
        label="Filter"
        onChange={handleChange}
        style={{ width: 200 }}
    >
        <MenuItem value='ALL'>ALL</MenuItem>
        <MenuItem value='STABLE_6_MON'>STABLE_6_MON_2</MenuItem>
        <MenuItem value='STABLE_1_YR'>STABLE_1_YR</MenuItem>
    </Select>
    </div>
  );
}