import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";

interface ItemType {
  title?: string;
  href?: string;
  icon?: any;
  disabled?: boolean;
  level?: number | any;
  name?: string | null;
}

const ProfileItem = ({
  title,
  href,
  icon,
  disabled,
  level = 0,
  name,
}: ItemType) => {
  const Icon = icon;
  const theme = useTheme();
  const itemIcon = icon ? <Icon width={20} /> : null;

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
  }));

  return (
    <List component="div" disablePadding>
      {name && (
        <ListItemStyled>
          <ListItemText
            sx={{
              p: "5px 12px",
              fontWeight: "bold",
            }}
          >
            Cześć, <>{name}</>
          </ListItemText>
        </ListItemStyled>
      )}
      {href && (
        <ListItemStyled>
          <ListItemButton component={Link} href={href} disabled={disabled}>
            <ListItemIcon
              sx={{
                minWidth: "36px",
                p: "3px 0",
                color: "inherit",
              }}
            >
              {itemIcon}
            </ListItemIcon>
            <ListItemText>
              <>{title}</>
            </ListItemText>
          </ListItemButton>
        </ListItemStyled>
      )}
    </List>
  );
};

export default ProfileItem;
