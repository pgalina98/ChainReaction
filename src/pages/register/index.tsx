import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Card, Header, Input } from "@components";
import { useToast } from "@components/hooks/useToast";

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
} from "@features/registration/validators";

import { isEmpty } from "@utils/common";

import useRegisterUser from "@features/registration/api/hooks/useRegisterUser";

import styles from "./register.module.scss";

const Register: NextPage = () => {
  const router = useRouter();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const [user, setUser] = useState<User>(createEmptyUserObject());

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

  const { isLoading, isError, data, error, mutate } = useRegisterUser(user);

  const onTogglePasswordVisibilityClick = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onToggleConfirmationPasswordVisibilityClick = (): void => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const onFullnameChange = (fullname: string): void => {
    setUser({ ...user, fullname });
  };

  const onUsernameChange = (username: string): void => {
    setUser({ ...user, username });
  };

  const onEmailChange = (email: string): void => {
    setUser({ ...user, email });
  };

  const onPasswordChange = (password: string): void => {
    setUser({ ...user, password });
  };

  const isSignUpButtonDisabled = (): boolean => {
    return (
      isEmpty(user.fullname) ||
      isEmpty(user.username) ||
      isEmpty(user.email) ||
      isEmpty(user.password) ||
      isLoading
    );
  };

  const onSignUpButtonClick = (): void => {
    mutate();
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
          className={`${styles.w_60_percentage} m-auto mt-12`}
        >
          <Card className="w-full p-6">
            <Input
              id="full_name"
              label="Full name"
              placeholder="Enter full name"
              prependIcon="las la-id-card"
              onChange={onFullnameChange}
              validate
              validator={useValidateFullname}
            />
            <Input
              id="username"
              label="Username"
              placeholder="Enter username"
              className="mt-4"
              prependIcon="lar la-user"
              onChange={onUsernameChange}
              validate
              validator={useValidateUsername}
            />
            <Input
              id="email"
              label="E-mail"
              placeholder="Enter e-mail"
              className="mt-4"
              prependIcon="lar la-envelope"
              onChange={onEmailChange}
              validate
              validator={useValidateEmail}
            />
            <Input
              id="password"
              label="Password"
              placeholder="Enter password"
              type={InptType.PASSWORD}
              className="mt-4"
              prependIcon="las la-unlock-alt"
              appendIcon={isPasswordVisible ? "lar la-eye" : "lar la-eye-slash"}
              appendIconClicable
              onAppendIconClick={() => onTogglePasswordVisibilityClick()}
              appendIconActive={isPasswordVisible}
              onChange={onPasswordChange}
              validate
              validator={useValidatePassword}
            />
            <Input
              id="confirmation_passwprd"
              label="Password confirmation"
              placeholder="Confirm password"
              type={InptType.PASSWORD}
              className="mt-4"
              prependIcon="las la-unlock-alt"
              appendIcon={isConfirmPasswordVisible ? "lar la-eye" : "lar la-eye-slash"}
              appendIconClicable
              onAppendIconClick={() => onToggleConfirmationPasswordVisibilityClick()}
              appendIconActive={isConfirmPasswordVisible}
              validate
              validator={useValidateConfirmationPassword}
              additionalValidationData={user.password}
            />
            <Button
              className="mt-4 w-full"
              label="Sign Up"
              type={ButtonType.DARK}
              onClick={() => onSignUpButtonClick()}
              isLoading={false}
              isDisabled={isSignUpButtonDisabled()}
            />
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
