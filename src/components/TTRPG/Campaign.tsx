import { getCampaign } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { Card } from "@/src/components/Core/Card";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { CreateSessionModal } from "@/src/components/TTRPG/CreateSessionModal";
import { useFetchData } from "@/src/hooks/useFetchData";
import { UserContext } from "@/src/store/user";
import { type Campaign as TCampaign } from "@/src/types/ttrpg";
import Link from "next/link";
import { useContext, useState } from "react";

type Props = {
  campaignId: TCampaign["id"];
};

export const Campaign: React.FC<Props> = ({ campaignId }) => {
  const { user } = useContext(UserContext);
  const {
    data: campaign,
    loading,
    error,
  } = useFetchData(getCampaign, [campaignId]);
  const [showCreateSessionModal, setShowCreateSessionModal] = useState(false);
  const author = campaign?.characters.find(({ member }) => member === user?.id);

  if (loading) {
    return "Cargando...";
  }
  if (error !== null) {
    return "Ha habido un error";
  }

  return (
    <section>
      <CrumbsHeader
        title={campaign.name ?? ""}
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
                    {name} ({member})
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
            Sesiones{" "}
            {author && (
              <Button
                onClick={() => {
                  setShowCreateSessionModal(true);
                }}
              >
                +
              </Button>
            )}
          </h3>
          <ul>
            {campaign.sessions.map(({ id, number, title }) => {
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
      {showCreateSessionModal && author && (
        <CreateSessionModal
          onClose={() => {
            setShowCreateSessionModal(false);
          }}
          campaignId={campaignId}
          author={author.id}
        />
      )}
    </section>
  );
};
