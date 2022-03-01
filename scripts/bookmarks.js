require(["esri/views/MapView", "esri/WebMap", "esri/config"], (
  MapView,
  WebMap,
  esriConfig
) => {
  const init = async () => {
    const { initApp } = await import("./utilities.js");
    const props = await initApp(MapView, WebMap, esriConfig);
    console.log("PROPS: ", props);
  };
  init();
});
