"use client";

import React, { useState, useTransition } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { ResetSchema } from "@/schemas";
import { reset } from "@/actions/reset";

interface resetType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthReset = ({ title, subtitle, subtext }: resetType) => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
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
              htmlFor="email"
              mb="5px"
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
                  placeholder="twoj@email.com"
                  error={!!error}
                  helperText={error?.message}
                  disabled={isPending}
                  type="email"
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
            Resetuj hasło
          </Button>
        </form>
      </Box>
      {subtitle}
      <Box mt={2}>
        <Typography
          component={Link}
          href="/authentication/login"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Powrót do logowania
        </Typography>
      </Box>
    </>
  );
};

export default AuthReset;
