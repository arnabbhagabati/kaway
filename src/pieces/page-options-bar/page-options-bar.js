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
import Typography from '@mui/material/Typography';


function GetData(exchanges,sec_list,setSecs){       
    
    const secMap = [];
    let loadedCnt = 0;

    exchanges.forEach(function (exchange,index){
        let url = Constants.SERVER_BASEURL+"/secList/"+exchange.title;
        const httpData  = UseHttpReq(
            url,
            "GET",		
        );	    

        if (httpData.loaded){
             const secs = httpData.data;
             const secCodeArr = [];  
             //console.log('secs is '+JSON.stringify(secs));
            
            if(Array.isArray(secs) && secs.length>0){
                secs.forEach(function(sec,index){                
                    secCodeArr.push({"code" : sec.code,
                                     "id" :  sec.id ,
                                     "exchange" : exchange.title,
                                     "displayId" : exchange.title+" "+sec.id});     
                                            
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

    }, [loadedCnt]); 

}


export default function PageOptions() {   
    const exchanges = Constants.EXCHANGES_LIST;
    const [sec_list,setSecs]=useState([]);

    GetData(exchanges,sec_list,setSecs);
    const { duration, allAvlSec, selEx,selectedSec } = useContext(KawayContext);
    const [allAvlblSecs, setAllAvlblSecs] = allAvlSec;    
    setAllAvlblSecs(sec_list);   
    const [selectedExs, setSelectedExs] = selEx;  
    console.log('selectedExs in pageoptions'+JSON.stringify(selectedExs));

    //console.log('sec_list here is '+JSON.stringify(sec_list));     

    return (
        <Toolbar className="page-options-toolbar">            
                <SelectExchange tag="EX" options={exchanges} placeHolder="Exchanges" sx={{ mr: 30 }}> </SelectExchange>     
                <SelectSec tag="Stock" options={exchanges} placeHolder="Stocks"> </SelectSec>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                <SelectDur> </SelectDur>
        </Toolbar >
    );
    

   
}