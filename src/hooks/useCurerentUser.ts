import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { loadCurrentUserProfile } from "../store/user-profile/thunks";

export function useCurrentUser() {
  const dispatch = useDispatch<AppDispatch>();

  const freelancerProfile = useSelector(
    (state: RootState) => state.userProfile?.freelancerProfiles?.[0] || null,
  );
  const loading = useSelector((state: RootState) => state.userProfile.loading);
  const clientProfile = useSelector(
    (state: RootState) => state.userProfile?.clientProfiles?.[0] || null,
  );

  useEffect(() => {
    dispatch(loadCurrentUserProfile());
  }, [dispatch]);

  return { freelancerProfile, clientProfile, loading };
}
