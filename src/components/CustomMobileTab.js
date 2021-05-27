import React from "react";
import classnames from "classnames";
import { Image } from "components";

export const CustomMobileTab = ({ title, icon }) => {
  return (
    <div className={classnames("d-flex", "justify-content-between")}>
      <div className="d-flex">
        <Image icon={icon} wrapperClassName="custom_tab_icon-mobile" />
        <div
          className={classnames(
            "d-flex",
            "justify-content-center",
            "align-items-center",
            "mobile-tab-title",
            "ml-3"
          )}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
