require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/portal/Portal",
  "esri/config",
  "esri/widgets/Bookmarks",
  "esri/widgets/Expand"
], (MapView, WebMap, Portal, esriConfig, Bookmarks, Expand) => {
  const init = async () => {
    const { initApp } = await import("./utils/utilities.js");
    const props = await initApp(MapView, WebMap, Portal, esriConfig);
    const { view } = props;

    const content = new Bookmarks({
      view
    });

    const bookmarksExpand = new Expand({
      content,
      view,
      expanded: true
    });

    view.ui.add(bookmarksExpand, "bottom-left");
  };
  init();
});
