import { getSearch } from "@/src/api/ttrpg";
import { Card } from "@/src/components/Core/Card";
import { Input } from "@/src/components/Core/Input";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { Campaign, Group } from "@/src/types/ttrpg";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  onSearchClick: () => void;
};

export const SearchBar: React.FC<Props> = ({ onSearchClick }) => {
  const { input, handleInput } = useHandleInput(["search"]);

  const [searchResult, setSearchResults] = useState<{
    groups: Group[];
    campaigns: Campaign[];
  }>({
    groups: [],
    campaigns: [],
  });

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
    const { data } = await searchFetch(search);
    if (!data) {
      setSearchResults({
        groups: [],
        campaigns: [],
      });
      return;
    }
    setSearchResults(data);
  };

  useEffect(() => {
    handleSearch(input.search);
  }, [input.search]);

  return (
    <section>
      <Input
        id="searchbar"
        name="search"
        placeholder="Busca campañas o grupos"
        min={3}
        onChange={handleInput}
        value={input.search}
      ></Input>
      {(searchResult.groups.length > 0 ||
        searchResult.campaigns.length > 0) && (
        <Card>
          <>
            {searchResult.groups.map((group) => {
              return (
                <Link
                  key={group.id}
                  href={`/groups/${group.id}`}
                  onClick={onSearchClick}
                >
                  {group.name}
                </Link>
              );
            })}
            {searchResult.campaigns.map((campaign) => {
              return (
                <Link
                  key={campaign.id}
                  href={`/campaigns/${campaign.id}`}
                  onClick={onSearchClick}
                >
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
