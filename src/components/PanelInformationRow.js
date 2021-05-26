import React from "react";
import classnames from "classnames";

export const PanelInformationRow = ({
  label = "",
  information = "",
  className,
  bold = true,
  disable = false
}) => (
  <div
    className={classnames(
      "d-flex",
      "justify-content-start",
      "align-items-center",
      "panel-information-row",
      className,
      { "panel-information-row-disable": disable }
    )}
  >
    <span style={{ wordBreak: "normal" }}>
      {bold ? <b>{label}</b> : label}:{" "}
      <span className="information-content">{information}</span>
    </span>
  </div>
);
