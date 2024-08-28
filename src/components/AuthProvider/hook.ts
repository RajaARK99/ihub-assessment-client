/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useContext } from "react";

import { AuthContext } from "@/components/AuthProvider/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  return context?.auth!;
};

const useTheme = () => {
  const context = useContext(AuthContext);
  return context?.theme!;
};

export { useAuth, useTheme };
