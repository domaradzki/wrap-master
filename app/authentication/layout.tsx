"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
