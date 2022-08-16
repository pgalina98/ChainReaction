import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { motion } from "framer-motion";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import jwtDecode from "jwt-decode";

import {
  Button,
  Card,
  Header,
  SocialMediaIcon,
  Input,
  Toast,
  LoadingOverlay,
} from "@components";
import { useToast } from "@components/hooks/useToast";

import { InputType } from "@enums/input-type";
import { ButtonType } from "@enums/button-type";
import { ToastType } from "@enums/toast-type";
import { LocalStorageKeys } from "@enums/local-storage-keys";
import { getAuthorityByKey } from "@enums/authority";

import { messages } from "@constants/messages";

import {
  useFadeInOutLeftVariants,
  useRotateAndScaleVariants,
  useFadeInOutVariants,
  useBounce,
  useDisplayNoneOnExit,
} from "@animations";

import User, { createEmptyUserObject } from "@models/user/user.model";
import JwtToken from "@models/jwt-token/jwt-token.model";

import {
  useValidatePassword,
  useValidateUsername,
} from "@features/authentication/validators";

import { isEmpty, isNullOrUndefined, toBoolean } from "@utils/common";
import { setValue } from "@utils/local-storage";
import { createInitPagination } from "@utils/pagination";
import { createInitCart } from "@utils/cart";

import useAuthenticateUser from "@features/authentication/api/hooks/useAuthenticateUser";
import { login } from "@features/authentication/authentication-slice";

import mapJwtClaimsToUserObject from "@mappers/mapJwtClaimsToUserObject";

import notAuthenticatedBoundaryRoute from "@components/hoc/route-guards/notAuthenticatedBoundaryRoute";

import styles from "./login.module.scss";

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const [isLoadingOverlayShown, setIsLoadingOverlayShown] = useState<boolean>();

  const [user, setUser] = useState<User>(createEmptyUserObject());

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    mutate: authenticateUser,
  } = useAuthenticateUser(user);

  useEffect(() => {
    if (isNullOrUndefined(router.query.showLoadingOverlay)) {
      setIsLoadingOverlayShown(!toBoolean(router.query.showLoadingOverlay));

      setTimeout(() => {
        setIsLoadingOverlayShown(false);
      }, 2500);
    } else if (!toBoolean(router.query.showLoadingOverlay)) {
      router.push("login");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setValue(
        LocalStorageKeys.AUTHENTICATION_TOKEN,
        (data.data as JwtToken).authenticationToken
      );
      setValue(
        LocalStorageKeys.REFRESH_TOKEN,
        (data.data as JwtToken).refreshToken
      );
      setValue(
        LocalStorageKeys.PAGING_SETTINGS,
        JSON.stringify(createInitPagination())
      );

      const jwtClaims: any = jwtDecode(
        (data.data as JwtToken).authenticationToken
      );

      const user: User = mapJwtClaimsToUserObject(jwtClaims);

      dispatch(
        login({
          ...user,
          authority: getAuthorityByKey(jwtClaims["authorities"]),
        })
      );

      setValue(
        LocalStorageKeys.PAGING_SETTINGS,
        JSON.stringify(createInitPagination())
      );
      setValue(
        LocalStorageKeys.CART,
        JSON.stringify(createInitCart(user?.id!))
      );

      router.push("/");
    }
  }, [data, isSuccess]);

  useEffect(() => {
    setIsShown(isError);
  }, [isError]);

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

  const onSignInButtonClick = (): void => {
    authenticateUser();
  };

  if (isLoadingOverlayShown) return <LoadingOverlay />;

  return (
    <div className="h-full">
      <Header animated showMenu={false} />
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
          <motion.div
            className="flex justify-center"
            exit="exit"
            variants={useDisplayNoneOnExit()}
          >
            <p className="font-light text-5xl">Sign In</p>
          </motion.div>
          <motion.div
            className="absolute bottom-10"
            exit="exit"
            variants={useDisplayNoneOnExit()}
          >
            <Image
              src="/assets/shared/login.svg"
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
          className={`${styles.h_full} w-full flex flex-col justify-center items-center`}
        >
          <Card className={`${styles.card} p-6`}>
            <Input
              id="username"
              label="Username"
              placeholder="Enter username"
              prependIcon="lar la-user"
              value={user?.username}
              onChange={onUsernameChange}
              validate
              validator={useValidateUsername}
            />
            <Input
              id="password"
              label="Password"
              placeholder="Enter password"
              type={InputType.PASSWORD}
              className="mt-4"
              prependIcon="las la-unlock-alt"
              appendIcon={isPasswordVisible ? "lar la-eye" : "lar la-eye-slash"}
              appendIconClicable
              onAppendIconClick={() => onTogglePasswordVisibilityButtonClick()}
              appendIconActive={isPasswordVisible}
              value={user?.password}
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
          <Card className={`${styles.card} mt-8 p-1`}>
            <div className="flex justify-center">
              <motion.div
                initial="initial"
                animate="animate"
                variants={useFadeInOutVariants({ duration: 0.15, delay: 1 })}
              >
                <SocialMediaIcon
                  icon="lab la-facebook-f"
                  color="facebook"
                  hoverable
                />
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                variants={useFadeInOutVariants({ duration: 0.15, delay: 1.25 })}
              >
                <SocialMediaIcon
                  icon="lab la-google-plus-g"
                  color="google"
                  hoverable
                />
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                variants={useFadeInOutVariants({ duration: 0.15, delay: 1.5 })}
              >
                <SocialMediaIcon
                  icon="lab la-instagram"
                  color="instagram"
                  hoverable
                />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default notAuthenticatedBoundaryRoute(Login);
