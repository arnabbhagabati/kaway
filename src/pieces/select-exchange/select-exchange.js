import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useContext } from 'react';
import { KawayContext } from '../../kawayContext';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SeletExchanges(boxProps) {

  const drpDwnOptions = boxProps.options;  
  const tag = boxProps.tag;

  //console.log('boxProps.options is'+JSON.stringify(boxProps.options));
  //const [count] = useCount()

  const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart } = useContext(KawayContext);
  const [selectedExs, setSelectedExs] = selEx;  

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
      options={drpDwnOptions}      
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
      style={{ width: 250 }}
      renderInput={(params) => (
        <TextField {...params} label={boxProps.tag} placeholder={boxProps.placeHolder} />
      )}
      onChange={(event, newValue) => {
        setSelectedExs(newValue);
      }}
    />
    </div>
  );
}