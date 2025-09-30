import React, { useMemo } from "react";
import { UserRole } from "../../../models/UserProfile";
import { routesLinks } from "../../../routes/index";
import {
  AccountBoxOutlined,
  DashboardOutlined,
  AppsOutlined,
  CalendarMonthOutlined,
  ListAltOutlined,
  AccountBalanceOutlined,
  CodeOutlined,
  BusinessOutlined,
} from "@mui/icons-material";
import { NavigationItemType } from "../../../models/Ui";
import NavigationItem from "./NavigationItem";
import { List } from "@mui/material";

interface Props {
  role: UserRole;
}
export default function Navigation({ role }: Props) {
  const NAV_ITEMS: Record<UserRole, NavigationItemType[]> = {
    Client: [
      {
        header: "Dashboards",
      },
      {
        path: routesLinks.client,
        label: "Dashboard",
        icon: (props: any) => <DashboardOutlined {...props} />,
      },
      {
        header: "Pages",
      },
      {
        label: "Profile",
        icon: (props: any) => <AccountBoxOutlined {...props} />,
        description: "Profile management",
        items: [
          {
            path: routesLinks.userProfile,
            label: "My Profile",
          },
        ],
      },
      {
        label: "Freelancers",
        icon: (props: any) => <CodeOutlined {...props} />,
        description: "Freelancers data",
        items: [
          {
            path: routesLinks.availableFreelancers,
            label: "Available Freelancers",
          },
          {
            path: routesLinks.myFreelancers,
            label: "My Freelancers",
          },
        ],
      },
      {
        label: "Project",
        icon: (props: any) => <AppsOutlined {...props} />,
        description: "Projects management",
        items: [
          {
            path: routesLinks.projects,
            label: "My Projects",
          },
          {
            path: routesLinks.proposals,
            label: "Proposals",
          },
        ],
      },
      {
        label: "Finance",
        icon: (props: any) => <AccountBalanceOutlined {...props} />,
        description: "Finance management",
        items: [
          {
            path: routesLinks.invoices,
            label: "My Invoices",
          },
          {
            path: routesLinks.contracts,
            label: "My Contracts",
          },
          {
            path: routesLinks.payments,
            label: "Payments",
          },
        ],
      },
      {
        header: "Apps",
      },
      {
        path: routesLinks.calendar,
        label: "Calendar",
        icon: (props: any) => <CalendarMonthOutlined {...props} />,
      },
      {
        path: routesLinks.boards,
        label: "Projects Boards",
        icon: (props: any) => <ListAltOutlined {...props} />,
      },
    ],
    Freelancer: [
      {
        header: "Dashboards",
      },
      {
        path: routesLinks.freelancer,
        label: "Dashboard",
        icon: (props: any) => <DashboardOutlined {...props} />,
      },
      {
        header: "Pages",
      },
      {
        label: "Profile",
        icon: (props: any) => <AccountBoxOutlined {...props} />,
        description: "Profile management",
        items: [
          {
            path: routesLinks.userProfile,
            label: "My Profile",
          },
        ],
      },
      {
        label: "Clients",
        icon: (props: any) => <BusinessOutlined {...props} />,
        description: "Clients data",
        items: [
          {
            path: routesLinks.availableClients,
            label: "Available Clients",
          },
          {
            path: routesLinks.myClients,
            label: "My Clients",
          },
        ],
      },
      {
        label: "Project",
        icon: (props: any) => <AppsOutlined {...props} />,
        description: "Projects management",
        items: [
          {
            path: routesLinks.projects,
            label: "My Projects",
          },
          {
            path: routesLinks.proposals,
            label: "My Proposals",
          },
          {
            path: routesLinks.allProjects,
            label: "All Projects",
          },
        ],
      },
      {
        label: "Finance",
        icon: (props: any) => <AccountBalanceOutlined {...props} />,
        description: "Finance management",
        items: [
          {
            path: routesLinks.invoices,
            label: "My Invoices",
          },
          {
            path: routesLinks.contracts,
            label: "My Contracts",
          },
          {
            path: routesLinks.payments,
            label: "Payments",
          },
        ],
      },
      {
        header: "Apps",
      },
      {
        path: routesLinks.calendar,
        label: "Calendar",
        icon: (props: any) => <CalendarMonthOutlined {...props} />,
      },
      {
        path: routesLinks.boards,
        label: "Projects Boards",
        icon: (props: any) => <ListAltOutlined {...props} />,
      },
    ],
  };
  const navigationItems = useMemo(() => NAV_ITEMS[role] ?? [], [role]);
  const navigationItemsList = navigationItems.map((item) => {
    return <NavigationItem key={Object.values(item).toString()} item={item} />;
  });

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, padding: 2 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {navigationItemsList}
    </List>
  );
}
