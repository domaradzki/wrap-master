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
    href: "/pulpit",
  },
  {
    id: uniqueId(),
    title: "Zamówienia",
    icon: IconFolderOpen,
    href: "/zamowienia",
  },
  {
    id: uniqueId(),
    title: "Produkcja",
    icon: IconHomeUp,
    href: "/produkcja",
  },
  {
    id: uniqueId(),
    title: "Nadruk",
    icon: IconPaint,
    href: "/nadruk",
  },
  {
    id: uniqueId(),
    title: "Raporty",
    icon: IconReport,
    href: "/raporty",
  },
  {
    id: uniqueId(),
    title: "Administracja",
    icon: IconBriefcase,
    href: "/administracja",
  },
  {
    id: uniqueId(),
    title: "Ustawienia",
    icon: IconSettings,
    href: "/ustawienia",
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
