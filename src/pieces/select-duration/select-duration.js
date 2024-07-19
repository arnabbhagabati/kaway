
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { KawayContext } from '../../kawayContext';

export default function SeletDuration(props) {    

    const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart } = useContext(KawayContext);
    const [ctxDur, setCtxDur] = duration;    
    const [durChgFlag, setDurChgFlag] = durChangedFlag;
    const [localDuration, setLocalDuration] = React.useState(365);
    setCtxDur(localDuration);

    const handleChange = (event) => {
        setLocalDuration(event.target.value);
        setCtxDur(event.target.value);
        setDurChgFlag(true);
    };

    return (
        <FormControl style={{minWidth: 120}}>
        
        <Select
            labelId="select-dur-label"
            id="select-dur-id"
            value={localDuration}
            label=""
            onChange={handleChange}
        >
            <MenuItem value={7}>1 Week</MenuItem>
            <MenuItem value={14}>2 Weeks</MenuItem>
            <MenuItem value={30}>1 Month</MenuItem>
            <MenuItem value={90}>3 Months</MenuItem>
            <MenuItem value={180}>6 Months</MenuItem>
            <MenuItem value={365}>1 year</MenuItem>
            <MenuItem value={1825}>5 Years</MenuItem>
            <MenuItem value={9999999}>All</MenuItem>
        </Select>
        </FormControl>
    )

}