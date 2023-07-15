import Toolbar from '@mui/material/Toolbar';
import SelectExchange from '../select-exchange/select-exchange'
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


function GetData(exchanges,sec_list,setSecs,setExSelectState){       
    
    const secMap = [];
    let loadedCnt = 0;
    //const exchanges= Constants.EXCHANGES_LIST;

    exchanges.forEach(function (exchange,index){
        let url = Constants.SERVER_BASEURL+"/secList/"+exchange.title;

        const httpData = UseHttpReq( null,url,"GET");
      
        if (httpData.loaded){
             const secs = httpData.data;
             const secCodeArr = [];  
             //console.log('secs is '+JSON.stringify(secs));
            
            if(Array.isArray(secs) && secs.length>0){
                secs.forEach(function(sec,index){                
                    secCodeArr.push({ key : exchange.title+"_"+sec.code,
                                     "code" : sec.code,
                                     "id" :  sec.id ,
                                     exchange : exchange.title,
                                     type : sec.type,
                                     constituents : sec.constituents,
                                     displayName : sec.name,
                                     displayId : exchange.code+" "+sec.displayName});     
                                            
                });
            
                secMap.push({
                    [exchange.title] : secCodeArr
                });
            }
             loadedCnt++;
        }

    });

    useEffect(() => {
        if(loadedCnt>0){
            //console.log('secCodeArr arnn'+JSON.stringify(secMap));
            setSecs(secMap);
        }      

         //Todo : Fix this - we should wait for all http calls to complete (Promise.all?)
         if(loadedCnt==5){
            setExSelectState("EX")
         }

    }, [loadedCnt]); 

}


export default function PageOptions() {   
    const exchanges = Constants.EXCHANGES_LIST;
    const [sec_list,setSecs]=useState([]);
    const [exSelectState, setExSelectState] = useState("Loading...");

    GetData(exchanges,sec_list,setSecs,setExSelectState);
    const {duration, allAvlSec, selEx,selectedSec,durChangedFlag,candleChart } = useContext(KawayContext);
    const [allAvlblSecs, setAllAvlblSecs] = allAvlSec;    
    setAllAvlblSecs(sec_list);   
    //console.log('selectedExs in pageoptions'+JSON.stringify(selectedExs));

    //console.log('sec_list here is '+JSON.stringify(sec_list));     

    return (
        <Toolbar className="page-options-toolbar">            
                <SelectExchange tag={exSelectState} options={exchanges} placeHolder="Exchanges" sx={{ mr: 30 }}> </SelectExchange>     
                <SelectSec tag="Stock" options={exchanges} placeHolder="Type To Search"> </SelectSec>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                <SaveDashboard></SaveDashboard>
                <div style={{margin: '0 20px'}}><SelectGraphStyle className="select-graph-style"  ></SelectGraphStyle></div>
                <SelectDur> </SelectDur>                
        </Toolbar >
    );
    

   
}