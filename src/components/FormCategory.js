import React from "react";
import SButton from "../components/partikel/Button";
import { Col, Form, Row } from "react-bootstrap";

function FormCategory({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form method="post" className="form-create-event">
      <Row className="mt-4">
        <Col className="mb-3">
          <Form.Label className="label">Nama Kategori</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            type="text"
            onChange={handleChange}
            placeholder="Masukkan Nama Kategori"
          />
        </Col>
      </Row>

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

export default FormCategory;
