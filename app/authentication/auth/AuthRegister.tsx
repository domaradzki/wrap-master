"use client";

import React, { useState, useTransition } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack mb={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Nazwa
            </Typography>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <CustomTextField
                    {...field}
                    id="name"
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    disabled={isPending}
                  />
                </>
              )}
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
              mt="25px"
            >
              Adres Email
            </Typography>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  id="email"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  disabled={isPending}
                />
              )}
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
              mt="25px"
            >
              Hasło
            </Typography>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  id="password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  error={!!error}
                  helperText={error?.message}
                  disabled={isPending}
                />
              )}
            />
          </Stack>
          {error && (
            <Typography color="error" variant="body2" mb={2}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" variant="body2" mb={2}>
              {success}
            </Typography>
          )}
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={isPending}
          >
            Zarejestruj
          </Button>
        </form>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
