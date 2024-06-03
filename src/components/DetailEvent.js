import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card } from "react-bootstrap";
import FormWellnessEvent from "./FormEvent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../utils/fetch";
import FormDetailWellnessEvent from "./FormDetailEvent";

function DetailWellnessEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    NamaPerusahaan: "",
    JudulEvent: "",
    EventCategoryName: "",
    PostalCode: "",
    StreetName: "",
    VendorName: "",
  });

  const fetchOneEvent = async () => {
    const res = await getData(`/wellnessEvent/${id}`);
    console.log(res)
    setForm({
      ...form,
      NamaPerusahaan: res.data.data.NamaPerusahaan,
      JudulEvent: res.data.data.JudulEvent,
      EventCategoryName: res.data.data.EventCategoryName.name,
      PostalCode: res.data.data.PostalCode,
      StreetName: res.data.data.StreetName,
      VendorName: res.data.data.VendorName.name
    });
  };

  useEffect(() => {
    fetchOneEvent();
  }, []);

  const handleChange = async (e) => {
    if (
      e.target.name === "VendorName" ||
      e.target.name === "EventCategoryName"
    ) {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="Event"
        style={{
          minHeight: "100vh",
          paddingTop: "60px",
          paddingBottom: "30px",
        }}
      >
        <Card
          className="card-event"
          style={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
        >
          <h1 className="title text-center mt-4">Wellness Event</h1>
          <div className="border-top border-gray-200 pt-4 mt-4">
            <FormDetailWellnessEvent
              form={form}
              // isLoading={isLoading}
              // lists={lists}
              handleChange={handleChange}
            />
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default DetailWellnessEvent;
