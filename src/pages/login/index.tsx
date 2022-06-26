import React, { useState } from "react";

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
      <div
        className={`${styles.div_rounded_50_0_32} ${styles.left_content} p-8 relative`}
      >
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
      </div>
      <div className="ml-40 mr-40 mt-28">
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
            <Icon icon="lab la-facebook-f" color="facebook" hoverable />
            <Icon icon="lab la-google-plus-g" color="google" hoverable />
            <Icon icon="lab la-instagram" color="instagram" hoverable />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
