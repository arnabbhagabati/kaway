import axios from "axios";
import { useState,useEffect, useRef } from 'react';

const useHttpReq = (url, method, payload) => {
    const [data, setData] = useState("test_arn");
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const controllerRef = useRef(new AbortController());
    const cancel = () => {
      controllerRef.current.abort();
    };
  
    useEffect(() => {
      (async () => {
        try {
          const response = await axios.request({
            data: payload,
            signal: controllerRef.current.signal,
            method,
            url,
          });
          //console.log(response.data);
          setData(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoaded(true);
        }
      })();
    }, []);
  
    //console.log('req data sent is '+data);
    return {cancel:cancel,"data":data,"error":error,loaded:loaded};
  };

  export default useHttpReq;