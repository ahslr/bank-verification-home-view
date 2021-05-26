import React from "react";
import { Image, Button, PanelInformationRow } from "components";

export const App = ({
  user = {},
  setActivePageContent,
  handleBack,
  strings: STRINGS = {},
  icons: ICONS = {}
  //   MAX_NUMBER_BANKS
}) => {
  const {bank_account = []} = user;
  if (
    !bank_account.length ||
    bank_account.length ===
    bank_account.filter(data => data.status === 0).length
  ) {
    return (
      <div className="btn-wrapper">
        <div className="holla-verification-button">
          <div>{STRINGS["USER_VERIFICATION.START_BANK_VERIFICATION"]}</div>
          <div className="btn-wrapper">
            <Button
              label={STRINGS["USER_VERIFICATION.START_BANK_VERIFICATION"]}
              onClick={() => setActivePageContent("bank")}
              className="mb-3"
            />
          </div>
        </div>
      </div>
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
              {Object.keys(account).map(data => {
                if (data !== "id" && data !== "status") {
                  return (
                    <PanelInformationRow
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
      <div>
        <div className="font-weight-bold text-lowercase">
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
        {List}
        {lastVerified.status === 3 && (
          <div className="btn-wrapper">
            <Button
              label={STRINGS["USER_VERIFICATION.ADD_ANOTHER_BANK_ACCOUNT"]}
              onClick={() => setActivePageContent("bank")}
              className="mb-3"
            />
          </div>
        )}
      </div>
    );
  }
}