import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { KawayContext } from '../../kawayContext';
import { useContext } from 'react';
import { useEffect, useRef,useState,useMemo } from 'react';

export default function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);

  const [secsList, setSecsList] = React.useState([]);
  const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart } = useContext(KawayContext);
  const [selectedSecs, setSelectedSecs] = selectedSec;  

  useEffect(()=>{
    let selSecs = [];
    selectedSecs.forEach((sec) =>{
        const newSec = {
            key : sec.key,
             "exchange" : sec.exchange,
             "id" : sec.id,
             "code" : sec.code,
            "displayId" : sec.displayId
        }
        selSecs.push(newSec);
    });
    setSecsList(selSecs);
    console.log('secsList in selected-list '+JSON.stringify(secsList));
  },[selectedSecs]);

  const handleToggle = (value) => () => {
    console.log('value in selected-list handleToggle'+JSON.stringify(value));   

         setSelectedSecs(current =>
            current.filter(sec => {            
              return (sec.key !== value.key);
            }),
         ); 
          
        console.log('selectedSecs after delete in selected-list '+JSON.stringify(selectedSecs));
    
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 200, bgcolor: 'none' }}>
      {secsList.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        //console.log('value in selected-list '+JSON.stringify(value));
        //console.log('secsList1 is '+JSON.stringify(secsList));
        return (
          <ListItem
            key={value.key}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={true}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>            
              <ListItemText id={labelId} primary={value.displayId} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
