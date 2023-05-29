import "../style.css";

import useHttpReq from "../http/request";
import * as constants from '../constants';
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef,useMemo } from 'react';

export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();	

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addLineSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div>			
			<div
				ref={chartContainerRef}
			/>	
		</div>
			
	);
};


export default function App(props) {
	//console.log('1 props is '+ JSON.stringify(props));  

	let url = constants.SERVER_BASEURL+"/histData/"+props.exchange+"/"+props.secId+"?stDate=1995-05-12&endDate=2005-05-12";
	
	const httpData  = useHttpReq(
		url,
		"GET",		
	  );

    if (httpData.loaded) {	
		return httpData.error ? (
		  <span>Error: {httpData.error}</span>
		) : (
			<div>				
				<ChartComponent {...props} data={httpData.data}></ChartComponent>
			</div>
		);
	  }

	return (
		<div>
			<p>Loading..</p>			
		</div>		
	);
}