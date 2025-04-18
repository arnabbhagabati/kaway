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
  const [selectedSecs, setSelectedSecs] = selectedSec;  
  const [selectedExs, setSelectedExs] = selEx; 
  
  const [secOptions,setSecOptions] = useState([]);
  

  const exchngs =[];

  useEffect(() => {

    const allSecs = []; 
    allAvlblSecs.forEach(  (secs,index) =>{

      selectedExs.forEach((ex,index) => {
        exchngs.push(ex);
      });

      for (var key in secs) {
          if (secs.hasOwnProperty(key)) {
              //console.log(key + " -> " + JSON.stringify(secs[key]));
              if(exchngs.includes(key)){
                for (var i = 0; i < secs[key].length; i++) {
                  allSecs.push(secs[key][i]);              
                }    
              }        
          }
      }

      allSecs.sort((sec1,sec2)=> sec1.id.localeCompare(sec2.id));
    });
   
    setSecOptions(allSecs);
    
  }, [selectedExs]); 


  //console.log('secOptions in select secs out'+JSON.stringify(secOptions));
  //console.log('selected secs in seclect-sec'+JSON.stringify(selectedSecs));

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 200,
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
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={boxProps.tag} placeholder={boxProps.placeHolder} />
      )}
      onChange={(event, newValue) => {

        setSelectedSecs(newValue);

        newValue.forEach(function(sec,index){
            if(sec.type == "INDEX_ALL"){
              
              setSelectedSecs(current =>
                current.filter(secr => {            
                  return (secr.key !== sec.key);
                }),
              ); 
              
              let selectedSecsMap =  selectedSecs.reduce(function(map, obj) {
                map[obj.id] = obj;
                return map;
              }, {});
              
              let allSecMap = {};

              allAvlblSecs.forEach(  (secs,index) =>{   

                selectedExs.forEach((ex,index) => {
                  exchngs.push(ex);
                });
                
                for (var key in secs) {
                    if (secs.hasOwnProperty(key)) {                        
                        if(exchngs.includes(key)){
                           let tmpAllSecMap = secs[key].reduce(function(map, obj) {
                            const secKey = obj.exchange+"_"+obj.id;
                            map[secKey] = obj;
                            return map;
                          }, {});

                          allSecMap = { ...allSecMap, ...tmpAllSecMap };
                        
                        }        
                    }
                }
              });

              sec.constituents.forEach(function(secId,index){  
                const key = sec.exchange+"_"+secId;               
                if(!selectedSecsMap.hasOwnProperty(key) || selectedSecsMap[key] == null){
                  const thisSec = allSecMap[key];
                  if(thisSec){
                    setSelectedSecs(current => [...current, thisSec]);
                  }
                }
              });

            }
        });        
        
      }}
    />
    </div>
  );
}