import React from "react";
import { render } from "react-dom";
import Provider from "../components/Provider";
import Library from "../components/Library";

render(
  <Provider>
    <Library />
  </Provider>,
  document.querySelector("#root")
);
