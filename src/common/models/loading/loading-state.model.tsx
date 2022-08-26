import { DropdownMenuItem } from "@enums/dropdown-menu-items";

export interface LoadingState {
  isLoading: boolean;
  item: DropdownMenuItem;
}

export const createEmptyLoadingStateObject = (): LoadingState => {
  return {
    isLoading: false,
    item: null as any,
  };
};
