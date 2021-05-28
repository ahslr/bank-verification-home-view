import React, { Component, Fragment } from "react";
import { isMobile } from "react-device-detect";
import {
  Image,
  Button,
  PanelInformationRow,
  TabController,
  MobileTabBar,
  IconTitle
} from "components";

const TABS = {
  bank: {
    iconId: "VERIFICATION_BANK_NEW",
    title: "Bank"
  },
  osko: {
    iconId: "OSKO_LOGO",
    title: "Osko (PayID)"
  }
};

const MAX_OSKO_ACCOUNTS = 1;

class App extends Component {
  constructor(props) {
    super(props);
    const {
      router: {
        location: { query: { initial_bank_tab } = {} },
      }
    } = this.props;

    const activeTab = initial_bank_tab && Object.keys(TABS).includes(initial_bank_tab) ? initial_bank_tab : "bank";

    this.state = {
      activeTab,
    };
  }

  setActiveTab = activeTab => {
    this.setState({ activeTab });
  };

  renderContent = () => {
    const { activeTab } = this.state;
    switch (activeTab) {
      case "bank": {
        return this.renderBankContent();
      }
      case "osko": {
        return this.renderOskoContent();
      }
      default: {
        return "No content";
      }
    }
  };

  updatePath = (key, value) => {
    const {
      router,
      router: {
        location: { pathname, query = {} }
      }
    } = this.props;
    router.push({ pathname, query: { ...query, [key]: value } });
  };

  setActivePageContent = (type = "bank") => {
    const { setActivePageContent } = this.props;
    this.updatePath("type", type);
    setActivePageContent("bank");
  };

  renderOskoContent = () => {
    const {
      user = {},
      strings: STRINGS = {},
      icons: ICONS = {}
      //   MAX_NUMBER_BANKS
    } = this.props;

    const { bank_account = [] } = user;
    const osko_account = bank_account.filter(({ bank_name }) => bank_name === "pay id");

    if (
      !osko_account.length ||
      osko_account.length ===
        osko_account.filter(({ status }) => status === 0).length
    ) {
      return (
        <Fragment>
          <div>
            <IconTitle
              iconPath={ICONS["OSKO_LOGO"]}
              className="flex-direction-column"
            />
            <div className="text-align-center pb-4">
              Add your Osko (PayID) account and get faster transfers by clicking
              below.
            </div>
          </div>
          <div className="btn-wrapper">
            <div className="holla-verification-button">
              <div className="btn-wrapper">
                <Button
                  label={STRINGS["USER_VERIFICATION.START_BANK_VERIFICATION"]}
                  onClick={() => this.setActivePageContent("osko")}
                  className="mb-3"
                />
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      const lastVerified = osko_account[osko_account.length - 1];

      const List = osko_account.map((account, index) => {
        if (account.status !== 0) {
          return (
            <div key={index} className="d-flex my-4">
              {account.status === 1 && (
                <div className="d-flex align-items-center mr-3">
                  <Image
                    iconId="PENDING_TIMER"
                    icon={ICONS["PENDING_TIMER"]}
                    wrapperClassName="account-pending-icon"
                  />
                </div>
              )}
              <div className="w-100">
                {Object.keys(account).map((data, index) => {
                  if (data !== "id" && data !== "status" && data !== "bank_name") {
                    return (
                      <PanelInformationRow
                        key={index}
                        stringId={data}
                        label={data}
                        information={account[data]}
                        className="title-font"
                        disable
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
        }
        return null;
      });
      return (
        <Fragment>
          <div>
            {List}
          </div>
          {lastVerified.status === 3 && osko_account.length < MAX_OSKO_ACCOUNTS && (
            <div className="btn-wrapper">
              <div className="holla-verification-button">
                <div className="btn-wrapper">
                  <Button
                    label={
                      STRINGS["USER_VERIFICATION.ADD_ANOTHER_BANK_ACCOUNT"]
                    }
                    onClick={() => this.setActivePageContent("osko")}
                    className="mb-3"
                  />
                </div>
              </div>
            </div>
          )}
        </Fragment>
      );
    }
  };

  renderBankContent = () => {
    const {
      user = {},
      strings: STRINGS = {},
      icons: ICONS = {}
      //   MAX_NUMBER_BANKS
    } = this.props;

    const { bank_account: all_accounts = [] } = user;

    const bank_account = all_accounts.filter(({ bank_name }) => bank_name !== "pay id")

    if (
      !bank_account.length ||
      bank_account.length ===
        bank_account.filter(({ status }) => status === 0).length
    ) {
      return (
        <Fragment>
          <div>
            <div className="my-2">
              {STRINGS["USER_VERIFICATION.BANK_VERIFICATION_TEXT_1"]}
            </div>
            <div className="my-2">
              {STRINGS["USER_VERIFICATION.BANK_VERIFICATION_TEXT_2"]}
            </div>
            <ul className="pl-4">
              <li className="my-1">
                {STRINGS["USER_VERIFICATION.BASE_WITHDRAWAL"]}
              </li>
              <li className="my-1">
                {STRINGS["USER_VERIFICATION.BASE_DEPOSITS"]}
              </li>
              <li className="my-1">
                {STRINGS["USER_VERIFICATION.WARNING.LIST_ITEM_3"]}
              </li>
            </ul>
          </div>
          <div className="btn-wrapper">
            <div className="holla-verification-button">
              <div className="btn-wrapper">
                <Button
                  label={STRINGS["USER_VERIFICATION.START_BANK_VERIFICATION"]}
                  onClick={() => this.setActivePageContent("bank")}
                  className="mb-3"
                />
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      const lastVerified = bank_account[bank_account.length - 1];

      const List = bank_account.map((account, index) => {
        if (account.status !== 0) {
          return (
            <div key={index} className="d-flex my-4">
              {account.status === 1 && (
                <div className="d-flex align-items-center mr-3">
                  <Image
                    iconId="PENDING_TIMER"
                    icon={ICONS["PENDING_TIMER"]}
                    wrapperClassName="account-pending-icon"
                  />
                </div>
              )}
              <div className="w-100">
                {Object.keys(account).map((data, index) => {
                  if (data !== "id" && data !== "status") {
                    return (
                      <PanelInformationRow
                        key={index}
                        stringId={data}
                        label={data}
                        information={account[data]}
                        className="title-font"
                        disable
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
        }
        return null;
      });
      return (
        <Fragment>
          <div>
            {List}
          </div>
          {lastVerified.status === 3 && (
            <div className="btn-wrapper">
              <div className="holla-verification-button">
                <div className="btn-wrapper">
                  <Button
                    label={
                      STRINGS["USER_VERIFICATION.ADD_ANOTHER_BANK_ACCOUNT"]
                    }
                    onClick={() => this.setActivePageContent("bank")}
                    className="mb-3"
                  />
                </div>
              </div>
            </div>
          )}
        </Fragment>
      );
    }
  };

  render() {
    const { activeTab } = this.state;
    const {
      handleBack,
      strings: STRINGS = {},
    } = this.props;

    return (
      <div>
        <div className="font-weight-bold text-lowercase py-4">
          {STRINGS.formatString(
            STRINGS["USER_VERIFICATION.BANK_VERIFICATION_HELP_TEXT"],
            <span
              className="verification_link pointer"
              onClick={e => handleBack("document", e)}
            >
                  {STRINGS["USER_VERIFICATION.DOCUMENT_SUBMISSION"]}
                </span>
          )}
          <div>
            {
              STRINGS[
                "USER_VERIFICATION.BANK_VERIFICATION_HELP_TEXT,USER_VERIFICATION.DOCUMENT_SUBMISSION"
                ]
            }
          </div>
        </div>
        {!isMobile ? (
          <TabController
            activeTab={activeTab}
            setActiveTab={this.setActiveTab}
            tabs={TABS}
          />
        ) : (
          <MobileTabBar
            activeTab={activeTab}
            renderContent={this.renderContent}
            setActiveTab={this.setActiveTab}
            tabs={TABS}
          />
        )}
        {!isMobile && this.renderContent()}
      </div>
    );
  }
}

export default App;
