import React from "react";

import { AlertType } from "@enums/alert-type";

import { declassify, isNull } from "@utils/common";

interface AlertProps {
  className?: string;
  type: AlertType;
  accentBorderPosition: "left" | "right" | "top" | "bottom";
  withPrependIcon?: boolean;
  title?: string | null;
  text: string;
}

const renderSuccessAlert = (
  withPrependIcon: boolean,
  title: string | null,
  text: string
) => {
  return (
    <React.Fragment>
      <div
        className={declassify(
          "py-1",
          { visible: withPrependIcon },
          { invisible: !withPrependIcon }
        )}
      >
        <svg
          className={declassify("fill-current h-6 w-6 text-teal-500", {
            "mr-4": withPrependIcon,
          })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <p
          className={declassify(
            "font-bold",
            { visible: !isNull(title) },
            { invisible: isNull(title) }
          )}
        >
          {title}
        </p>
        <p className="text-sm">{text}</p>
      </div>
    </React.Fragment>
  );
};

const renderDangerAlert = (
  withPrependIcon: boolean,
  title: string | null,
  text: string
) => {
  return (
    <React.Fragment>
      <div
        className={declassify(
          "py-1",
          { visible: withPrependIcon },
          { invisible: !withPrependIcon }
        )}
      >
        <svg
          className={declassify("fill-current h-6 w-6 text-rose-500", {
            "mr-4": withPrependIcon,
          })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <p
          className={declassify(
            "font-bold",
            { visible: !isNull(title) },
            { invisible: isNull(title) }
          )}
        >
          {title}
        </p>
        <p className="text-sm">{text}</p>
      </div>
    </React.Fragment>
  );
};

const renderWarningAlert = (
  withPrependIcon: boolean,
  title: string | null,
  text: string
) => {
  return (
    <React.Fragment>
      <div
        className={declassify(
          "py-1",
          { visible: withPrependIcon },
          { invisible: !withPrependIcon }
        )}
      >
        <svg
          className={declassify("fill-current h-6 w-6 text-amber-500", {
            "mr-4": withPrependIcon,
          })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <p
          className={declassify(
            "font-bold",
            { visible: !isNull(title) },
            { invisible: isNull(title) }
          )}
        >
          {title}
        </p>
        <p className="text-sm">{text}</p>
      </div>
    </React.Fragment>
  );
};

const renderInfoAlert = (
  withPrependIcon: boolean,
  title: string | null,
  text: string
) => {
  return (
    <React.Fragment>
      <div
        className={declassify(
          "py-1",
          { visible: withPrependIcon },
          { invisible: !withPrependIcon }
        )}
      >
        <svg
          className={declassify("fill-current h-6 w-6 text-cyan-500", {
            "mr-4": withPrependIcon,
          })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <p
          className={declassify(
            "font-bold",
            { visible: !isNull(title) },
            { invisible: isNull(title) }
          )}
        >
          {title}
        </p>
        <p
          className={declassify(
            { "text-sm": !isNull(title) },
            { "text-base": isNull(title) }
          )}
        >
          {text}
        </p>
      </div>
    </React.Fragment>
  );
};

const Alert = ({
  className,
  type,
  accentBorderPosition,
  withPrependIcon = false,
  title = null,
  text,
}: AlertProps) => {
  return (
    <div
      className={declassify(
        `${className} rounded-b px-4 py-3 shadow-md min-w-full`,
        {
          "bg-teal-100 border-teal-500 text-teal-900":
            type === AlertType.SUCCESS,
          "bg-rose-100 border-rose-500 text-rose-900":
            type === AlertType.DANGER,
          "bg-amber-100 border-amber-500 text-amber-900":
            type === AlertType.WARNING,
          "bg-cyan-100 border-cyan-500 text-cyan-900": type === AlertType.INFO,
        },
        {
          "border-l-4": accentBorderPosition === "left",
          "border-r-4": accentBorderPosition === "right",
          "border-t-4": accentBorderPosition === "top",
          "border-b-4": accentBorderPosition === "bottom",
        }
      )}
      role="alert"
    >
      <div className="flex">
        {type === AlertType.SUCCESS &&
          renderSuccessAlert(withPrependIcon, title, text)}
        {type === AlertType.DANGER &&
          renderDangerAlert(withPrependIcon, title, text)}
        {type === AlertType.WARNING &&
          renderWarningAlert(withPrependIcon, title, text)}
        {type === AlertType.INFO &&
          renderInfoAlert(withPrependIcon, title, text)}
      </div>
    </div>
  );
};

export default Alert;
