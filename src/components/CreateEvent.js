import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "react-bootstrap";
import FormWellnessEvent from "./FormEvent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../utils/fetch";
import {
  fetchListsEventCategory,
  fetchListsVendor,
} from "../redux/lists/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateWellnessEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    NamaPerusahaan: "",
    JudulEvent: "",
    EventCategoryName: "",
    PostalCode: "",
    StreetName: "",
    VendorName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListsVendor());
    dispatch(fetchListsEventCategory());
  }, [dispatch]);

  const handleChange = async (e) => {
    if (e.target.name === "VendorName" || e.target.name === "EventCategoryName") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      NamaPerusahaan: form.NamaPerusahaan,
      JudulEvent: form.JudulEvent,
      EventCategoryName: form.EventCategoryName.value,
      PostalCode: form.PostalCode,
      StreetName: form.StreetName,
      VendorName: form.VendorName.value,
    };

    try {
      const res = await postData(`/wellnessEvent`, payload);
      if (res?.data?.data) {
        toast.success(`Berhasil create event ${res.data.data.JudulEvent}`);
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
            <FormWellnessEvent
              form={form}
              isLoading={isLoading}
              lists={lists}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default CreateWellnessEvent;
