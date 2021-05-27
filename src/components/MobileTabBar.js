import React from "react";
import classnames from "classnames";

const MobileTabBar = ({ tabs, activeTab, setActiveTab, renderContent }) => {
  return (
    <div>
      {Object.entries(tabs).map(([key, { title }], index) => {
        const tabProps = {
          key: `tab_item-${key}`,
          className: classnames("mobile_tab-wrapper", {
            active_mobile_tab: key === activeTab,
            mobile_tab_last: index === tabs.length - 1,
            "mobile_tab_last-active":
              index === tabs.length - 1 && key === activeTab,
            pointer: setActiveTab
          })
        };
        if (setActiveTab) {
          tabProps.onClick = () => {
            if (key !== activeTab) {
              setActiveTab(key);
            }
          };
        }
        return (
          <div {...tabProps}>
            {title}
            {key === activeTab && (
              <div className="inner_container py-4">{renderContent()}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MobileTabBar;
