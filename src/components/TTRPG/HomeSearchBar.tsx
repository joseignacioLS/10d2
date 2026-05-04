import { getSearch } from "@/src/api/ttrpg";
import { Form } from "../Core/Form";
import { Input } from "../Core/Input";

type Props = {};

export const HomeSearchBar: React.FC<Props> = ({}) => {
  const handleSearch = async ({ search }: { search: string }) => {
    const { data } = await getSearch(search);
    console.log(data);
  };
  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Input id="searchbar" name="search" placeholder="Buscar" min={3}></Input>
      </Form>
    </div>
  );
};
