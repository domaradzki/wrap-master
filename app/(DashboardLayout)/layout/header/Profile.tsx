"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Box, Menu, Button, IconButton } from "@mui/material";

import { IconUser } from "@tabler/icons-react";
import { LogoutButton } from "@/app/authentication/auth/logout-button";
import ProfileItem from "@/components/profile-item";

const Profile = ({ name }: { name: string }) => {
  const [anchor, setAnchor] = useState(null);
  const handleClick = (event: any) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
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
          ...(typeof anchor === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick}
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
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <ProfileItem name={name} />
        <ProfileItem
          title="Moje konto"
          href="/konto"
          icon={IconUser}
          level={1}
        />

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
