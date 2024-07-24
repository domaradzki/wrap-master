"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { newVerification } from "@/actions/new-verification";

interface AuthNewVerificationProps {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthNewVerification = ({
  title,
  subtitle,
  subtext,
}: AuthNewVerificationProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Token nie istnieje!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Coś poszło nie tak!!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
      {title && (
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
      )}

      {subtext}

      <Box sx={{ my: 4 }}>
        {!success && !error && <CircularProgress />}
        {success && (
          <Typography color="success.main" variant="body1">
            {success}
          </Typography>
        )}
        {!success && error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
      </Box>

      {subtitle}
    </Box>
  );
};

export default AuthNewVerification;
