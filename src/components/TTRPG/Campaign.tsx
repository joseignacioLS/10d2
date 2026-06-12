import { getCampaignDetail } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { Card } from "@/src/components/Core/Card";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { ToastContext } from "@/src/store/toast";
import { UserContext } from "@/src/store/user";
import { type Campaign as TCampaign } from "@/src/types/ttrpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useMemo } from "react";

type Props = {
  campaignId: TCampaign["id"];
};

export const Campaign: React.FC<Props> = ({ campaignId }) => {
  const { userData } = useContext(UserContext);
  const { createToast } = useContext(ToastContext);
  const {
    data: campaign,
    loading,
    error,
  } = useFetchData(getCampaignDetail, [campaignId]);
  const author = campaign?.characters.find(
    ({ member: { id } }) => id === userData?.id,
  );
  const router = useRouter();

  if (loading) {
    return "Cargando...";
  }

  if (error !== null) {
    createToast(error, "error");
    router.push("/");
    return null;
  }

  return (
    <section>
      <CrumbsHeader title={<span>{campaign.name} </span>} />

      <Card>
        <>
          {author && (
            <Button
              onClick={() => {
                router.push(`/sessions/new/${campaignId}`);
              }}
            >
              Nueva Sesión
            </Button>
          )}
        </>
      </Card>

      <Card>
        <p dangerouslySetInnerHTML={{ __html: campaign.summary }}></p>
      </Card>
      <Card>
        <>
          <h3>Personajes</h3>
          <ul>
            {campaign.characters.map(({ id, name, member }) => {
              return (
                <li key={name}>
                  <Link href={`/characters/${id}`}>
                    {name} ({member.name})
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h3>Sesiones</h3>
          <ul>
            {campaign.sessions.slice(0, 10).map(({ id, number, title }) => {
              return (
                <li key={id}>
                  <Link href={`/sessions/${id}`}>
                    #{number ?? 1} {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      </Card>
      <Card>
        <>
          <h3>Calendario</h3>
        </>
      </Card>
    </section>
  );
};
