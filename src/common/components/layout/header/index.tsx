import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  BarsIcon,
  Avatar,
  IconWIthBadge,
  NotificationBox,
  CartBox,
} from "@components";

import { useFadeInOutLeftVariants, useFadeInOutTopVariants } from "@animations";

import { MenuItem } from "@enums/menu-items";
import { LocalStorageKeys } from "@enums/local-storage-keys";

import { declassify, isUndefined } from "@utils/common";
import { getValueByKey, setValue } from "@utils/local-storage";

import { RootState } from "@store/index";

import useFetchNotificationsCount from "@features/notification/api/hooks/useFetchNotificationsCount";

import { receiveWebSocketMessage } from "@config/websocket-middleware";

import styles from "./header.module.scss";

interface HeaderProps extends StateProps {
  animated?: boolean;
  showMenu: boolean;
  backgroundColor?: "singleColor" | "split";
}

const Header = ({
  animated = false,
  showMenu = false,
  backgroundColor = "singleColor",
  authentication,
  cart,
}: HeaderProps) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>();
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] =
    useState<boolean>(false);
  const [notificationsCount, setNotificationsCount] = useState<number>();
  const [isCartBoxOpen, setIsCartBoxOpen] = useState<boolean>(false);
  const [cartItemsCount, setCartItemsCount] = useState<number>();

  const { isLoading, isError, isSuccess, data, error, refetch } =
    useFetchNotificationsCount(authentication?.id!);

  useEffect(() => {
    receiveWebSocketMessage()?.subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        refetch();
      }
    });
  });

  useEffect(() => {
    if (!isUndefined(typeof window)) {
      setActiveTab(getValueByKey(LocalStorageKeys.ACTIVE_TAB || null)!);
    }
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setNotificationsCount(data?.data);
  }, [data]);

  useEffect(() => {
    setCartItemsCount(cart?.items.length);
  }, [cart]);

  const onMenuItemChange = (menuItem: MenuItem): void => {
    router.push(`/${menuItem}`);
    setValue(LocalStorageKeys.ACTIVE_TAB, menuItem);
  };

  const navigateToHomepage = (): void => {
    router.push("/");
  };

  return (
    <div className={`${styles.header} grid grid-cols-2`}>
      <div className="flex items-center bg_primary">
        <motion.div
          {...(animated && {
            initial: "initial",
            animate: "animate",
            exit: "exit",
          })}
          variants={useFadeInOutLeftVariants({
            duration: 0.5,
            exit: { translateX: "-110%" },
          })}
          className={`${styles.logo_img_container} flex rounded-tr-xl rounded-br-xl`}
        >
          <Image
            src="/assets/shared/chain-reaction_logo.png"
            alt="ChainReaction Logo"
            width={45}
            height={40}
            priority
          />
        </motion.div>
        <motion.div
          {...(animated && {
            initial: "initial",
            animate: "animate",
            exit: "exit",
          })}
          variants={useFadeInOutTopVariants({ duration: 0.5 })}
          className={`${styles.logo_text_container} flex items-center text-white ml-4 mb-4 rounded-bl-xl rounded-br-xl cursor-pointer`}
          onClick={navigateToHomepage}
        >
          <p className="text-2xl font-medium mt-4">ChainReaction.</p>
        </motion.div>
      </div>
      <BarsIcon
        className={declassify(
          "absolute left-1/2 top-14 transform -translate-x-1/2 z-20",
          { visible: showMenu },
          { invisible: !showMenu }
        )}
      />
      <div
        className={declassify(
          "text-gray-200 uppercase justify-between flex items-center font-light text-base absolute right-0 w-1/2 h-20 z-10",
          { bg_primary: backgroundColor === "singleColor" },
          { bg_brown: backgroundColor !== "singleColor" },
          { visible: showMenu },
          { invisible: !showMenu }
        )}
      >
        <motion.div
          {...(animated && {
            initial: "initial",
            animate: "animate",
            exit: "exit",
          })}
          variants={useFadeInOutTopVariants({ duration: 0.5 })}
          className="space-x-12 ml-16 mr-16"
        >
          <span
            className={declassify("cursor-pointer hover:border-b-2", {
              "border-b-2 text-white": activeTab === MenuItem.BIKES,
            })}
            onClick={() => onMenuItemChange(MenuItem.BIKES)}
          >
            Bikes
          </span>
          <span
            className={declassify("cursor-pointer hover:border-b-2", {
              "border-b-2 text-white": activeTab === MenuItem.ACCESSORIES,
            })}
            onClick={() => onMenuItemChange(MenuItem.ACCESSORIES)}
          >
            Accessories
          </span>
          <span
            className={declassify("cursor-pointer hover:border-b-2", {
              "border-b-2 text-white": activeTab === MenuItem.SERVICES,
            })}
            onClick={() => onMenuItemChange(MenuItem.SERVICES)}
          >
            Services
          </span>
        </motion.div>
        <motion.div
          {...(animated && {
            initial: "initial",
            animate: "animate",
            exit: "exit",
          })}
          variants={useFadeInOutTopVariants({ duration: 0.5 })}
          className="flex items-center space-x-10 mr-6"
        >
          <IconWIthBadge
            icon="las la-bell"
            badgeNumber={notificationsCount || 0}
            onClick={() => setIsNotificationBoxOpen(true)}
          />
          <IconWIthBadge
            icon="las la-shopping-bag"
            badgeNumber={cartItemsCount || 0}
            onClick={() => setIsCartBoxOpen(true)}
          />
          <Avatar className="mr-6" withDropdown />
        </motion.div>
        <NotificationBox
          isOpen={isNotificationBoxOpen}
          toggleNotificationBox={setIsNotificationBoxOpen}
        />
        <CartBox isOpen={isCartBoxOpen} toggleCartBox={setIsCartBoxOpen} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, cart }: RootState) => ({
  authentication,
  cart,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Header);
