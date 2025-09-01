import {
  CREATE_CLIENT_PROFILE_FAILURE,
  CREATE_FREELANCER_PROFILE_FAILURE,
  DELETE_CLIENT_PROFILE_SUCCESS,
  DELETE_FREELANCER_PROFILE_SUCCESS,
  GET_CURRENT_CLIENT_PROFILE_RESULT,
  GET_CURRENT_FREELANCER_PROFILE_RESULT,
  GET_USER_PROFILES_SUCCESS,
  PATCH_FRELANCER_DETAILS_FAILURE,
  PATCH_USER_PROFILE_ADDRESS_FAILURE,
  PATCH_USER_PROFILE_DETAILS_FAILURE,
  UserProfileAction,
  UserProfileState,
  VERIFY_CLIENT_PROFILE_REQUEST,
  VERIFY_FREELANCER_PROFILE_REQUEST,
} from "./types";

const initialState: UserProfileState = {
  clientProfiles: null,
  freelancerProfiles: null,
  paginatedUserProfiles: null,
  error: null,
};

export function userProfileReducer(
  state = initialState,
  action: UserProfileAction,
): UserProfileState {
  switch (action.type) {
    case CREATE_CLIENT_PROFILE_FAILURE:
      return { ...state, error: action.error };
    case CREATE_FREELANCER_PROFILE_FAILURE:
      return { ...state, error: action.error };
    case GET_CURRENT_CLIENT_PROFILE_RESULT:
      return {
        ...state,
        clientProfiles: action.clientProfiles,
        freelancerProfiles: [],
      };
    case GET_CURRENT_FREELANCER_PROFILE_RESULT:
      return {
        ...state,
        clientProfiles: [],
        freelancerProfiles: action.freelancerProfiles,
      };
    case VERIFY_CLIENT_PROFILE_REQUEST:
      return {
        ...state,
        clientProfiles: state.clientProfiles!.map((profile) =>
          profile.id === action.profileId
            ? { ...profile, isVerified: true }
            : profile,
        ),
      };
    case VERIFY_FREELANCER_PROFILE_REQUEST:
      return {
        ...state,
        freelancerProfiles: state.freelancerProfiles!.map((profile) =>
          profile.id === action.profileId
            ? { ...profile, isVerified: true }
            : profile,
        ),
      };
    case DELETE_FREELANCER_PROFILE_SUCCESS:
      return {
        ...state,
        freelancerProfiles: state.freelancerProfiles!.filter(
          (profile) => profile.id !== action.freelancerProfileId,
        ),
        error: null,
      };
    case DELETE_CLIENT_PROFILE_SUCCESS:
      return {
        ...state,
        clientProfiles: state.clientProfiles!.filter(
          (profile) => profile.id !== action.clientProfileId,
        ),
        error: null,
      };
    case PATCH_USER_PROFILE_ADDRESS_FAILURE:
      return { ...state, error: action.error };
    case PATCH_USER_PROFILE_DETAILS_FAILURE:
      return { ...state, error: action.error };
    case PATCH_FRELANCER_DETAILS_FAILURE:
      return { ...state, error: action.error };
    case GET_USER_PROFILES_SUCCESS:
      return {
        ...state,
        paginatedUserProfiles: action.response.paginatedList,
        error: null,
      };
    default:
      return state;
  }
}
