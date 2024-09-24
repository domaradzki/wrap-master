import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Box, Menu, Button, IconButton } from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/app/authentication/auth/logout-button";
import ProfileItem from "@/components/profile-item";

const Profile = () => {
  const user = useCurrentUser();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <ProfileItem title="Mój profil" href="/profile" icon={IconUser} />
        <Box mt={1} py={1} px={2}>
          <LogoutButton>
            <Button
              href="/authentication/login"
              variant="outlined"
              color="primary"
              component={Link}
              fullWidth
            >
              Wyloguj
            </Button>
          </LogoutButton>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
