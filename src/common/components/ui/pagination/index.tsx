import React from "react";

import Pagination from "@models/pagination/pagination.model";

import { declassify, range } from "@utils/common";

interface PaginationProps {
  className?: string;
  pagination: Pagination;
  onPageChange: any;
}

const Pagination = ({
  className,
  pagination,
  onPageChange,
}: PaginationProps) => {
  const maxPages = Math.ceil(pagination?.totalElements / pagination?.size);

  if (pagination.page > maxPages || pagination.page < 1) {
    onPageChange(1);
  }

  if (pagination.page > maxPages) {
    onPageChange(maxPages);
  }

  const isActive = (page: number): boolean => {
    return page === pagination.page;
  };

  const renderPages = (): JSX.Element[] => {
    if (maxPages < 10) {
      return range(1, maxPages).map((page) => (
        <li key={page}>
          <a
            className={declassify(
              `py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer`,
              {
                "z-10 text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 font-bold":
                  isActive(page),
              }
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ));
    }

    if (pagination?.page < 5) {
      return range(1, 5).map((page) => (
        <li key={page}>
          <a
            className={declassify(
              `py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer`,
              {
                "z-10 text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 font-bold":
                  isActive(page),
              }
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ));
    }

    if (pagination?.page > maxPages - 4) {
      return range(maxPages - 4, maxPages).map((page) => (
        <li key={page}>
          <a
            className={declassify(
              `py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer`,
              {
                "z-10 text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 font-bold":
                  isActive(page),
              }
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ));
    }

    return range(pagination?.page - 2, pagination?.page + 2).map((page) => (
      <li key={page}>
        <a
          className={declassify(
            `py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer`,
            {
              "z-10 text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 font-bold":
                isActive(page),
            }
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </a>
      </li>
    ));
  };

  return (
    <nav
      aria-label="Pagination"
      className={`${className} flex w-screen items-end justify-between`}
    >
      <span className="text-sm text-white dark:text-white-400">
        Showing{" "}
        <span className="font-semibold text-white dark:text-white">
          {(pagination?.page - 1) * pagination?.size + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-white dark:text-white">
          {pagination?.page * pagination?.size}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-white dark:text-white">
          {pagination?.totalElements}
        </span>{" "}
        Entries
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border w2w222border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
            onClick={() => onPageChange(pagination?.page - 1)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
        {renderPages()}
        <li>
          <a
            className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
            onClick={() => onPageChange(pagination?.page + 1)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
