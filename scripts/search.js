require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/portal/Portal",
  "esri/config",
  "esri/widgets/Search",
  "esri/widgets/Expand"
], (MapView, WebMap, Portal, esriConfig, Search, Expand) => {
  const init = async () => {
    const { initApp } = await import("./utils/utilities.js");
    const props = await initApp(MapView, WebMap, Portal, esriConfig);

    const { view } = props;

    const search = new Search({
      view
    });

    const searchExpand = new Expand({
      content: search,
      view,
      expanded: true
    });

    view.ui.add(searchExpand, "top-right");
  };
  init();
});
