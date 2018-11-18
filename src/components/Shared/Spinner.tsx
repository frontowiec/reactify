import { FunctionComponent } from "react";
import * as React from "react";
import { CircularProgress } from "@material-ui/core";

export const Spinner: FunctionComponent<{ msg?: string }> = ({
  msg = "Loading data..."
}) => (
  <div
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <CircularProgress />
    <small style={{ color: "white", marginTop: 15 }}>{msg}</small>
  </div>
);
