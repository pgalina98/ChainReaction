import React, { useState } from "react";

import { connect } from "react-redux";

import Image from "next/image";
import { useRouter } from "next/router";

import { Loader } from "@components";

import { DropdownMenuItem } from "@enums/dropdown-menu-items";

import {
  createEmptyLoadingStateObject,
  LoadingState,
} from "@models/loading/loading-state.model";

import { RootState } from "@store/index";

import { clearActiveTab, clearAuthenticationToken } from "@utils/local-storage";
import { declassify } from "@utils/common";

import { disconnect } from "@config/websocket-middleware";

interface AvatarProps extends StateProps {
  className?: string;
  withDropdown: boolean;
}

const Avatar = ({
  className,
  withDropdown = false,
  authentication,
}: AvatarProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [loadingState, setLoadingState] = useState<LoadingState>(
    createEmptyLoadingStateObject()
  );

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onSignOutButtonClick = (): void => {
    setLoadingState({
      isLoading: true,
      item: DropdownMenuItem.SIGN_OUT,
    });
    clearAuthenticationToken();
    disconnect();

    setTimeout(() => {
      setLoadingState({
        isLoading: false,
        item: DropdownMenuItem.SIGN_OUT,
      });
      router.push("/");
    }, 1000);
  };

  const navigateToMyOrdersPage = (): void => {
    setLoadingState({
      isLoading: true,
      item: DropdownMenuItem.MY_ORDERS,
    });

    setTimeout(() => {
      setLoadingState({
        isLoading: false,
        item: DropdownMenuItem.MY_ORDERS,
      });
      router.push("/my-orders");
      clearActiveTab();
    }, 1000);
  };

  const isLoading = (item: DropdownMenuItem): boolean => {
    return loadingState?.isLoading && loadingState?.item === item;
  };

  return (
    <div className={`${className} relative`}>
      <Image
        width={45}
        height={45}
        className="rounded-full cursor-pointer"
        src="data:image/png;base64,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"
        onClick={toggleMenu}
        alt="User dropdown"
      />
      <div
        className={declassify(
          "w-56 bg-white rounded divide-y divide-gray-10 shadow dark:bg-gray-700 dark:divide-gray-600 block absolute top-14 right-0",
          { visible: withDropdown && isMenuOpen },
          { invisible: !withDropdown || !isMenuOpen }
        )}
      >
        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
          <div>{authentication.fullname}</div>
          <div className="font-medium truncate">{authentication.email}</div>
        </div>
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          <li>
            <a
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex justify-between items-center cursor-pointer"
              onClick={navigateToMyOrdersPage}
            >
              <span> My orders</span>
              {isLoading(DropdownMenuItem.MY_ORDERS) ? (
                <Loader size="small" withLabel={false} />
              ) : (
                <i className="las la-truck-loading text-lg" />
              )}
            </a>
          </li>
          <li>
            <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex justify-between items-center cursor-pointer">
              <span>Settings</span>
              {isLoading(DropdownMenuItem.SETTINGS) ? (
                <Loader size="small" withLabel={false} />
              ) : (
                <i className="las la-tools text-lg" />
              )}
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex justify-between items-center cursor-pointer"
            onClick={onSignOutButtonClick}
          >
            <span>Sign out</span>
            {isLoading(DropdownMenuItem.SIGN_OUT) ? (
              <Loader size="small" withLabel={false} />
            ) : (
              <i className="las la-sign-out-alt text-lg" />
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication }: RootState) => ({
  authentication,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Avatar);
