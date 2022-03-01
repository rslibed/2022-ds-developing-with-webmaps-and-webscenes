require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/widgets/ScaleBar",
  "esri/config",
  "esri/intl"
], (MapView, WebMap, ScaleBar, esriConfig, intl) => {
  const init = async () => {
    const { initApp } = await import("./utilities.js");
    const props = await initApp(MapView, WebMap, esriConfig);
    const { view, portal } = props;

    const { units, culture } = portal;

    // SET LOCALE BASED OFF OF LOCALE FLAG SET IN PORTAL
    intl.setLocale(culture);

    // SET UNITS IN SCALEBAR BASED UNITS SET IN PORTAL
    const scalebar = new ScaleBar({
      view,
      units
    });

    view.ui.add(scalebar, "bottom-right");
  };
  init();
});
