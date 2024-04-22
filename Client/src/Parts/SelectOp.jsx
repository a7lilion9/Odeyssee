import { Select } from "../Components";

const SelectOp = ({ onclick }) => {
  return (
    <Select
      onclick={onclick}
      options={[
        { value: "add", text: "Ajouter" },
        { value: "remove", text: "Supprimer" },
      ]}
    />
  );
};

export default SelectOp;
