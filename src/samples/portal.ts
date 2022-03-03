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

import "../styles/samples.css";

import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import { setLocale } from "@arcgis/core/intl";

import { initApp } from "../utils/utilities";

(async () => {
  const props = await initApp("default");
  const { view, portal } = props;
  const { culture } = portal;
  // SET LOCALE BASED OFF OF LOCALE FLAG SET IN PORTAL
  setLocale(culture);
  // SET UNITS IN SCALEBAR BASED UNITS SET IN PORTAL
  const unit = portal?.units === "metric" ? "metric" : "non-metric";
  const scalebar = new ScaleBar({
    view,
    unit
  });
  view.ui.add(scalebar, "bottom-right");
})();
