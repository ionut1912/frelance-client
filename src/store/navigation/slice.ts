import { NavigationState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NavigationState = {
  isSidebarOpen: true,
  openNavigationIds: [],
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleNavigationId(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.openNavigationIds.includes(id)) {
        state.openNavigationIds = state.openNavigationIds.filter(
          (nid) => nid !== id,
        );
      } else {
        state.openNavigationIds.push(id);
      }
    },
  },
});

export const { toggleSidebar, toggleNavigationId } = navigationSlice.actions;
export default navigationSlice.reducer;
