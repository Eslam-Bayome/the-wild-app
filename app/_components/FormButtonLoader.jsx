"use client";
import React from "react";
import { useFormStatus } from "react-dom";
export const FormButtonLoader = ({ children, disabled = false }) => {
  let { pending } = useFormStatus();

  if (disabled)
    return (
      <button
        className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        disabled
      >
        Select Dates...
      </button>
    );

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "Loading..." : children}
    </button>
  );
};
