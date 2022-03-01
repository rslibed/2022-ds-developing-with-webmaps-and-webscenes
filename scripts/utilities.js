export async function initApp(MapView, WebMap, esriConfig) {
  const config = await import("../config.js");
  const { createMap, getPortal, createView, handleShareTheme } = await import(
    "./utilities.js"
  );
  const { id, portalUrl } = config.default.wma;
  esriConfig.portalUrl = portalUrl;
  const map = await createMap(WebMap, id);
  const view = await createView(MapView, map);
  const portal = await getPortal(map);
  handleShareTheme(portal);

  return Promise.resolve({
    view,
    map,
    portal
  });
}

export async function createMap(WebMap, id) {
  const map = new WebMap({
    portalItem: {
      id
    }
  });

  try {
    const loadedMap = await map.load();
    return Promise.resolve(loadedMap);
  } catch (err) {
    return map;
  }
}

export function createView(MapView, webmap) {
  return new MapView({
    map: webmap,
    container: "viewDiv"
  });
}

export async function getPortal(webmap) {
  try {
    const portal = await webmap.portalItem.portal.load();
    return Promise.resolve(portal);
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
}

export async function handleShareTheme(portal) {
  const { sharedTheme } = portal.portalProperties;
  const header = document.querySelector("header");
  header.style.background = sharedTheme.header.background;
  header.style.color = sharedTheme.header.text;

  const logoContainer = document.querySelector(".logo-container");

  const logoImg = document.createElement("img");
  logoImg.src = sharedTheme.logo.small;

  logoContainer.appendChild(logoImg);
}
