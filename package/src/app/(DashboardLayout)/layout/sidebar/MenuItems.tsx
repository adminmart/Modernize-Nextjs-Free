import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconMoodHappy,
  IconTypography,
  IconSchool,
  IconUsers,
  IconCalendar,
  IconCash,
  IconDoor,
  IconChalkboard,
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
    title: "Teachers",
    icon: IconChalkboard,
    href: "/class-management/teachers",
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
];

export default Menuitems;
