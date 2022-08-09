import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Card, Header, Input, Toast } from "@components";
import { useToast } from "@components/hooks/useToast";

import { InptType } from "@enums/input-type";
import { ButtonType } from "@enums/button-type";
import { ToastType } from "@enums/toast-type";

import { messages } from "@constants/messages";

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

import notAuthenticatedBoundaryRoute from "@components/hoc/route-guards/notAuthenticatedBoundaryRoute";

import styles from "./register.module.scss";

const Register: NextPage = () => {
  const router = useRouter();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const [user, setUser] = useState<User>(createEmptyUserObject());
  const [isFormInvalid, setIsFormInvalid] = useState<boolean>(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    mutate: registerUser,
  } = useRegisterUser(user);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/login");
      }, 4000);
    }
  }, [isSuccess]);

  useEffect(() => {
    setIsShown(isError || isSuccess);
  }, [isError, isSuccess]);

  const onTogglePasswordVisibilityClick = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const navigateToLoginPage = () => {
    router.push({ pathname: "/login", query: { showLoadingOverlay: false } });
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

  const onConfirmationPasswordChange = (confirmationPassword: string): void => {
    setUser({ ...user, confirmationPassword });
  };

  const isConfirmationPasswordMatchedWithPassword = (): boolean => {
    return user.password === user.confirmationPassword;
  };

  const isSignUpButtonDisabled = (): boolean => {
    return (
      isEmpty(user.fullname) ||
      isEmpty(user.username) ||
      isEmpty(user.email) ||
      isEmpty(user.password) ||
      isFormInvalid ||
      !isConfirmationPasswordMatchedWithPassword() ||
      isLoading
    );
  };

  const onSignUpButtonClick = (): void => {
    registerUser();
  };

  return (
    <div>
      <Header animated showMenu={false} />
      <div className={`${styles.h_full} grid grid-cols-2 gap-4`}>
        {isError && (
          <Toast
            type={ToastType.DANGER}
            message={
              error.response.data?.message || messages.INTERNAL_SERVER_ERROR
            }
            isShown={isShown}
            hideToast={() => setIsShown(false)}
          />
        )}
        {isSuccess && (
          <Toast
            type={ToastType.SUCCESS}
            message={messages.ACCOUNT_SUCCESSFULLY_CREATED}
            isShown={isShown}
            hideToast={() => setIsShown(false)}
          />
        )}
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutVariants({
            duration: 0.5,
            delay: 0.6,
            exit: { opacity: 0 },
          })}
          className={`${styles.h_full} w-full flex flex-col justify-center items-center`}
        >
          <Card className={`${styles.card} p-6`}>
            <Input
              id="fullname"
              label="Full name"
              placeholder="Enter full name"
              prependIcon="las la-id-card"
              onChange={onFullnameChange}
              validate
              validator={useValidateFullname}
              onValidationStateChange={(isInvalid: boolean) => {
                setIsFormInvalid(isInvalid);
              }}
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
              onValidationStateChange={(isInvalid: boolean) => {
                setIsFormInvalid(isInvalid);
              }}
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
              onValidationStateChange={(isInvalid: boolean) => {
                setIsFormInvalid(isInvalid);
              }}
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
              onValidationStateChange={(isInvalid: boolean) => {
                setIsFormInvalid(isInvalid);
              }}
            />
            <Input
              id="confirmation_passwprd"
              label="Password confirmation"
              placeholder="Confirm password"
              type={InptType.PASSWORD}
              className="mt-4"
              prependIcon="las la-unlock-alt"
              appendIcon={
                isConfirmPasswordVisible ? "lar la-eye" : "lar la-eye-slash"
              }
              appendIconClicable
              onAppendIconClick={() =>
                onToggleConfirmationPasswordVisibilityClick()
              }
              appendIconActive={isConfirmPasswordVisible}
              onChange={onConfirmationPasswordChange}
              validate
              validator={useValidateConfirmationPassword}
              additionalValidationData={user.password}
              onValidationStateChange={(isInvalid: boolean) => {
                setIsFormInvalid(isInvalid);
              }}
            />
            <Button
              className="mt-4 w-full"
              label="Sign Up"
              type={ButtonType.DARK}
              onClick={() => onSignUpButtonClick()}
              isLoading={isLoading}
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
          <motion.div
            animate="animate"
            exit="exit"
            whileHover={useBounce({ repeat: Infinity })}
            variants={useRotateAndScaleVariants()}
            className={`absolute left-0 -ml-5 p-2 text-4xl rounded-full flex justify-center content-center ${styles.icon_arrow}`}
            onClick={navigateToLoginPage}
          >
            <i className="las la-chevron-circle-right" />
          </motion.div>
          <motion.div
            className="flex justify-center"
            exit="exit"
            variants={useDisplayNoneOnExit()}
          >
            <p className="font-light text-5xl">Sign Up</p>
          </motion.div>
          <motion.div
            className="absolute bottom-10"
            exit="exit"
            variants={useDisplayNoneOnExit()}
          >
            <Image
              src="/assets/shared/register.svg"
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

export default notAuthenticatedBoundaryRoute(Register);
