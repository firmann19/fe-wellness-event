import React from "react";
import SButton from "./partikel/Button";
import SelectBox from "./partikel/SelectBox";

function FormApproved({ form2, lists, handleChange, handleSubmit2, isLoading }) {
  return (
    <>
      <h1 className="title text-4xl text-center color-palette-1 mb-10">
        Confirmation Date
      </h1>
      <SelectBox
        label={"Purposed Date"}
        placeholder={"Pilih nama Jadwal"}
        className="text-md"
        name="Purposed_Date"
        isClearable={true}
        value={form2.Purposed_Date}
        options={lists.dates}
        handleChange={(e) => handleChange(e)}
      />
      <div className="text-center mt-5">
        <SButton
          className="btn-createEvent rounded-5"
          loading={isLoading}
          disabled={isLoading}
          action={handleSubmit2}
          style={{ width: "100%" }}
        >
          Submit
        </SButton>
      </div>
    </>
  );
}

export default FormApproved;
