require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/portal/Portal",
  "esri/config",
  "esri/widgets/Legend",
  "esri/widgets/Expand"
], (MapView, WebMap, Portal, esriConfig, Legend, Expand) => {
  const init = async () => {
    const { initApp } = await import("./utils/utilities.js");
    const props = await initApp(MapView, WebMap, Portal, esriConfig);

    const { view } = props;

    // exclude layers from map viewer

    const legend = new Legend({
      view
    });

    const legendExpand = new Expand({
      content: legend,
      view,
      expanded: true
    });

    view.ui.add(legendExpand, "bottom-left");
  };
  init();
});
