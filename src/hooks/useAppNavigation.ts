import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  toggleSidebar,
  toggleNavigationId,
} from "../../src/store/navigation/slice";

export const useAppNavigation = () => {
  const dispatch: AppDispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.navigation.isSidebarOpen,
  );
  const openNavigationIds = useSelector(
    (state: RootState) => state.navigation.openNavigationIds,
  );

  const toggleNavId = useCallback(
    (id: string) => dispatch(toggleNavigationId(id)),
    [dispatch],
  );

  const getIsOpen = useCallback(
    (id: string) => openNavigationIds.includes(id),
    [openNavigationIds],
  );

  const toggleSidebarState = useCallback(
    () => dispatch(toggleSidebar()),
    [dispatch],
  );

  return {
    getIsOpen,
    isSidebarOpen,
    toggleNavigationId: toggleNavId,
    toggleSidebar: toggleSidebarState,
  };
};
