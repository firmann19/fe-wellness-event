import React from "react";
import SButton from "../components/partikel/Button";
import SelectBox from "../components/partikel/SelectBox";
import { Col, Form, Row } from "react-bootstrap";

function FormWellnessEvent({
  form,
  lists,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  return (
    <Form method="post" className="form-create-event">
      <Row className="mt-4 d-flex flex-wrap">
        <Col className="mb-3 flex-column">
          <Form.Label className="label">Nama Acara</Form.Label>
          <Form.Control
            name="JudulEvent"
            value={form.JudulEvent}
            type="text"
            onChange={handleChange}
          />
        </Col>

        <Col className="mb-3 flex-column">
          <SelectBox
            label={"Kategori Acara"}
            placeholder={"Pilih kategori acara"}
            className="text-md"
            name="EventCategoryName"
            isClearable={true}
            value={form.EventCategoryName}
            options={lists.eventCategorys}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>

      <Row className="mt-4 d-flex flex-wrap">
        <Col className="mb-3 flex-column">
          <Form.Label className="label">Nama Perusahaan</Form.Label>
          <Form.Control
            name="NamaPerusahaan"
            value={form.NamaPerusahaan}
            type="text"
            onChange={handleChange}
          />
        </Col>

        <Col className="mb-3 flex-column">
          <Form.Label className="label">Kode POS</Form.Label>
          <Form.Control
            name="PostalCode"
            value={form.PostalCode}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Form.Group className="mb-3  ">
        <Form.Label className="label">Alamat</Form.Label>
        <Form.Control
          id="StreetName"
          as="textarea"
          name="StreetName"
          rows={3}
          value={form.StreetName}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="mt-4 selectBox">
        <div className="relative">
          <SelectBox
            label={"Vendor"}
            placeholder={"Pilih nama vendor"}
            className="text-md"
            name="VendorName"
            isClearable={true}
            value={form.VendorName}
            options={lists.vendors}
            handleChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="text-center mb-5 mt-4">
        <SButton
          className="btn-createEvent rounded-5"
          loading={isLoading}
          disabled={isLoading}
          action={handleSubmit}
          style={{ width: "100%" }}
        >
          Submit
        </SButton>
      </div>
    </Form>
  );
}

export default FormWellnessEvent;
