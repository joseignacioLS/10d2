import { useHandleInput } from "@/src/hooks/useHandleInput";
import { Form } from "../Core/Form";
import { Input } from "../Core/Input";

type Props = {};

export const InviteMember: React.FC<Props> = () => {
  const { input, handleInput } = useHandleInput({ username: "" });

  const handleInvite = () => {
    alert("invite send");
  };
  return (
    <div>
      <Form onSubmit={handleInvite}>
        <Input
          id="username"
          name="username"
          placeholder="Nombre del usuario a invitar"
          value={input.username}
          onChange={handleInput}
        />
      </Form>
    </div>
  );
};
