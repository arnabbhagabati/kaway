import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useContext, useState, useEffect } from 'react';
import { KawayContext } from '../../kawayContext';
import * as Constants from '../../constants';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(boxProps) { 
 
  const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart } = useContext(KawayContext);
  const [allAvlblSecs, setAllAvlblSecs] = allAvlSec;    
  //console.log('allSecs allAvlblSecs in multi dropdown'+JSON.stringify(allAvlblSecs));
  const [selectedSecs, setSelectedSecs] = selectedSec;  
  const [selectedExs, setSelectedExs] = selEx; 
  
  const [secOptions,setSecOptions] = useState([]);
  
  let currCount = 0;

  useEffect(() => {

    const allSecs = [];
    let cnt = 0;
    allAvlblSecs.forEach(  (secs,index) =>{

      const exchngs =[]
      selectedExs.forEach((ex,index) => {
        exchngs.push(ex.title);
      });

      for (var key in secs) {
          if (secs.hasOwnProperty(key)) {
              console.log(key + " -> " + JSON.stringify(secs[key]));
              if(exchngs.includes(key)){
                for (var i = 0; i < secs[key].length; i++) {
                  allSecs.push(secs[key][i]);              
                }    
              }        
          }
      }
    });
   
    setSecOptions(allSecs);
    
  }, [selectedExs]); 


  //console.log('secOptions in select secs out'+JSON.stringify(secOptions));
  //console.log('selected secs in seclect-sec'+JSON.stringify(selectedSecs));

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 100,
  });

  return (
    <div>
    <Autocomplete
      multiple
      id="select-sec"
      filterOptions={filterOptions}
      limitTags={1}
      disableCloseOnSelect     
      options={secOptions}   
      value={selectedSecs}   
      renderTags={(tagValue, getTagProps) =>
       {
        const txt = tagValue.length+' Selected' ;
        return <Chip
            label={txt}   
            />
       }
      }     
      getOptionLabel={(option) => option.displayId}      
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.displayId}
        </li>
      )}
      style={{ width: 250 }}
      renderInput={(params) => (
        <TextField {...params} label={boxProps.tag} placeholder={boxProps.placeHolder} />
      )}
      onChange={(event, newValue) => {
        setSelectedSecs(newValue);
      }}
    />
    </div>
  );
}