import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormReject from "./FormRejected";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { putData } from "../utils/fetch";
import { toast } from "react-toastify";
import FormApproved from "./FormApprove";
import { useDispatch, useSelector } from "react-redux";
import { fetchListsDate } from "../redux/lists/actions";

function FormDetailWellnessEvent({ form }) {
  const navigate = useNavigate();
  const [FormRejected, setFormRejected] = useState(false);
  const [role, setRole] = useState(null);
  const [FormApprove, setFormApprove] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form2, setForm2] = useState({
    Remarks: "",
    Purposed_Date: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFormRejectedClick = () => {
    setForm2({
      Remarks: "",
    });
    setFormRejected((prevVisible) => !prevVisible);
  };

  const handleFormApproveClick = () => {
    setForm2({
      Purposed_Date: "",
    });
    setFormApprove((prevVisible) => !prevVisible);
  };

  const closePopup = () => {
    setForm2({
      Remarks: "",
      Purposed_Date: "",
    });
    setFormRejected(false);
    setFormApprove(false);
  };

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setRole(role);
    };
    fetchData();
    dispatch(fetchListsDate());
  }, [dispatch]);

  const handleChange = async (e) => {
    if (e.target.name === "Purposed_Date") {
      setForm2({ ...form2, [e.target.name]: e });
    } else {
      setForm2({ ...form2, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit1 = async () => {
    setIsLoading(true);

    const payload = {
      Remarks: form2.Remarks,
    };

    try {
      const res = await putData(`/rejectedWellnessEvent/${id}`, payload);
      if (res?.data?.data) {
        toast.success(
          `Berhasil ubah status event menjadi ${res.data.data.StatusEvent}`
        );
        navigate("/dashboard");
      } else {
        toast.error(res.response.data.msg);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit2 = async () => {
    setIsLoading(true);

    const payload = {
      Purposed_Date: form2.Purposed_Date.value,
    };

    try {
      const res = await putData(`/approveWellnessEvent/${id}`, payload);
      console.log("test", res);
      if (res?.data?.data) {
        toast.success(
          `Berhasil ubah status event menjadi ${res.data.data.StatusEvent}`
        );
        navigate("/dashboard");
      } else {
        toast.error(res.response.data.msg);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form method="post" className="form-create-event">
      <Row className="mt-4 d-flex flex-wrap">
        <Col className="mb-3 flex-column">
          <Form.Label className="label">Nama Acara</Form.Label>
          <Form.Control
            name="JudulEvent"
            value={form.JudulEvent}
            type="text"
            readOnly
            disabled
          />
        </Col>

        <Col className="mb-3 flex-column">
          <Form.Label className="label">Kategori Acara</Form.Label>
          <Form.Control
            name="EventCategoryName"
            value={form.EventCategoryName}
            type="text"
            readOnly
            disabled
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
            readOnly
            disabled
          />
        </Col>

        <Col className="mb-3 flex-column">
          <Form.Label className="label">Kode POS</Form.Label>
          <Form.Control
            name="PostalCode"
            value={form.PostalCode}
            type="text"
            readOnly
            disabled
          />
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="label">Alamat</Form.Label>
        <Form.Control
          id="StreetName"
          as="textarea"
          name="StreetName"
          rows={3}
          value={form.StreetName}
          readOnly
          disabled
        />
      </Form.Group>

      <Row className="mt-4 d-flex flex-wrap">
        <Col className="mb-3 flex-column">
          <Form.Label className="label">Vendor</Form.Label>
          <Form.Control
            name="VendorName"
            value={form.VendorName}
            type="text"
            readOnly
            disabled
          />
        </Col>
      </Row>

      <Row className="text-center mb-5 mt-4 justify-content-center">
        <div class="d-grid gap-4 d-md-block">
          <button
            id="approve"
            href="#!"
            class="btn btn-success me-md-3"
            type="button"
            disabled={role === "HR"}
            onClick={handleFormApproveClick}
          >
            Approve
          </button>
          <button
            id="rejected"
            href="#!"
            class="btn btn-danger"
            type="button"
            disabled={role === "HR"}
            onClick={handleFormRejectedClick}
          >
            Rejected
          </button>
        </div>
      </Row>
      {FormApprove && (
        <div
          id="approveForm"
          className="popupApprove"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            zIndex: 1000,
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Button
            variant="link"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "black",
            }}
            onClick={closePopup}
          >
            <FaTimes />
          </Button>
          <FormApproved
            form2={form2}
            lists={lists}
            isLoading={isLoading}
            handleChange={handleChange}
            handleSubmit2={handleSubmit2}
          />
        </div>
      )}

      {FormRejected && (
        <div
          id="rejectedForm"
          className="popupRejected"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            zIndex: 1000,
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Button
            variant="link"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "black",
            }}
            onClick={closePopup}
          >
            <FaTimes />
          </Button>
          <FormReject
            form2={form2}
            isLoading={isLoading}
            handleChange={handleChange}
            handleSubmit1={handleSubmit1}
          />
        </div>
      )}
    </Form>
  );
}

export default FormDetailWellnessEvent;
