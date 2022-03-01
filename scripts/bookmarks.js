require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/config",
  "esri/widgets/Bookmarks",
  "esri/widgets/Expand"
], (MapView, WebMap, esriConfig, Bookmarks, Expand) => {
  const init = async () => {
    const { initApp } = await import("./utilities.js");
    const props = await initApp(MapView, WebMap, esriConfig);
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
