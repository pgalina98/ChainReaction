import React, { useState } from "react";

import { motion } from "framer-motion";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button, Card, Header, Icon, Input, Toast } from "@components";

import { InptType } from "@enums/input-type";
import { ButtonType } from "@enums/button-type";

import {
  useFadeInOutLeftVariants,
  useRotateAndScaleVariants,
  useFadeInOutVariants,
  useBounce,
  useDisplayNoneOnExit,
} from "@animations";

import styles from "./login.module.scss";

const Login: NextPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleTogglePasswordVisibilityClick = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <Header animated />
      <div className={`${styles.h_full} grid grid-cols-2 gap-4`}>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutLeftVariants({ duration: 0.5 })}
          className={`${styles.div_rounded_br_tl_50_0_32} ${styles.left_content} p-8 relative`}
        >
          <Link href="/register">
            <motion.div
              animate="animate"
              exit="exit"
              whileHover={useBounce({ repeat: Infinity })}
              variants={useRotateAndScaleVariants()}
              className={`absolute right-0 -mr-5 p-2 text-4xl rounded-full flex justify-center content-center ${styles.icon_arrow}`}
            >
              <i className="las la-chevron-circle-right" />
            </motion.div>
          </Link>
          <motion.div className="flex justify-center" exit="exit" variants={useDisplayNoneOnExit()}>
            <p className="font-light text-5xl">Sign In</p>
          </motion.div>
          <motion.div className="absolute bottom-10" exit="exit" variants={useDisplayNoneOnExit()}>
            <Image
              src="/assets/login.svg"
              alt="Login illustration"
              width={550}
              height={550}
              priority
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutVariants({ duration: 0.5, delay: 0.6 })}
          className={`${styles.w_60_percentage} m-auto mt-24`}
        >
          <Card className="w-full p-6">
            <Input
              id="username"
              label="Username"
              placeholder="Enter username"
              prependIcon="lar la-user"
            />
            <Input
              id="password"
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
            <Button className="mt-4 w-full" label="Sign In" type={ButtonType.DARK} />
            <div className="flex justify-center mt-3">
              <a className="hover:cursor-pointer font-semibold hover:text-gray-700">
                Forgot password?
              </a>
            </div>
            <div className="flex justify-center mt-3">
              <p>{"Don't have an account?"}</p>
              <Link href="/register">
                <a className="ml-2 hover:cursor-pointer font-semibold hover:text-gray-700">
                  Sign up here
                </a>
              </Link>
            </div>
          </Card>
          <Card className="w-full mt-8 p-1">
            <div className="flex justify-center">
              <motion.div
                initial="initial"
                animate="animate"
                variants={useFadeInOutVariants({ duration: 0.15, delay: 1 })}
              >
                <Icon icon="lab la-facebook-f" color="facebook" hoverable />
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                variants={useFadeInOutVariants({ duration: 0.15, delay: 1.25 })}
              >
                <Icon icon="lab la-google-plus-g" color="google" hoverable />
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                variants={useFadeInOutVariants({ duration: 0.15, delay: 1.5 })}
              >
                <Icon icon="lab la-instagram" color="instagram" hoverable />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
