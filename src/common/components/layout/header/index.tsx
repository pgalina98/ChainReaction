import React, { useState } from "react";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import { BarsIcon, Avatar, IconWIthBadge, NotificationBox } from "@components";

import { useFadeInOutLeftVariants, useFadeInOutTopVariants } from "@animations";

import { MenuItem } from "@enums/menu-items";

import { declassify } from "@utils/common";

import styles from "./header.module.scss";
import { useRouter } from "next/router";

interface HeaderProps {
  animated?: boolean;
  showMenu: boolean;
  backgroundColor?: "singleColor" | "split";
}

const Header = ({
  animated = false,
  showMenu = false,
  backgroundColor = "singleColor",
}: HeaderProps) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<MenuItem>();
  const [isNotificationBoxShown, setIsNotificationBoxShown] =
    useState<boolean>(false);

  const onMenuItemChange = (menuItem: MenuItem): void => {
    setActiveTab(menuItem);
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
            style={{ position: "absolute", zIndex: 0 }}
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
          " absolute left-1/2 top-14 transform -translate-x-1/2 z-20",
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
          <Link href="/">
            <span
              className={declassify("cursor-pointer hover:border-b-2", {
                "border-b-2 text-white": activeTab === MenuItem.BIKES,
              })}
              onClick={() => onMenuItemChange(MenuItem.BIKES)}
            >
              Bikes
            </span>
          </Link>
          <Link href="/">
            <span
              className={declassify("cursor-pointer hover:border-b-2", {
                "border-b-2 text-white": activeTab === MenuItem.ACCESSORIES,
              })}
              onClick={() => onMenuItemChange(MenuItem.ACCESSORIES)}
            >
              Accessories
            </span>
          </Link>
          <Link href="/">
            <span
              className={declassify("cursor-pointer hover:border-b-2", {
                "border-b-2 text-white": activeTab === MenuItem.SERVICES,
              })}
              onClick={() => onMenuItemChange(MenuItem.SERVICES)}
            >
              Services
            </span>
          </Link>
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
            onClick={() => setIsNotificationBoxShown(true)}
          />
          <IconWIthBadge icon="las la-shopping-bag" />
          <Avatar className="mr-6" withDropdown />
        </motion.div>
        <NotificationBox
          isShown={isNotificationBoxShown}
          setIsShown={setIsNotificationBoxShown}
        />
      </div>
    </div>
  );
};

export default Header;
