import { getSearch } from "@/src/api/ttrpg";
import { Card } from "@/src/components/Core/Card";
import { Input } from "@/src/components/Core/Input";
import { useDebounce } from "@/src/hooks/useDebounce";
import { Campaign, Group } from "@/src/types/ttrpg";
import Link from "next/link";
import { useState } from "react";

type Props = {};

export const HomeSearchBar: React.FC<Props> = ({}) => {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResults] = useState<{
    groups: Group[];
    campaigns: Campaign[];
  }>({
    groups: [],
    campaigns: [],
  });

  const [noResults, setNoResults] = useState(false);

  const searchFetch = useDebounce<{
    groups: Group[];
    campaigns: Campaign[];
  }>(async (search: string) => {
    if (search.length < 3) {
      return new Promise((res) => {
        res({ data: null, error: "Too short query" });
      });
    }
    return getSearch(search);
  }, 800);

  const handleSearch = async (search: string) => {
    setNoResults(false);
    const { data } = await searchFetch(search);
    if (!data) {
      setSearchResults({
        groups: [],
        campaigns: [],
      });
      return;
    }
    setNoResults(data.groups.length === 0 && data.campaigns.length === 0);
    setSearchResults(data);
  };

  return (
    <section>
      <Input
        id="searchbar"
        name="search"
        placeholder="Busca campañas o grupos"
        min={3}
        onChange={(name, value) => {
          setInput(value);
          handleSearch(String(value));
        }}
        value={input}
      ></Input>
      {noResults && (
        <Card>
          <p>No hay resultados para la búsqueda</p>
        </Card>
      )}
      {(searchResult.groups.length > 0 ||
        searchResult.campaigns.length > 0) && (
        <Card>
          <>
            <h2>Resultados de la búsqueda</h2>
            {searchResult.groups.map((group) => {
              return (
                <Link key={group.id} href={`/groups/${group.id}`}>
                  {group.name}
                </Link>
              );
            })}
            {searchResult.campaigns.map((campaign) => {
              return (
                <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
                  {campaign.name}
                </Link>
              );
            })}
          </>
        </Card>
      )}
    </section>
  );
};
