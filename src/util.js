import axios from "axios";

export const addToMap = (key, value, mapData,setMapData,) => {
    const newMap = new Map(mapData);
    newMap.set(key, value);
    setMapData(newMap);
  };

  // Remove a key-value pair from the map
  export const removeFromMap = (key,mapData,setMapData) => {
    const newMap = new Map(mapData);
    newMap.delete(key);
    setMapData(newMap);
  };

