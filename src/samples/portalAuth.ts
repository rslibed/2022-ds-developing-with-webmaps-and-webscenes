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

import "../styles/portalAuth.css";

import WebMap from "@arcgis/core/WebMap";
import SceneView from "@arcgis/core/views/SceneView";
import config from "@arcgis/core/config";
import Portal from "@arcgis/core/portal/Portal";
import IdentityManager from "@arcgis/core/identity/IdentityManager";
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import { eachAlways } from "@arcgis/core/core/promiseUtils";
import Layer from "@arcgis/core/layers/Layer";

const appNode = document.getElementById("app");

appNode.innerHTML = `
<calcite-shell>
<header class="site-header" slot="header">
  <div class="wrapper site-header__wrapper">
    <h1>Portal Demo</h1>
    <calcite-button id="login" icon-end="user">
      <span id="loginString">Sign In</span>
      <span id="loggedInUser"></span>
    </calcite-button>
  </div>
</header>
<calcite-shell-panel slot="primary-panel" position="start">
  <div id="cardContainer"></div>
</calcite-shell-panel>

<div id="root"></div>
</calcite-shell>
<calcite-alert id="alert">
</calcite-alert>
`;

config.portalUrl = "https://www.arcgis.com/";
handleAuthentication();

const portal = new Portal();
await portal.load();

// Demo Map View and Scene View
const map = new WebMap({
  portalItem: {
    id: "7761d81ff08e45f2a7f27997e8d3e92d"
  }
});

const view = new SceneView({
  map,
  container: "root"
});

await view.when();

IdentityManager.checkSignInStatus(config.portalUrl)
  .then(info => {
    // Logged in update sign-in button and query items
    const user = info?.userId ? info.userId : null;
    if (user) {
      getCredentials(info);
    } else {
      queryItems();
    }
  })
  .catch(() => {
    // Not logged in query for public items
    queryItems();
  });

async function queryItems(user?: string) {
  // Get a few items from the default portal or get a few
  // items from logged in user and display as thumbnails in side panel
  const layerTypes =
    '(type:("Feature Collection" OR "Feature Service" OR "Map Service" ) -typekeywords:"Table")  -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration" -type:"Map Area" -typekeywords:"MapAreaPackage"';

  const query = user ? `owner:${user} ${layerTypes}` : layerTypes;

  const [itemResults] = await eachAlways([
    portal.queryItems({ extent: view.extent, query }),
    portal.queryGroups({ query: "id:79648f2f03454cc5ba455555f8746257" })
  ]);
  displayItems(itemResults.value.results);
}
function handleAuthentication() {
  const signInButton = document.getElementById("login");

  IdentityManager.registerOAuthInfos([
    new OAuthInfo({
      appId: "RA71jmSlDTDOhanb"
    })
  ]);

  if (signInButton)
    signInButton.addEventListener("click", () => {
      getCredentials();
    });
}

async function getCredentials(credential?: __esri.Credential) {
  // If the user isn't already logged-in use getCredential
  // to kick-off the login process
  const logInString = document.getElementById("loginString");
  if (logInString) {
    if (logInString.innerHTML === "Sign Out") {
      destroyCredentials();
      return;
    }
    logInString.innerHTML = "Sign In";
  }

  if (!credential) {
    credential = await IdentityManager.getCredential(config.portalUrl);
  }
  queryItems(credential.userId);
  if (logInString) logInString.innerHTML = "Sign Out";
}
function destroyCredentials() {
  IdentityManager.destroyCredentials();
  window.location.reload();
}

function displayItems(items: __esri.PortalItem[]) {
  const cardContainer = document.getElementById("cardContainer");
  if (!cardContainer) return;
  cardContainer.innerHTML = `
    ${items
      .map(
        item => `<calcite-card>
    <span slot="title">${item.title}</span>
  <figure class="card-image-wrap">
    <img class="card-image" src=${item.thumbnailUrl} alt/>
  </figure>
  <div slot="footer-leading"></div>
  <div slot="footer-trailing">
    <calcite-button class="save-btn"  data-item=${item.id} data-title=${item.title}  scale="s" title="Save" icon-end="save"></calcite-button>
    <calcite-button class="add-btn" data-item=${item.id}  scale="s" icon-end="add-layer" title="Add to map"></calcite-button>
  </div>
  </calcite-card>`
      )
      .join("")}`;
  // Click event handler for buttons on the item cards
  Array.from(document.getElementsByClassName("add-btn")).forEach(function (
    element
  ) {
    element.addEventListener("click", () =>
      addLayerToMap({ id: element.getAttribute("data-item") })
    );
  });
  Array.from(document.getElementsByClassName("save-btn")).forEach(function (
    element
  ) {
    element.addEventListener("click", () =>
      saveMap({
        id: element.getAttribute("data-item"),
        title: element.getAttribute("data-title")
      })
    );
  });
}
async function addLayerToMap(item) {
  // Add layer to map
  const layer = await Layer.fromPortalItem(item);
  layer.watch("loadStatus", status => {
    if (status === "loaded") {
      view.goTo(layer.fullExtent);
    }
  });
  view.map.add(layer);
}
function saveMap(item) {
  const alert = document.getElementById("alert");
  const map = view?.map as __esri.WebScene;
  const newItem = {
    title: `${item.title}-${new Date().toUTCString()}`
  };

  map?.updateFrom(view).then(() => {
    map
      .saveAs(newItem)
      .then(savedItem => {
        alert.setAttribute("active", "true");
        alert.innerHTML = `<div slot="title">Map Saved ${newItem.title}</div>
      <div slot="message">View Item </div><a href='${config.portalUrl}/home/item.html?id=${savedItem.id}'slot="link">${savedItem.id}</a>`;
      })
      .catch(() => {
        console.log("Problem saving item");
      });
  });
}
