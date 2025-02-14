import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconSchool,
  IconUsers,
  IconCalendar,
  IconCash,
  IconDoor,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Class Management",
  },
  {
    id: uniqueId(),
    title: "Classes",
    icon: IconSchool,
    href: "/class-management/classes",
  },
  {
    id: uniqueId(),
    title: "Students",
    icon: IconUsers,
    href: "/class-management/students",
  },
  {
    id: uniqueId(),
    title: "Timetable",
    icon: IconCalendar,
    href: "/class-management/timetable",
  },
  {
    id: uniqueId(),
    title: "Payments",
    icon: IconCash,
    href: "/class-management/payments",
  },
  {
    id: uniqueId(),
    title: "Cabinets",
    icon: IconDoor,
    href: "/class-management/cabinets",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Typography",
    icon: IconTypography,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/utilities/shadow",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
