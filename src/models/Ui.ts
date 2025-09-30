import { AddressDto, UserRole } from "./UserProfile";
import React from "react";
import { SvgIconProps } from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { UseSuspenseQueryResult } from "@tanstack/react-query";

type NavigationItemIconColor =
  | "primary"
  | "secondary"
  | "default"
  | "error"
  | "info"
  | "success"
  | "warning";
type NavigationItemIconProps = SvgIconProps;
interface NavigationItemIcon {
  icon: (props: NavigationItemIconProps) => React.ReactElement;
}

interface NavigationItemBaseType {
  label: string;
  active?: boolean;
  disabled?: boolean;
  description?: string;
}

interface NavigationItemSimpleType
  extends NavigationItemBaseType,
    NavigationItemIcon {
  path: string;
  badgeText?: string | number;
  badgeColor?: NavigationItemIconColor;
  external?: boolean;
}

type NavigationItemSimpleTypeWithoutIcon = Omit<
  NavigationItemSimpleType,
  "icon"
>;

interface NavigationItemNestedType
  extends NavigationItemBaseType,
    NavigationItemIcon {
  items: NavigationItemSimpleTypeWithoutIcon[];
}

interface NavigationItemHeaderType {
  header: string;
}

interface BaseProfileData {
  address: AddressDto;
  bio: string;
  image: string;
}

interface ClientProfileData extends BaseProfileData {}

interface FreelancerProfileData extends BaseProfileData {
  programmingLanguages: string[];
  areas: string[];
  foreignLanguages: string[];
  experience: string;
  rate: number;
  currency: string;
  portfolioUrl: string;
}

interface UserDetailsData {
  bio: string;
  image: string;
}

interface FreelancerDetailsData {
  programmingLanguages: string[];
  areas: string[];
  foreignLanguages: string[];
  experience: string;
  rate: number;
  currency: string;
  portfolioUrl: string;
}

interface DialogData {
  userProfileId: number;
  dialogName: string;
  address?: AddressDto;
  userDetails?: UserDetailsData;
  freelancerData?: FreelancerDetailsData;
}

interface PaginatedDataRequest {
  pageSize: number;
  pageNumber: number;
}

interface PaginatedList<T> {
  totalPages: number;
  pageSize: number;
  totalCount: number;
  currentPage: number;
  items: T[];
}

interface NavbarProps {
  role: UserRole;
}

interface NavLink {
  label: string;
  url: string;
}

interface NavigationListItemButtonProps {
  active?: boolean;
  nested?: boolean;
}

type NavigationItemType =
  | NavigationItemSimpleType
  | NavigationItemNestedType
  | NavigationItemHeaderType;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface CalendarEvent {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

interface CalendarData {
  date: Date;
  events: CalendarEvent[];
}

type CalendarType = UseSuspenseQueryResult<CalendarData[]>;

export type {
  ClientProfileData,
  FreelancerProfileData,
  FreelancerDetailsData,
  UserDetailsData,
  DialogData,
  NavigationItemType,
  PaginatedList,
  PaginatedDataRequest,
  NavbarProps,
  NavLink,
  NavigationItemIconProps,
  NavigationItemBaseType,
  NavigationItemSimpleType,
  NavigationItemSimpleTypeWithoutIcon,
  NavigationItemNestedType,
  NavigationItemHeaderType,
  NavigationListItemButtonProps,
  AppBarProps,
  CalendarEvent,
  CalendarData,
  CalendarType,
};
