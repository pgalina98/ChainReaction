import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button, Card, Header, Input } from "@components";

import { InptType } from "@enums/input-type";
import { ButtonType } from "@enums/button-type";

import {
  useFadeInOutRightVariants,
  useRotateAndScaleVariants,
  useFadeInOutVariants,
  useBounce,
  useDisplayNoneOnExit,
} from "@animations";

import User, { createEmptyUserObject } from "@models/user.model";

import {
  useValidateFullname,
  useValidateUsername,
  useValidateEmail,
  useValidatePassword,
  useValidateConfirmationPassword,
} from "@features/register/validators";

import styles from "./register.module.scss";

const Register: NextPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

  const [user, setUser] = useState<User>(createEmptyUserObject());

  const handleTogglePasswordVisibilityClick = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleToggleConfirmationPasswordVisibilityClick = (): void => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleFullnameChange = (fullname: string): void => {
    setUser({ ...user, fullname });
  };

  const handleUsernameChange = (username: string): void => {
    setUser({ ...user, username });
  };

  const handleEmailChange = (email: string): void => {
    setUser({ ...user, email });
  };

  const handlePasswordChange = (password: string): void => {
    setUser({ ...user, password });
  };

  return (
    <div>
      <Header animated />
      <div className={`${styles.h_full} grid grid-cols-2 gap-4`}>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutVariants({ duration: 0.5, delay: 0.6, exit: { opacity: 0 } })}
          className="ml-40 mr-40 mt-10"
        >
          <Card className="w-full p-6">
            <Input
              id="fullname"
              label="Fullname"
              placeholder="Enter fullname"
              prependIcon="las la-id-card"
              onChange={handleFullnameChange}
              validator={useValidateFullname}
            />
            <Input
              id="username"
              label="Username"
              placeholder="Enter username"
              prependIcon="lar la-user"
              className="mt-4"
              onChange={handleUsernameChange}
              validator={useValidateUsername}
            />
            <Input
              id="email"
              label="E-mail"
              placeholder="Enter e-mail"
              prependIcon="lar la-envelope"
              className="mt-4"
              onChange={handleEmailChange}
              validator={useValidateEmail}
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
              onChange={handlePasswordChange}
              validator={useValidatePassword}
            />
            <Input
              id="confirmation_passwprd"
              label="Password confirmation"
              placeholder="Confirm password"
              type={InptType.PASSWORD}
              prependIcon="las la-unlock-alt"
              appendIcon={isConfirmPasswordVisible ? "lar la-eye" : "lar la-eye-slash"}
              appendIconClicable
              onAppendIconClick={() => handleToggleConfirmationPasswordVisibilityClick()}
              appendIconActive={isConfirmPasswordVisible}
              className="mt-4"
              validator={useValidateConfirmationPassword}
              additionalValidationData={user.password}
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
          <motion.div className="flex justify-center" exit="exit" variants={useDisplayNoneOnExit()}>
            <p className="font-light text-5xl">Sign Up</p>
          </motion.div>
          <motion.div className="absolute bottom-10" exit="exit" variants={useDisplayNoneOnExit()}>
            <Image
              src="/assets/register.svg"
              alt="Register illustration"
              width={550}
              height={550}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
