import React, { useEffect, useState } from "react";

import { NextPage } from "next";

import { connect, useDispatch } from "react-redux";

import { motion } from "framer-motion";

import { useRouter } from "next/router";
import Image from "next/image";

import { ToastType } from "@enums/toast-type";
import { ProductColor } from "@enums/product-color";

import Product from "@models/product/product.model";
import {
  addItem,
  CartItem,
  removeItem,
  updateItem,
} from "@features/cart/cart-slice";
import { RootState } from "@store/index";

import { messages } from "@constants/messages";

import { formatNumberToCurrency } from "@utils/currency";
import {
  calcluateProgressBarValue,
  getMirroredImagePath,
  isProductAvailable,
} from "@utils/shared";
import { declassify, isNullOrUndefined } from "@utils/common";
import { getCartItemByIdProduct } from "@utils/cart";

import { useFadeInOutRightVariants, useFadeInOutVariants } from "@animations";

import {
  BackIcon,
  Card,
  ColorPickerIcon,
  Header,
  Icon,
  Loader,
  LoadingOverlay,
  ProgressBar,
  Toast,
  Tooltip,
} from "@components";
import { useToast } from "@components/hooks/useToast";
import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

import useFetchProductById from "@features/product/api/hooks/useFetchProductById";

import styles from "./bikes.module.scss";

interface BikeDetailsProps extends StateProps {}

const BikeDetails: NextPage<BikeDetailsProps> = ({
  cart,
}: BikeDetailsProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const { id: idProduct } = router?.query;

  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const [cartItem, setCartItem] = useState<CartItem>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [sendNotification, setSendNotification] = useState<boolean>(false);

  const { isLoading, isError, data, error, refetch } = useFetchProductById(
    idProduct as string
  );

  useEffect(() => {
    if (router?.isReady) {
      refetch();
    }
  }, [router.isReady]);

  useEffect(() => {
    setProduct(data?.data);
  }, [data]);

  useEffect(() => {
    setCartItem(getCartItemByIdProduct(product?.idProduct!)!);
  }, [cart, product]);

  useEffect(() => {
    setQuantity(cartItem?.quantity || 1);
  }, [cartItem]);

  useEffect(() => {
    setIsShown(isError);
  }, [isError]);

  const isMinusButtonDisabled = (): boolean => {
    return quantity === 1;
  };

  const isPlusButtonDisabled = (): boolean => {
    return quantity === product?.availableQuantity;
  };

  const isProductOutOfStock = (): boolean => {
    return product?.availableQuantity === 0;
  };

  const onMinusButtonClick = (): void => {
    if (isNullOrUndefined(cartItem)) {
      setQuantity(quantity - 1);
    } else {
      dispatch(updateItem({ ...cartItem!, quantity: cartItem?.quantity! - 1 }));
    }
  };

  const onPlusButtonClick = (): void => {
    if (isNullOrUndefined(cartItem)) {
      setQuantity(quantity + 1);
    } else {
      dispatch(updateItem({ ...cartItem!, quantity: cartItem?.quantity! + 1 }));
    }
  };

  const onAddToCartButtonClick = (): void => {
    dispatch(addItem({ ...product!, quantity }));
    showLoader();
  };

  const onRemoveFromCartButtonClick = (): void => {
    dispatch(removeItem(product!));
    showLoader();
  };

  const showLoader = (): void => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  const navigateToPreviousPage = () => {
    router.back();
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
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
      <div className="grid grid-cols-2 text-white">
        <div className={`${styles.h_full} bg_primary overflow-hidden`}>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5 })}
          >
            <BackIcon
              className="flex justify-end mt-4 mr-12 text-xl"
              onClick={navigateToPreviousPage}
            />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5 })}
            className="ml-12 max-w-xl"
          >
            <p className="text-6xl font_secondary">{`${product?.name}. ${product?.model}`}</p>
            <p className="text-4xl mt-2">{product?.description}</p>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5 })}
            >
              <span className="mt-6 flex">
                <p className="text-4xl font_secondary">
                  {formatNumberToCurrency(product?.price!)}
                </p>
              </span>
            </motion.div>
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({ duration: 0.5, delay: 0.5 })}
            className={`relative ${styles.mirrored_image_position}`}
          >
            {product?.imagePath && (
              <Image
                src={getMirroredImagePath(product?.imagePath!)}
                alt="Cowboy e-bike image"
                width={1920}
                height={1064}
                priority
              />
            )}
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5 })}
            className={declassify("absolute bottom-0 left-0 mb-8 ml-8", {
              hidden: !isProductOutOfStock(),
            })}
          >
            {sendNotification ? (
              <Tooltip message={"Don't notify me"}>
                <div
                  className="w-11 h-11 bg_white rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => setSendNotification(false)}
                >
                  <Icon icon="las la-bell-slash text-3xl text-black" />
                </div>
              </Tooltip>
            ) : (
              <Tooltip message={"Notify me"}>
                <div
                  className="w-11 h-11 bg_white rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => setSendNotification(true)}
                >
                  <span className="absolute flex h-3 w-3 top-2 right-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                  <Icon icon="las la-bell text-3xl text-black" />
                </div>
              </Tooltip>
            )}
          </motion.div>
        </div>
        <div className={`${styles.h_full} bg_brown`}>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5, delay: 1 })}
            className="p-8 pt-16"
          >
            <div className="pl-6 pr-6 text-2xl mb-4">Specifications</div>
            <div className="flex justify-center space-x-12">
              <Card className="p-4 pl-6 pr-6 w-48 h-32 text-black ">
                <p className="text-xl font-light">{`${product?.assistSpeed} km/h`}</p>
                <p className="text-gray text-sm font-thin">Assist Speed</p>
                <ProgressBar
                  value={calcluateProgressBarValue(product?.assistSpeed!, 35)}
                />
              </Card>
              <Card className="p-4 pl-6 pr-6 w-48 h-32 text-black ">
                <p className="text-xl font-light">{`${product?.batteryRange} km`}</p>
                <p className="text-gray text-sm font-thin">Battery Range</p>
                <ProgressBar
                  value={calcluateProgressBarValue(product?.batteryRange!, 100)}
                />
              </Card>
              <Card className="p-4 pl-6 pr-6 w-48 h-32 text-black ">
                <p className="text-xl font-light">{`${product?.weight} kg`}</p>
                <p className="text-gray text-sm font-thin">Weight</p>
                <ProgressBar
                  value={calcluateProgressBarValue(product?.weight!, 22.4)}
                />
              </Card>
            </div>
            <div className="mt-16">
              <div className="pl-6 pr-6 text-2xl mb-4">Color</div>
              <div className="pl-6 pr-6 flex flex-row space-x-6">
                <ColorPickerIcon
                  className="border-2 border-gray-300"
                  color="WHITE"
                  size="h-10 w-10"
                  isSelected={
                    product?.color?.idProductColor === ProductColor.WHITE
                  }
                  isAvailable={false}
                />
                <ColorPickerIcon
                  className="border-2 border-gray-300"
                  color="GRAY-DARK"
                  size="h-10 w-10"
                  isSelected={
                    product?.color?.idProductColor === ProductColor.GRAY_DARK
                  }
                  isAvailable={false}
                />
                <ColorPickerIcon
                  className="border-2 border-gray-300"
                  color="BLACK"
                  size="h-10 w-10"
                  isSelected={
                    product?.color?.idProductColor === ProductColor.BLACK
                  }
                  isAvailable={false}
                />
              </div>
            </div>
            <div className="mt-16">
              <div className="pl-6 pr-6 text-2xl mb-4">Quantity</div>
              <div className="pl-6 pr-6 flex items-center space-x-6">
                <Icon
                  icon="las la-minus text-black text-xl pl-3 pr-3"
                  isDisabled={
                    !isProductAvailable(product!) || isMinusButtonDisabled()
                  }
                  className={declassify(
                    `p-2 rounded-md bg_blue-lighter cursor-pointer`,
                    { "cursor-not-allowed": isMinusButtonDisabled() }
                  )}
                  onClick={() => {
                    if (!isMinusButtonDisabled()) {
                      onMinusButtonClick();
                    }
                  }}
                />
                <div className={`${styles.min_w_12} text-3xl`}>
                  {quantity || 1}
                </div>
                <Icon
                  icon="las la-plus text-black text-xl pl-3 pr-3"
                  isDisabled={
                    !isProductAvailable(product!) || isPlusButtonDisabled()
                  }
                  className={declassify(
                    `p-2 rounded-md bg_blue-lighter cursor-pointer`,
                    {
                      "cursor-not-allowed": isPlusButtonDisabled(),
                    }
                  )}
                  onClick={() => {
                    if (!isPlusButtonDisabled()) {
                      onPlusButtonClick();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex absolute bottom-0 left-1/2 w-full h-16 text-black text-lg bg_white">
              <div className="flex items-center justify-center w-1/4 text-black uppercase bg_gray">
                {isProductOutOfStock() ? (
                  <React.Fragment>
                    <div>Out of Stock</div>
                    <Icon icon="las la-exclamation text-2xl" />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div>{`Only ${product?.availableQuantity} products available`}</div>
                    <Icon icon="las la-exclamation text-2xl" />
                    <Icon icon="las la-shipping-fast text-2xl" />
                  </React.Fragment>
                )}
              </div>
              {isProcessing && (
                <div className="flex items-center justify-center w-1/4">
                  <Loader withLabel={false} />
                </div>
              )}
              {isNullOrUndefined(cartItem) ? (
                <div
                  className={declassify(
                    `flex items-center justify-center w-1/4 uppercase cursor-pointer hover:bg-gray-200`,
                    { hidden: isProcessing },
                    {
                      "cursor-not-allowed bg-gray-200": isProductOutOfStock(),
                    }
                  )}
                  onClick={() => {
                    if (!isProductOutOfStock()) {
                      onAddToCartButtonClick();
                    }
                  }}
                >
                  Add to cart
                  <Icon icon="las la-cart-plus ml-3 text-2xl" />
                </div>
              ) : (
                <div
                  className={declassify(
                    `flex items-center justify-center w-1/4 uppercase cursor-pointer bg-red-400 hover:bg-red-500 text-white`,
                    { hidden: isProcessing }
                  )}
                  onClick={onRemoveFromCartButtonClick}
                >
                  Remove from cart
                  <Icon icon="las la-cart-plus ml-3 text-2xl" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }: RootState) => ({
  cart,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default authenticatedBoundaryRoute(
  connect(mapStateToProps)(BikeDetails)
);
