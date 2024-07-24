"use client";

import React, { useState, useTransition } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { NewPasswordSchema } from "@/schemas";
import { newPassword } from "@/actions/new-password";

interface AuthNewPasswordProps {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthNewPassword = ({
  title,
  subtitle,
  subtext,
}: AuthNewPasswordProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto" }}>
      {title && (
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
      )}
      {subtext}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
              <CustomTextField
                {...field}
                label="Nowe hasło"
                variant="outlined"
                fullWidth
                type="password"
                error={!!error}
                helperText={error?.message}
                disabled={isPending}
              />
            )}
          />

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
      {subtitle}
    </Box>
  );
};

export default AuthNewPassword;
