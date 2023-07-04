import axios from "axios";
import { useState,useEffect, useRef } from 'react';

export default function useHttpReq(url, method, payload) {
    
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      if (!data) {
        // Make API call and update state
        axios.get(url)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    }, [data]);
    return data;
  };
