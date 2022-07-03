import React, { useState } from "react";

import { motion } from "framer-motion";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button, Card, Icon, Input } from "common/components";

import { InptType } from "common/types/input-type";
import { ButtonType } from "common/types/button-type";

import {
  useFadeInOutRightVariants,
  useRotateAndScaleVariants,
  useFadeInOutVariants,
  useBounce,
} from "common/animations";

import styles from "./register.module.scss";

const Register: NextPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

  const handleTogglePasswordVisibilityClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleToggleConfirmPasswordVisibilityClick = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <div className={`${styles.h_full} grid grid-cols-2 gap-4`}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={useFadeInOutVariants({ duration: 0.5, delay: 0.6 })}
        className="ml-40 mr-40 mt-12"
      >
        <Card className="w-full">
          <Input label="Full name" placeholder="Enter full name" prependIcon="las la-id-card" />
          <Input
            label="Username"
            placeholder="Enter username"
            prependIcon="lar la-user"
            className="mt-4"
          />
          <Input
            label="E-mail"
            placeholder="Enter e-mail"
            prependIcon="lar la-envelope"
            className="mt-4"
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
          <Input
            label="Password confirmation"
            placeholder="Confirm password"
            type={InptType.PASSWORD}
            prependIcon="las la-unlock-alt"
            appendIcon={isConfirmPasswordVisible ? "lar la-eye" : "lar la-eye-slash"}
            appendIconClicable
            onAppendIconClick={() => handleToggleConfirmPasswordVisibilityClick()}
            appendIconActive={isConfirmPasswordVisible}
            className="mt-4"
          />
          <Button className="mt-4 w-full" label="Sign Up" type={ButtonType.DARK} />
          <div className="flex justify-center mt-3">
            <p>{"Already have an account?"}</p>
            <Link href="/login">
              <a className="ml-2 hover:cursor-pointer font-semibold hover:text-gray-700">
                Sign in here
              </a>
            </Link>
          </div>
        </Card>
      </motion.div>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={useFadeInOutRightVariants({ duration: 0.5 })}
        className={`${styles.div_rounded_tr_bl_0_50_32} ${styles.right_content} p-8 relative`}
      >
        <Link href="/login">
          <motion.div
            animate="animate"
            exit="exit"
            whileHover={useBounce({ repeat: Infinity })}
            variants={useRotateAndScaleVariants()}
            className={`absolute left-0 -ml-5 p-2 text-4xl rounded-full flex justify-center content-center ${styles.icon_arrow}`}
          >
            <i className="las la-chevron-circle-right" />
          </motion.div>
        </Link>
        <div className="flex justify-center">
          <p className="font-light text-5xl">Sign Up</p>
        </div>
        <div className="absolute bottom-10">
          <Image src="/assets/register.svg" alt="Register illustration" width={550} height={550} />
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
