import { getSearch } from "@/src/api/ttrpg";
import { Card } from "@/src/components/Core/Card";
import { Input } from "@/src/components/Core/Input";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { SearchResult } from "@/src/types/ttrpg";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "../Core/Spinner";
import { ToastContext } from "@/src/store/toast";

type Props = {
  onSearchClick: () => void;
  minLength?: number;
};

export const SearchBar: React.FC<Props> = ({
  onSearchClick,
  minLength = 3,
}) => {
  const { input, handleInput } = useHandleInput({ search: "" });
  const [loading, setLoading] = useState(false);
  const { createToast } = useContext(ToastContext);

  const [searchResult, setSearchResults] = useState<SearchResult>({
    campaigns: [],
    sessions: [],
  });

  const searchFetch = useDebounce(async (search: string) => {
    return getSearch(search);
  }, 800);

  const resetSearch = () => {
    setSearchResults({
      campaigns: [],
      sessions: [],
    });
  };

  const handleSearch = async (search: string) => {
    if (search.length < minLength) {
      setLoading(false);
      resetSearch();
      return;
    }
    setLoading(true);
    await searchFetch(search)
      .then(({ data, error }) => {
        if (error !== null) {
          throw error;
        }
        if (!data) {
          resetSearch();
          return;
        }
        setSearchResults(data);
      })
      .catch((err) => {
        createToast(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
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
        min={minLength}
        onChange={handleInput}
        value={input.search}
      ></Input>
      {loading ? (
        <Spinner />
      ) : (
        (searchResult.campaigns.length > 0 ||
          searchResult.sessions.length > 0) && (
          <Card>
            <ul>
              <p>Campañas</p>
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
              <p>Sesiones</p>
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
        )
      )}
    </section>
  );
};
