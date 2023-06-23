import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as constants from '../../constants';
import styles from './multi-btn.css'

const Button = styled.button`
  /* Same as above */
`;
const ButtonToggle = styled(Button)`
  opacity: 0.4;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `};
  border:none;
  color:black;
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['1W', '2W', '1M' ,'6M','1Y','5Y','All'];

export default function ToggleGroup(props) {
  //console.log('props in mult is '+JSON.stringify(props));
  const [active, setActive] = useState(types[0]);

  useEffect(()=>{
    //console.log('multi change effect');
    switch(props.graphDur){
      case 7:
        setActive('1W');
        break;
      case 14:
        setActive('2W');
        break;
      case 30:
        setActive('1M');
        break;
      case 180:
        setActive('6M');
        break;
      case 365:
        setActive('1Y');
        break;
      case 1825:
        setActive('5Y');
        break;
      case 9999999:
        setActive('All');
        break;          
    }
    //console.log('multi change effect active is now '+active);
  },[props.graphDur])

  const setDur = (type) => {    
    props.setGraphSelFlag(false);
    setActive(type);
    switch(type){
      case '1W':
        props.setGraphDur(7);
        break;
      case '2W':
        props.setGraphDur(14);
        break;
      case '1M':
        props.setGraphDur(30);
        break;
      case '6M':
        props.setGraphDur(180);
        break;
      case '1Y':
        props.setGraphDur(365);
        break;
      case '5Y':
        props.setGraphDur(1825);
        break;
      case 'All':
        props.setGraphDur(9999999);
        break;          
    }
    props.setGraphSelFlag(true);
    //console.log('multi grap sel flag 2');
 }


  return (
    <ButtonGroup>
      {types.map(type => (
        <ButtonToggle 
          key={type}
          active={active === type}
          onClick={() => setDur(type)}
          className="button-style"
        >
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
  );
}