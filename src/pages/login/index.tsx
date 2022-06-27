import React, { useState } from "react";

import { motion } from "framer-motion";

import { Button, Card, Icon, Input } from "common/components";

import { InptType } from "common/types/inputy-type";
import { ButtonType } from "common/types/button-type";

import Image from "next/image";

import styles from "./login.module.scss";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleTogglePasswordVisibilityClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={`${styles.h_full} grid grid-cols-2 gap-4`}>
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`${styles.div_rounded_50_0_32} ${styles.left_content} p-8 relative`}
      >
        <motion.div
          animate={{
            scale: [1, 2, 2, 2, 1],
            rotate: [0, 0, 360, 360, 0],
            borderRadius: ["25%", "25%", "50%", "50%", "50%"],
          }}
          className={`absolute right-0 -mr-5 p-2 text-4xl rounded-full flex justify-center content-center ${styles.icon_arrow} ${styles.animation_bounce}`}
        >
          <i className="las la-chevron-circle-right" />
        </motion.div>
        <div className="flex justify-center">
          <p className="font-light text-5xl">Sign In</p>
        </div>
        <div className="absolute bottom-10">
          <Image
            src="/assets/login.svg"
            alt="Login illustration"
            width={550}
            height={550}
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duratin: 0.5 }}
        className="ml-40 mr-40 mt-28"
      >
        <Card className="w-full">
          <Input
            label="Username"
            placeholder="Enter username"
            prependIcon="lar la-user"
          />
          <Input
            label="Password"
            placeholder="Enter password"
            type={InptType.PASSWORD}
            prependIcon="las la-unlock-alt"
            appendIcon={isPasswordVisible ? "lar la-eye" : "lar la-eye-slash"}
            appendIconClicable
            onAppendIconClick={() => handleTogglePasswordVisibilityClick()}
            appendIconActive={isPasswordVisible}
            className="mt-4"
          />
          <Button
            className="mt-4 w-full"
            label="Sign In"
            type={ButtonType.DARK}
          />
          <div className="flex justify-center mt-3">
            <a className="hover:cursor-pointer font-semibold hover:text-gray-700">
              Forgot password?
            </a>
          </div>
          <div className="flex justify-center mt-3">
            <p>{"Don't have an account?"}</p>
            <a className="ml-2 hover:cursor-pointer font-semibold hover:text-gray-700">
              Sign up here
            </a>
          </div>
        </Card>
        <Card className="w-full mt-8 p-1">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duratin: 0.15 }}
            >
              <Icon icon="lab la-facebook-f" color="facebook" hoverable />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duratin: 0.15 }}
            >
              <Icon icon="lab la-google-plus-g" color="google" hoverable />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.55, duratin: 0.15 }}
            >
              <Icon icon="lab la-instagram" color="instagram" hoverable />
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
