import { getSearch } from "@/src/api/ttrpg";
import { Card } from "@/src/components/Core/Card";
import { Input } from "@/src/components/Core/Input";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { SearchResult } from "@/src/types/ttrpg";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  onSearchClick: () => void;
};

export const SearchBar: React.FC<Props> = ({ onSearchClick }) => {
  const { input, handleInput } = useHandleInput(["search"]);

  const [searchResult, setSearchResults] = useState<SearchResult>({
    campaigns: [],
    sessions: [],
  });

  const searchFetch = useDebounce(async (search: string) => {
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
        campaigns: [],
        sessions: [],
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
      {(searchResult.campaigns.length > 0 ||
        searchResult.sessions.length > 0) && (
        <Card>
          <ul>
            {searchResult.campaigns.map((campaign) => {
              return (
                <li key={campaign.id}>
                  <Link
                    href={`/campaigns/${campaign.id}`}
                    onClick={onSearchClick}
                  >
                    {campaign.name}
                  </Link>
                </li>
              );
            })}
            {searchResult.sessions.map((session) => {
              return (
                <li key={session.id}>
                  <Link
                    href={`/sessions/${session.id}`}
                    onClick={onSearchClick}
                  >
                    {session.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </section>
  );
};
