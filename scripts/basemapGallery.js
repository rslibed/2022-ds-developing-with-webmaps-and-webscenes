require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/portal/Portal",
  "esri/config",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Expand"
], (MapView, WebMap, Portal, esriConfig, BasemapGallery, Expand) => {
  const init = async () => {
    const { initApp } = await import("./utils/utilities.js");
    const props = await initApp(MapView, WebMap, Portal, esriConfig);

    const { view } = props;

    const basemapGallery = new BasemapGallery({
      view
    });

    const basemapGalleryExpand = new Expand({
      content: basemapGallery,
      view,
      expanded: true
    });

    view.ui.add(basemapGalleryExpand, "bottom-left");
  };
  init();
});
