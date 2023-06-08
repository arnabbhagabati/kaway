
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
 
  const { kawayText, allAvlSec, selEx,selectedSec } = useContext(KawayContext);
  const [allAvlblSecs, setAllAvlblSecs] = allAvlSec;    
  //console.log('allSecs allAvlblSecs in multi dropdown'+JSON.stringify(allAvlblSecs));

  
  const [secOptions,setSecOptions] = useState([]);
  
  let currCount = 0;

  useEffect(() => {

    const allSecs = [];
    let cnt = 0;
    allAvlblSecs.forEach(  (secs,index) =>{
      for (var key in secs) {
          if (secs.hasOwnProperty(key)) {
              //console.log(key + " -> " + JSON.stringify(secs[key]));
              for (var i = 0; i < secs[key].length; i++) {
                allSecs.push(secs[key][i]);              
              } 

           
          }
      }
    });
   
    setSecOptions(allSecs);
    //exchanges.forEach(function (exchange,index){


    //});


   /* if(allAvlblSecs.length>currCount){
        //console.log('secCodeArr arnn'+JSON.stringify(secMap));
        allAvlblSecs.forEach(  (secs,index) =>{
            for (var key in secs) {
                if (secs.hasOwnProperty(key)) {
                    console.log(key + " -> " + JSON.stringify(secs[key]));
                    setAllSecs([...allSecs, ...secs[key]]);
                }
            }
          });

      //setAllSecs([...allSecs, allAvlblSecs]);
    }
    currCount = allAvlblSecs.length;
    console.log('allSecs in select secs'+JSON.stringify(allSecs));*/
  }, [allAvlblSecs]); 


  /*allAvlblSecs.forEach((secs,index) =>{
      setAllSecs([...allSecs, secs]);
    }
  );*/

  console.log('secOptions in select secs out'+JSON.stringify(secOptions));

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 50,
  });
  const [disableCloseOnSelect,setDisableCloseOnSelect] = useState(true);
  const fixedOptions = [top100Films[6]];

  return (
    <div>
    <Autocomplete
      multiple
      id="select-sec"
      filterOptions={filterOptions}
      limitTags={3}
      options={secOptions}      
      renderTags={(tagValue, getTagProps) =>
       {
        const txt = tagValue.length+' Selected' ;
        return <Chip
            label={txt}   
            />
       }
      }     
      getOptionLabel={(option) => option.title}      
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 250, height:30 }}
      renderInput={(params) => (
        <TextField {...params} label={boxProps.tag} placeholder={boxProps.placeHolder} />
      )}
    />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];