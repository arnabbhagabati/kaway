import { createChart, CrosshairMode } from 'lightweight-charts';

export const getChart = (container, options,chartTooltipRef) => {
  const [width, height] = [600, 300];

  const chart = createChart(container, options);

  chart.resize(width, height);
  const series1 = chart.addAreaSeries(getSeriesConfig(getSeriesConfig));

  const series2 = chart.addLineSeries();


  //Tooltip
  const tooltipElement = chartTooltipRef;
  chart.subscribeCrosshairMove(
    getTooltipUpdater(tooltipElement, container, [series1, series2])
  );

  //Markers
  series1.setMarkers(getMarkers());

  return chart;
};

const getSeriesConfig = () => {
  return {
    // topColor: 'red',
    // bottomColor: 'blue',
    // lineColor: 'green',
    // lineWidth: 1,
  };
};

function businessDayToString(businessDay) {
  return businessDay.year + '-' + businessDay.month + '-' + businessDay.day;
}

function getMarkers() {
  return [
    {
      time: '2018-09-14',
      position: 'inBar',
      color: 'red',
      shape: 'circle',
      // text: '',
    },
  ];
}

const getTooltipUpdater = (toolTip, container, series) => {
  return (param) => {
    var toolTipWidth = 80;
    var toolTipHeight = 80;
    var toolTipMargin = 15;

    if (
      param.point === undefined ||
      !param.time ||
      param.point.x < 0 ||
      param.point.x > container.clientWidth ||
      param.point.y < 0 ||
      param.point.y > container.clientHeight
    ) {
      toolTip.style.display = 'none';
    } else {
      const dateStr = businessDayToString(param.time);
      toolTip.style.display = 'block';
      var price1 = param.seriesPrices.get(series[0]);
      var price2 = param.seriesPrices.get(series[1]);

      // console.log('===', price1, price2, dateStr);
      toolTip.innerHTML =
        '<div style="color: #009688">Apple Inc.</div><div style="font-size: 14px; margin: 4px 0px; color: #21384d">' +
        Math.round(100 * price1) / 100 +
        ' -- ' +
        Math.round(100 * price2) / 100 +
        '</div><div style="color: #21384d">' +
        dateStr +
        '</div>';
      var coordinate = series[0].priceToCoordinate(price1);
      var shiftedCoordinate = param.point.x - 50;
      if (coordinate === null) {
        return;
      }
      shiftedCoordinate = Math.max(
        0,
        Math.min(container.clientWidth - toolTipWidth, shiftedCoordinate)
      );
      var coordinateY =
        coordinate - toolTipHeight - toolTipMargin > 0
          ? coordinate - toolTipHeight - toolTipMargin
          : Math.max(
              0,
              Math.min(
                container.clientHeight - toolTipHeight - toolTipMargin,
                coordinate + toolTipMargin
              )
            );
      toolTip.style.left = shiftedCoordinate + 'px';
      toolTip.style.top = coordinateY + 'px';
    }
  };
};
