require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/config",
  "esri/widgets/TimeSlider",
  "esri/widgets/Expand",
  "esri/widgets/Legend"
], (MapView, WebMap, esriConfig, TimeSlider, Expand, Legend) => {
  const init = async () => {
    const { initApp } = await import("./utilities.js");
    const props = await initApp(MapView, WebMap, esriConfig);
    const { view } = props;

    const timeSlider = new TimeSlider({
      view,
      container: document.createElement("div")
    });

    const timeSliderExpand = new Expand({
      content: timeSlider,
      view,
      expanded: true
    });

    const legend = new Legend({
      view
    });

    const legendExpand = new Expand({
      content: legend,
      view,
      expanded: true
    });

    view.ui.add(legendExpand, "bottom-left");
    view.ui.add(timeSliderExpand, "bottom-right");
  };
  init();
});
