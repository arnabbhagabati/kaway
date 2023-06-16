import axios from "axios";
import { useState,useEffect, useRef } from 'react';

export default function useHttpReq(url, method, payload) {
    
    const [data, setData] = useState("test_arn");
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    //const [httpOp,setHttpOP] = useState({data,error,loaded});

    const controllerRef = useRef(new AbortController());
    const cancel = () => {
      controllerRef.current.abort();
    };
  
    useEffect(() => {
      (async () => {
        try {
          const response = await axios.request({
            headers: {
                "Access-Control-Allow-Origin": "*"
              },
            data: payload,
            signal: controllerRef.current.signal,
            method,
            url,
          });
          //console.log('useHttpReq data'+response.data);
          setData(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoaded(true);
        }
      })();
    }, [url,method,payload]);
  
    //console.log('req data sent is '+data);
    //setHttpOP({cancel:cancel,"data":data,"error":error,loaded:loaded});
    return {cancel:cancel,"data":data,"error":error,loaded:loaded};
  };
