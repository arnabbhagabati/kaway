import React from 'react';

//import { Grid } from '@material-ui/core';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import { KawayContext } from '../../kawayContext';
import { useContext, useState,useEffect } from 'react';

export default function ToggleButtonSizes() {
  const [candleStick, setCandleStick] = React.useState("false");

  const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart } = useContext(KawayContext);
  const [candleCh, setCandleCh] = candleChart;

  const handleChange = (event, newAlignment) => {
    setCandleStick(newAlignment);
    if(newAlignment == "false"){
      setCandleCh(false);
    }else{
      setCandleCh(true);
    }
  };

  return (
   
        <ToggleButtonGroup size="large" value={candleStick} exclusive onChange={handleChange}>
          <ToggleButton value="false">
            <ShowChartIcon fontSize="medium" />
          </ToggleButton>
          <ToggleButton value="true">
            <CandlestickChartIcon fontSize="medium" />
          </ToggleButton>
        </ToggleButtonGroup>
     
  );
}
