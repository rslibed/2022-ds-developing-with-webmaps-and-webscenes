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

import Search from "@arcgis/core/widgets/Search";
import Expand from "@arcgis/core/widgets/Expand";

import { initApp } from "../utils/utilities";

(async () => {
  const props = await initApp("default");

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
})();
