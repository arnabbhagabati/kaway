import axios from "axios";
import * as constants from '../constants';


export const sendHttpReq = function (existingData,url, method, payload,setPData) {

        let data = null;
        let error = null;
        let loaded = false;

        const controllerRef = new AbortController();
        const cancel = () => {
            controllerRef.current.abort();
        };        

        if(existingData != null && typeof existingData.data != "undefined" && existingData.data != null){
            data = existingData.data;     
            loaded =true;     
            //console.log('sendHttpReq data '+existingData);
        }else{
  
          (async () => {
            //console.log('sendHttpReq data trying call now');
            try {
              const response = await axios.request({
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                  },
                data: payload,               
                method,
                url,
              });
              //console.log('sendHttpReq data'+response.data);
              data = response.data;
              setPData(data);
            } catch (error) {
                error=error.message;
                setPData(constants.REQ_FAILED);
            } finally {
                
            }
          })();
        }
  
  
    //console.log('req data sent is '+data);
    //setHttpOP({cancel:cancel,"data":data,"error":error,loaded:loaded});
    return {cancel:cancel,"data":data,"error":error,loaded:loaded};
}