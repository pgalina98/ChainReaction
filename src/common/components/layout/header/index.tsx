import React from "react";

import { motion } from "framer-motion";

import Image from "next/image";

import { useFadeInOutLeftVariants, useFadeInOutTopVariants } from "@animations";

import styles from "./header.module.scss";

interface HeaderProps {
  animated: boolean;
}

const Header = ({ animated = false }) => {
  return (
    <div className={`${styles.header} flex items-center`}>
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
  );
};

export default Header;
