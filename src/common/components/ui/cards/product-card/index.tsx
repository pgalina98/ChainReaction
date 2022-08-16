import React, { useState } from "react";

import { useDispatch } from "react-redux";

import Image from "next/image";

import { ProductColor } from "@enums/product-color";
import { LocalStorageKeys } from "@enums/local-storage-keys";

import Product from "@models/product/product.model";

import { Button, Icon, ColorPickerIcon } from "@components";

import { declassify } from "@utils/common";
import { getValueByKey, setValue } from "@utils/local-storage";

import styles from "./product-card.module.scss";
import { addItem } from "@features/cart/cart-slice";

interface ProductCardProps {
  className?: string;
  product?: Product;
}

const ProductCard = ({ className, product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState<number>(1);

  const isAvailable = (): boolean => {
    return product?.availableQuantity! > 0;
  };

  const onAddToCartButtonClick = (): void => {
    dispatch(addItem({ ...product!, quantity }));
  };

  return (
    <div
      className={`${className} ${styles.card} w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-4 px-2 relative hover:scale-105 cursor-pointer`}
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
              { bg_blue: isAvailable() },
              { "bg-red-400": !isAvailable() }
            )}
          >
            {isAvailable()
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
              icon="las la-minus"
              isDisabled={!isAvailable()}
              className={declassify(
                `p-2 rounded-md bg_blue-lighter cursor-pointer`,
                { "cursor-not-allowed": quantity === 1 }
              )}
              onClick={() => {
                if (quantity !== 1) {
                  setQuantity(quantity - 1);
                }
              }}
            />
            <div className={`${styles.min_w_12} text-xl`}>{quantity}</div>
            <Icon
              icon="las la-plus"
              isDisabled={!isAvailable()}
              className={declassify(
                `p-2 rounded-md bg_blue-lighter cursor-pointer`,
                {
                  "cursor-not-allowed": quantity === product?.availableQuantity,
                }
              )}
              onClick={() => {
                if (quantity !== product?.availableQuantity) {
                  setQuantity(quantity + 1);
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <span className="text-3xl font-semibold text-gray-900 dark:text-white">
            ${product?.price}
          </span>
          <Button
            label="Add to cart"
            className="pt-1 pb-1"
            appendIcon="las la-cart-plus ml-2"
            iconSize="text-2xl"
            isDisabled={!isAvailable()}
            onClick={onAddToCartButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
