import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Card, Header, Icon, Input, Toast } from "@components";
import { useToast } from "@components/hooks/useToast";

import User, { createEmptyUserObject } from "@models/user.model";
import JwtToken from "@models/jwt-token.model";

import { InptType } from "@enums/input-type";
import { ButtonType } from "@enums/button-type";
import { ToastType } from "@enums/toast-type";
import { LOCAL_STORAGE_KEYS } from "@enums/local-storage-keys";

import {
  useFadeInOutLeftVariants,
  useRotateAndScaleVariants,
  useFadeInOutVariants,
  useBounce,
  useDisplayNoneOnExit,
} from "@animations";

import { useValidatePassword, useValidateUsername } from "@features/login/validators";

import { isEmpty } from "@utils/common";
import { setValue } from "@utils/local-storage";

import { useAuthenticateUser } from "@features/login";

import styles from "./login.module.scss";

const Login: NextPage = () => {
  const router = useRouter();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const [user, setUser] = useState<User>(createEmptyUserObject());

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const { isLoading, isError, data, error, mutate } = useAuthenticateUser(user);

  useEffect(() => {
    if (!isEmpty(data)) {
      setValue(
        LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN,
        (data.data as JwtToken).authenticationToken
      );
      setValue(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, (data.data as JwtToken).refreshToken);

      router.push("/");
    }
  }, [data, router]);

  useEffect(() => {
    setIsShown(isError);
  }, [isError, setIsShown]);

  const onTogglePasswordVisibilityButtonClick = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onUsernameChange = (username: string): void => {
    setUser({ ...user, username });
  };

  const onPasswordChange = (password: string): void => {
    setUser({ ...user, password });
  };

  const isSignInButtonDisabled = (): boolean => {
    return isEmpty(user.username) || isEmpty(user.password) || isLoading;
  };

  const onSignInButtonClick = () => {
    mutate();
  };

  return (
    <div>
      <Header animated />
      <div className={`${styles.h_full} grid grid-cols-2 gap-4`}>
        {isError && (
          <Toast
            type={ToastType.DANGER}
            message={error.response.data.message}
            isShown={isShown}
            hideToast={() => setIsShown(false)}
          />
        )}
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
              onChange={onUsernameChange}
              validate
              validator={useValidateUsername}
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
              onAppendIconClick={() => onTogglePasswordVisibilityButtonClick()}
              appendIconActive={isPasswordVisible}
              onChange={onPasswordChange}
              validate
              validator={useValidatePassword}
            />
            <Button
              className="mt-4 w-full"
              label="Sign In"
              type={ButtonType.DARK}
              onClick={onSignInButtonClick}
              isLoading={isLoading}
              isDisabled={isSignInButtonDisabled()}
            />
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
