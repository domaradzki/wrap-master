import React from "react";
import { ExtendedUser } from "@/next-auth";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
} from "@mui/material";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card sx={{ width: 600, boxShadow: 1 }}>
      <CardHeader
        title={
          <Typography variant="h5" align="center">
            {label}
          </Typography>
        }
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <InfoRow label="ID" value={user?.id} />
          <InfoRow label="Name" value={user?.name} />
          <InfoRow label="Email" value={user?.email} />
          <InfoRow label="Role" value={user?.role} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1.5,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" fontWeight="medium">
              2FA
            </Typography>
            <Chip
              label={user?.isTwoFactorEnabled ? "ON" : "OFF"}
              color={user?.isTwoFactorEnabled ? "success" : "error"}
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: 1.5,
      border: 1,
      borderColor: "divider",
      borderRadius: 1,
    }}
  >
    <Typography variant="body2" fontWeight="medium">
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        maxWidth: 180,
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontFamily: "monospace",
        bgcolor: "grey.100",
        p: 0.5,
        borderRadius: 1,
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default UserInfo;
