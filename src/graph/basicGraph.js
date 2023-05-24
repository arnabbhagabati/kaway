import useHttpReq from "../http/request";

function KGraph() {

    const httpData  = useHttpReq(
		"https://jsonplaceholder.typicode.com/comments",
		"GET",
		{
		  message: "Hello World",
		}
	  );

	console.log('arnabdata221 is '+ httpData.data);  
	const stringifiedData = JSON.stringify(httpData.data || {});
	console.log('stringifiedData is '+stringifiedData);

    if (httpData.loaded) {	
		return httpData.error ? (
		  <span>Error: {httpData.error}</span>
		) : (
		  <p>{stringifiedData}</p>
		);
	  }
	
	return <span>Loading...</span>;
  }
  
  export default KGraph;