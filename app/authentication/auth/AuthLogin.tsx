"use client";

import React, { useState, useTransition } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Podany email jest już w użyciu za pomoca innego prowidera"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Coś poszło nie tak!"));
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

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          {showTwoFactor ? (
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="code"
                mb="5px"
              >
                2FA kod
              </Typography>
              <Controller
                name="code"
                control={form.control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    placeholder="123456"
                    disabled={isPending}
                  />
                )}
              />
            </Box>
          ) : (
            <>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="email"
                  mb="5px"
                >
                  Email
                </Typography>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      placeholder="twoj@email.com"
                      disabled={isPending}
                    />
                  )}
                />
              </Box>
              <Box mt="25px">
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
                >
                  Hasło
                </Typography>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      type="password"
                      variant="outlined"
                      fullWidth
                      placeholder="*****"
                      disabled={isPending}
                    />
                  )}
                />
              </Box>
            </>
          )}
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <Typography
              component={Link}
              href="/authentication/reset"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Zapomniane hasło ?
            </Typography>
          </Stack>
        </Stack>
        {error && (
          <Typography color="error" variant="body2" mb={2}>
            {error}
          </Typography>
        )}
        {urlError && (
          <Typography color="error" variant="body2" mb={2}>
            {urlError}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" variant="body2" mb={2}>
            {success}
          </Typography>
        )}
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={isPending}
          >
            {showTwoFactor ? "Potwierdź" : "Zaloguj"}
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
