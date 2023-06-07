import Toolbar from '@mui/material/Toolbar';
import MultiSelect from '../multi-select-drop/multi-select-drop'
import React, { useState, setState,  useEffect} from 'react';
import "./page-options-bar.css";
import * as Constants from '../../constants';
import UseHttpReq from "../../http/request";



function GetData(exchanges,sec_list,setSecs){       
    
    const secMap = [];
    let loadedCnt = 0;

    exchanges.forEach(function (exchange,index){
        let url = Constants.SERVER_BASEURL+"/secList/"+exchange;
        const httpData  = UseHttpReq(
            url,
            "GET",		
        );	    

        if (httpData.loaded){
             const secs = httpData.data;
             const secCodeArr = [];  
             //console.log('secs is'+JSON.stringify(secs));
                 
            secs.forEach(function(sec,index){                
                secCodeArr.push({"name" : exchange+" "+sec.id,
                                  "id" :  sec.code });     
                                        
             });
           
             secMap.push({
                [exchange] : secCodeArr
             });
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

    console.log('sec_list here is '+JSON.stringify(sec_list));

    return (
        <Toolbar className="page-options-toolbar">
            <MultiSelect tag="EX" options={exchanges}> </MultiSelect>            
        </Toolbar >
    );
    

   
}