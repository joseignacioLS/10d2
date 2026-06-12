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
  const {
    token,
    userData,
    addCampaignToSubscriptions,
    removeCampaignFromSubscriptions,
  } = useContext(UserContext);
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

  const canSubscribe = useMemo(
    () =>
      !campaign?.characters.find(({ member: { id } }) => id === userData?.id),
    [campaign, userData],
  );
  const userSubscribed = useMemo(
    () => userData?.subscriptions?.includes(campaignId),
    [userData?.subscriptions, campaignId],
  );

  const handleFollow = useWrapFnWithToast(async () => {
    if (!token) throw "No estás logueado";
    if (!campaign) throw "Campaña no encontrada";
    if (!userSubscribed) {
      await addCampaignToSubscriptions();
      return "";
    } else {
      await removeCampaignFromSubscriptions();
      return "";
    }
  });

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
      <CrumbsHeader
        title={
          <span className="title_with_button">
            {campaign.name ?? ""}{" "}
            {canSubscribe && token && (
              <Button onClick={handleFollow}>
                {userSubscribed ? "Unfollow" : "Follow"}
              </Button>
            )}
          </span>
        }
        crumbs={[
          {
            name: campaign.group?.name || "",
            href: `/groups/${campaign.group?.id}`,
          },
        ]}
      />
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
          <h3 className="title_with_btn">
            Últimas Sesiones{" "}
            {author && (
              <Button
                onClick={() => {
                  router.push(`/sessions/new/${campaignId}`);
                }}
              >
                +
              </Button>
            )}
          </h3>
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
