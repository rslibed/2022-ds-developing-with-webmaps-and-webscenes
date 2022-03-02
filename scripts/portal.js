require([
  "esri/views/MapView",
  "esri/WebMap",
  "esri/portal/Portal",
  "esri/widgets/ScaleBar",
  "esri/config",
  "esri/intl"
], (MapView, WebMap, Portal, ScaleBar, esriConfig, intl) => {
  const init = async () => {
    const { initApp } = await import("./utils/utilities.js");
    const props = await initApp(MapView, WebMap, Portal, esriConfig);
    const { view, portal } = props;

    const { culture } = portal;

    // SET LOCALE BASED OFF OF LOCALE FLAG SET IN PORTAL
    intl.setLocale(culture);

    // SET UNITS IN SCALEBAR BASED UNITS SET IN PORTAL
    const units = portal?.units === "metric" ? "metric" : "non-metric";

    const scalebar = new ScaleBar({
      view,
      units
    });

    view.ui.add(scalebar, "bottom-right");
  };
  init();
});
