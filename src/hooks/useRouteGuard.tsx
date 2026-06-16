import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user";
import { useParams, useRouter } from "next/navigation";
import { checkCampaignPermissions } from "../utils/campaign";
import { ToastContext } from "../store/toast";

export const useRouteGuard = (
  dataLoading: boolean,
  dataError: string | null,
  loginProtected: boolean,
  editProtected: "campaign" | undefined,
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
    const { canEdit } = checkCampaignPermissions(
      userData.campaigns,
      campaignId as string,
    );
    if (editProtected === "campaign" && !canEdit) {
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
    editProtected,
    redirectRoute,
  ]);

  return {
    loading,
  };
};
