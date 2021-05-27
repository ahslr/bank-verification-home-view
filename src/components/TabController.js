import React from "react";
import classnames from "classnames";

const TabController = ({ tabs, activeTab, setActiveTab, quicktrade }) => (
  <div className="tab_controller-wrapper">
    <div className="tab_controller-tabs">
      {Object.entries(tabs).map(([key, { title }]) => {
        const tabProps = {
          key: `tab_item-${key}`,
          className: classnames("tab_item", {
            "tab_item-active": key === activeTab,
            "tab_item-deactive": key !== activeTab,
            "tab-trade": quicktrade === true,
            pointer: setActiveTab
          })
        };
        if (setActiveTab) {
          tabProps.onClick = () => setActiveTab(key);
        }

        return <div {...tabProps}>{title}</div>;
      })}
    </div>
  </div>
);

TabController.defaultProps = {
  tabs: []
};
export default TabController;
