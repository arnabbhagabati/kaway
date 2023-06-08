import Toolbar from '@mui/material/Toolbar';
import SelectExchange from '../select-exchange/select-exchange'
import React, { useState, setState,  useEffect} from 'react';
import "./page-options-bar.css";
import * as Constants from '../../constants';
import UseHttpReq from "../../http/request";
import { useContext } from 'react';
import { KawayContext } from '../../kawayContext';


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
             console.log('secs is '+JSON.stringify(secs));
            
            if(Array.isArray(secs) && secs.length>0){
                secs.forEach(function(sec,index){                
                    secCodeArr.push({"title" : exchange.title+" "+sec.id,
                                    "id" :  sec.code });     
                                            
                });
            
                secMap.push({
                    [exchange.title] : secCodeArr
                });
            }
             loadedCnt++;
        }

        //console.log('rest call no '+index);
        //console.log('secCodeArr is'+JSON.stringify(secCodeArr));
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
    const { kawayText, allAvlSec, selEx,selectedSec } = useContext(KawayContext);
    const [allAvlblSecs, setAllAvlblSecs] = allAvlSec;    
    setAllAvlblSecs(sec_list);    

    console.log('sec_list here is '+JSON.stringify(sec_list));     

    return (
        <Toolbar className="page-options-toolbar">            
                <SelectExchange tag="EX" options={exchanges} placeHolder="Exchanges"> </SelectExchange>     
        </Toolbar >
    );
    

   
}