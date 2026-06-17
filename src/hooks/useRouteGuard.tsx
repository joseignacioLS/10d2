import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../store/toast";
import { UserContext } from "../store/user";

export const useRouteGuard = (
  dataLoading: boolean,
  dataError: string | null,
  loginProtected: boolean,
  roleProtected: "GM" | "player" | undefined,
  redirectRoute: string,
) => {
  const [loading, setLoading] = useState(true);

  const { campaignId } = useParams();

  const router = useRouter();

  const { userData } = useContext(UserContext);
  const { createToast } = useContext(ToastContext);

  useEffect(() => {
    if (dataLoading) {
      setLoading(true);
      return;
    }
    if (dataError) {
      setLoading(false);
      createToast(dataError, "error");
      router.push(redirectRoute);
    }
    if (userData.state === "loading") {
      setLoading(true);
      return;
    }
    if (loginProtected && userData.state !== "login") {
      createToast("Debes iniciar sesión para acceder a esta página", "error");
      setLoading(false);
      router.push(redirectRoute);
      return;
    }

    if (
      roleProtected &&
      roleProtected !== userData.permissions[campaignId as string]
    ) {
      createToast("No tienes permisos para acceder a esta página", "error");
      setLoading(false);
      router.push(redirectRoute);
    }
    setLoading(false);
  }, [
    dataLoading,
    dataError,
    userData.state,
    userData.campaigns,
    loginProtected,
    roleProtected,
    redirectRoute,
  ]);

  return {
    loading,
  };
};
