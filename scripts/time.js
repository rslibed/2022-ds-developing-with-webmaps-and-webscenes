require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/portal/Portal",
  "esri/config",
  "esri/widgets/TimeSlider",
  "esri/widgets/Expand",
  "esri/widgets/Legend"
], (MapView, WebMap, Portal, esriConfig, TimeSlider, Expand, Legend) => {
  const init = async () => {
    const { initApp } = await import("./utils/utilities.js");
    const props = await initApp(MapView, WebMap, Portal, esriConfig);
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

    view.ui.add(timeSliderExpand, "bottom-right");
  };
  init();
});
