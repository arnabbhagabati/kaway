import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import UseHttpReq from "../../http/request";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useContext } from 'react';
import { KawayContext } from '../../kawayContext';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as Constants from '../../constants';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;


export default function SelectFilter(boxProps) {

  const drpDwnOptions = boxProps.options;  
  const tag = boxProps.tag;

  const filterOps = Constants.FILTER_OPTIONS;

  const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart,apiData,usrProf,selectedFilter } = useContext(KawayContext);
  const [selectedFil, setSelectedFil] = selectedFilter; 


  const handleChange = (event) => {
    setSelectedFil(event.target.value);
  };

  function filterSecs(){
    let url = Constants.SERVER_BASEURL+"/secList/";

    const filteredSecList = UseHttpReq( null,url,"GET");
  }

  return (
    <div>
     <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedFil}
        label="Filter"
        onChange={handleChange}
        style={{ width: 200 }}
    >
        <MenuItem value='ALL'>ALL</MenuItem>
        <MenuItem value='STABLE_6_MON'>STABLE_6_MON</MenuItem>
        <MenuItem value='STABLE_1_YR'>STABLE_1_YR</MenuItem>
    </Select>
    </div>
  );
}