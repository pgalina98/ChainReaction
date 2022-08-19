import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import Image from "next/image";
import { useRouter } from "next/router";

import { ProductColor } from "@enums/product-color";
import { ButtonType } from "@enums/button-type";

import Product from "@models/product/product.model";

import { Button, Icon, ColorPickerIcon } from "@components";

import { declassify, isNullOrUndefined } from "@utils/common";
import { formatNumberToCurrency } from "@utils/currency";
import { isProductAvailable } from "@utils/shared";
import { getCartItemByIdProduct } from "@utils/cart";

import {
  addItem,
  CartItem,
  CartState,
  removeItem,
  updateItem,
} from "@features/cart/cart-slice";

import styles from "./product-card.module.scss";

interface ProductCardProps {
  className?: string;
  product?: Product;
  cart: CartState;
}

const ProductCard = ({ className, product, cart }: ProductCardProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(1);
  const [cartItem, setCartItem] = useState<CartItem>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    setCartItem(getCartItemByIdProduct(product?.idProduct!)!);
  }, [cart, product]);

  useEffect(() => {
    setQuantity(cartItem?.quantity || 1);
  }, [cartItem]);

  const onAddToCartButtonClick = (): void => {
    dispatch(addItem({ ...product!, quantity }));
    showLoader();
  };

  const onRemoveFromCartButtonClick = (): void => {
    dispatch(removeItem(product!));
    showLoader();
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

  const showLoader = (): void => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  const isMinusButtonDisabled = (): boolean => {
    return quantity === 1;
  };

  const isPlusButtonDisabled = (): boolean => {
    return quantity === product?.availableQuantity;
  };

  const navigateToProductDetails = (): void => {
    router.push(`/bikes/${product?.idProduct}`);
  };

  return (
    <div
      className={`${className} ${styles.card} w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-4 px-2 relative hover:scale-105 cursor-pointer`}
      onClick={navigateToProductDetails}
    >
      <div className="absolute right-4 top-2 flex items-center mt-2.5 mb-5">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
          5.0
        </span>
        <Icon
          icon="las la-heart text-xl"
          className="pl-1 pr-1 bg_gray rounded-md cursor-pointer text-red-400"
        />
      </div>
      <div className="mt-4 ml-2">
        {product?.imagePath && (
          <Image
            src={product?.imagePath!}
            alt="Product image"
            width={235}
            height={130}
            priority
          />
        )}
      </div>
      <div className="px-5 mb-2 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {`${product?.name} ${product?.model}`}
            </h5>
            <h5 className="text-base font-thin tracking-tight text-gray-900 dark:text-white">
              {product?.type?.value}
            </h5>
          </div>
          <div
            className={declassify(
              `p-1 pl-4 pr-4 h-8 rounded-lg text-white font-thin`,
              { bg_blue: isProductAvailable(product!) },
              { "bg-red-400": !isProductAvailable(product!) }
            )}
          >
            {isProductAvailable(product!)
              ? `${product?.availableQuantity} available`
              : "Out of Stock"}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-row w-40 space-x-6">
            <ColorPickerIcon
              className="border-2 border-gray-300"
              color="WHITE"
              isSelected={product?.color?.idProductColor === ProductColor.WHITE}
              isAvailable={false}
            />
            <ColorPickerIcon
              className="border-2 border-gray-300"
              color="GRAY-DARK"
              isSelected={
                product?.color?.idProductColor === ProductColor.GRAY_DARK
              }
              isAvailable={false}
            />
            <ColorPickerIcon
              className="border-2 border-gray-300"
              color="BLACK"
              isSelected={product?.color?.idProductColor === ProductColor.BLACK}
              isAvailable={false}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Icon
              icon="las la-minus text-black"
              isDisabled={
                !isProductAvailable(product!) || isMinusButtonDisabled()
              }
              className={declassify(
                `p-2 rounded-md bg_blue-lighter cursor-pointer`,
                { "cursor-not-allowed": isMinusButtonDisabled() }
              )}
              onClick={(event: any) => {
                event.stopPropagation();
                if (!isMinusButtonDisabled()) {
                  onMinusButtonClick();
                }
              }}
            />
            <div className={`${styles.min_w_12} text-xl`}>{quantity}</div>
            <Icon
              icon="las la-plus text-black"
              isDisabled={
                !isProductAvailable(product!) || isPlusButtonDisabled()
              }
              className={declassify(
                `p-2 rounded-md bg_blue-lighter cursor-pointer`,
                {
                  "cursor-not-allowed": isPlusButtonDisabled(),
                }
              )}
              onClick={(event: any) => {
                event.stopPropagation();
                if (!isPlusButtonDisabled()) {
                  onPlusButtonClick();
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <span
            className={`${styles.price} font-semibold text-gray-900 dark:text-white`}
          >
            {formatNumberToCurrency(product?.price!)}
          </span>
          {isNullOrUndefined(cartItem) ? (
            <Button
              label="Add"
              className="pt-1 pb-1"
              appendIcon="las la-cart-plus ml-2"
              iconSize="text-2xl"
              loaderWithLabel={false}
              isDisabled={!isProductAvailable(product!)}
              isLoading={isProcessing}
              onClick={(event: any) => {
                event.stopPropagation();
                onAddToCartButtonClick();
              }}
            />
          ) : (
            <Button
              label="Remove"
              className="pt-1 pb-1"
              type={ButtonType.DANGER}
              appendIcon="las la-cart-arrow-down ml-2"
              iconSize="text-2xl"
              loaderWithLabel={false}
              isLoading={isProcessing}
              onClick={(event: any) => {
                event.stopPropagation();
                onRemoveFromCartButtonClick();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
