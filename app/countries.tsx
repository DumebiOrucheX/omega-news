import { useRouter } from "expo-router";
import React from "react";
import { useCountry } from "./CountryContext";
import CountryPickerScreen from "./screens/CountryPickerScreen";

export default function Countries() {
  const { setCountry } = useCountry();
  const router = useRouter();
  return (
    <CountryPickerScreen
      onSelect={(code) => {
        setCountry(code);
        router.replace("/"); // Switch to Home tab after selection
      }}
    />
  );
}
