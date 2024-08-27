"use client";

import React, { useState, useTransition } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { settings } from "@/actions/settings";
import { SettingsSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const SettingsPage = () => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      role: user?.role || UserRole.USER,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    console.log("Form submitted with values:", values);
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            console.log("Error:", data.error);
            setError(data.error);
          }
          if (data.success) {
            console.log("Success:", data.success);
            update();
            setSuccess(data.success);
          }
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
          setError("Coś poszło nie tak!");
        });
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Ustawienia
      </Typography>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Name"
                variant="outlined"
                fullWidth
                disabled={isPending}
              />
            )}
          />

          {user?.isOAuth === false && (
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  disabled={isPending}
                />
              )}
            />
          )}

          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                disabled={isPending}
              />
            )}
          />

          <Controller
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="New password"
                type="password"
                variant="outlined"
                fullWidth
                disabled={isPending}
              />
            )}
          />

          <Controller
            name="role"
            control={form.control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                label="Role"
                variant="outlined"
                fullWidth
                disabled={isPending}
              >
                <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                <MenuItem value={UserRole.USER}>User</MenuItem>
              </CustomTextField>
            )}
          />

          {user?.isOAuth === false && (
            <Controller
              name="isTwoFactorEnabled"
              control={form.control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      disabled={isPending}
                    />
                  }
                  label="2FA"
                />
              )}
            />
          )}

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" variant="body2">
              {success}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isPending}
          >
            Zapisz
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SettingsPage;
