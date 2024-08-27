import {
  IconReport,
  IconPaint,
  IconLayoutDashboard,
  IconLogin,
  IconHomeUp,
  IconFolderOpen,
  IconUserPlus,
  IconBriefcase,
  IconSettings,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Pulpit",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    id: uniqueId(),
    title: "Zamówienia",
    icon: IconFolderOpen,
    href: "/orders",
  },
  {
    id: uniqueId(),
    title: "Produkcja",
    icon: IconHomeUp,
    href: "/production",
  },
  {
    id: uniqueId(),
    title: "Nadruk",
    icon: IconPaint,
    href: "/prints",
  },
  {
    id: uniqueId(),
    title: "Raporty",
    icon: IconReport,
    href: "/raports",
  },
  {
    id: uniqueId(),
    title: "Administracja",
    icon: IconBriefcase,
    href: "/administration",
  },
  {
    id: uniqueId(),
    title: "Ustawienia",
    icon: IconSettings,
    href: "/settings",
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
];

export default Menuitems;
