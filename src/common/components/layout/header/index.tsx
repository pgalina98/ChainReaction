import React, { useState } from "react";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import { BarsIcon, Button, Avatar, ShoppingCardIcon } from "@components";

import { useFadeInOutLeftVariants, useFadeInOutTopVariants } from "@animations";

import { ButtonType } from "@enums/button-type";
import { MenuItem } from "@enums/menu-items";

import styles from "./header.module.scss";

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
  const [activeTab, setActiveTab] = useState<MenuItem>();

  const onMenuItemChange = (menuItem: MenuItem): void => {
    setActiveTab(menuItem);
  };

  return (
    <div className={`${styles.header} grid grid-cols-2`}>
      <div className="flex items-center bg_primary">
        <motion.div
          {...(animated && { initial: "initial", animate: "animate", exit: "exit" })}
          variants={useFadeInOutLeftVariants({ duration: 0.5, exit: { translateX: "-110%" } })}
          className={`${styles.logo_img_container} flex rounded-tr-xl rounded-br-xl`}
        >
          <Image
            src="/assets/chain-reaction_logo.png"
            alt="ChainReaction Logo"
            width={45}
            height={40}
            priority
          />
        </motion.div>
        <motion.div
          {...(animated && { initial: "initial", animate: "animate", exit: "exit" })}
          variants={useFadeInOutTopVariants({ duration: 0.5 })}
          className={`${styles.logo_text_container} flex items-center text-white ml-4 mb-4 rounded-bl-xl rounded-br-xl`}
        >
          <p className="text-2xl font-medium mt-4">ChainReaction.</p>
        </motion.div>
      </div>
      <BarsIcon className={showMenu ? "visible" : "invisible"} />
      <div
        className={`${backgroundColor === "singleColor" ? "bg_primary" : "bg_brown"} ${
          showMenu ? "visible" : "invisible"
        } text-white uppercase justify-between flex items-center font-light text-base flex`}
      >
        <div className="space-x-12 ml-16 mr-16">
          <Link href="/">
            <span
              className={`${
                activeTab === MenuItem.BIKES && "border-b-2"
              } cursor-pointer hover:border-b-2`}
              onClick={() => onMenuItemChange(MenuItem.BIKES)}
            >
              Bikes
            </span>
          </Link>
          <Link href="/">
            <span
              className={`${
                activeTab === MenuItem.ACCESSORIES && "border-b-2"
              } cursor-pointer hover:border-b-2`}
              onClick={() => onMenuItemChange(MenuItem.ACCESSORIES)}
            >
              Accessories
            </span>
          </Link>
          <Link href="/">
            <span
              className={`${
                activeTab === MenuItem.SERVICES && "border-b-2"
              } cursor-pointer hover:border-b-2`}
              onClick={() => onMenuItemChange(MenuItem.SERVICES)}
            >
              Services
            </span>
          </Link>
        </div>
        <Button label="Order now" type={ButtonType.PRIMARY} rounded onClick={() => {}} />
        <ShoppingCardIcon />
        <Avatar className="mr-6" withDropdown />
      </div>
    </div>
  );
};

export default Header;
