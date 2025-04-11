import Toolbar from '@mui/material/Toolbar';
import SelectExchange from '../select-exchange/select-exchange'
import FilterSecurity from '../filter-sec/filter-sec'
import SelectSec from '../select-sec/select-sec'
import React, { useState, useEffect} from 'react';
import "./page-options-bar.css";
import * as Constants from '../../constants';
import UseHttpReq from "../../http/request";
import { useContext } from 'react';
import { KawayContext } from '../../kawayContext';
import SelectDur from '../select-duration/select-duration'
import SelectGraphStyle from '../graph-style-toggle/graph-style-toggle'
import Typography from '@mui/material/Typography';
import SaveDashboard from '../save-dashboard/save-dashboard';


function GetData(exchanges,setSecs,setExSelectState){       
    
    const secMap = [];
    let loadedCnt = 0;
    
    exchanges.forEach(function (exchange,index){
        let url = Constants.SERVER_BASEURL+"/secList/"+exchange;

        const httpData = UseHttpReq( null,url,"GET");
      
        if (httpData.loaded){
             const secs = httpData.data;          
                secMap.push({
                    [exchange] : secs
                });            
            loadedCnt++;
        }
    });

    useEffect(() => {
        if(loadedCnt>0){
            //console.log('secCodeArr arnn'+JSON.stringify(secMap));
            setSecs(secMap);
        }      

         //Todo : Fix this - we should wait for all http calls to complete (Promise.all?)
         if(loadedCnt==1){
            setExSelectState("EX")
         }
    }, [loadedCnt]); 

}


export default function PageOptions() {   
    const exchanges = Constants.EXCHANGES_LIST;
    const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart,apiData,usrProf,selectedFilter} = useContext(KawayContext);
    //const [sec_list,setSecs]=useState([]);
    const [allAvlblSecs, setAllAvlblSecs] = allAvlSec;    
    const [exSelectState, setExSelectState] = useState("Loading...");    

    GetData(exchanges,setAllAvlblSecs,setExSelectState);

    return (
        <Toolbar className="page-options-toolbar">            
                <SelectExchange tag={exSelectState} options={exchanges} placeHolder="Exchanges" sx={{ mr: 30 }}> </SelectExchange>     
                <SelectSec tag="Stock" options={exchanges} placeHolder="Type To Search"> </SelectSec>
                <FilterSecurity placeHolder="Filters" sx={{ mr: 30 }}> </FilterSecurity>     
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                <SaveDashboard></SaveDashboard>
                <div style={{margin: '0 20px'}}><SelectGraphStyle className="select-graph-style"  ></SelectGraphStyle></div>
                <SelectDur> </SelectDur>                
        </Toolbar >
    );
    

   
}