/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import config from "../config.json";

import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Portal from "@arcgis/core/portal/Portal";
import esriConfig from "@arcgis/core/config";

export async function initApp(sampleType: string) {
  const appNode = document.getElementById("app");
  appNode.innerHTML = `
  <header>
    <div class="logo-container"></div>
    <h1>ArcGIS Online: Developing with Web Maps and Web Scenes</h1>
  </header>
  <div id="viewDiv"></div>
  `;

  const configObj = config;

  const { portalUrl } = configObj;

  esriConfig.portalUrl = portalUrl;

  const map = await createMap(configObj[sampleType]);
  const view = await createView(map);
  const portal = await getPortal(portalUrl);

  handleShareTheme(portal);

  return Promise.resolve({
    view,
    map,
    portal
  });
}

export async function createMap(id) {
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

export function createView(webmap) {
  return new MapView({
    map: webmap,
    container: "viewDiv"
  });
}

export async function getPortal(url) {
  try {
    const portal = await new Portal({ url }).load();
    return Promise.resolve(portal);
  } catch (err) {
    console.error("ERROR: ", err);
    return;
  }
}

export async function handleShareTheme(portal) {
  const { sharedTheme } = portal.portalProperties;
  const header = document.querySelector("header");
  const { background, text } = sharedTheme.header;
  const { style } = header;
  style.background = background;
  style.color = text;

  const logoContainer = document.querySelector(".logo-container");
  const logoImg = document.createElement("img");
  logoImg.src = sharedTheme.logo.small;
  logoContainer.appendChild(logoImg);
}
