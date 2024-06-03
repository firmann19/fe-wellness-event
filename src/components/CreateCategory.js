import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "react-bootstrap";
import FormCategory from "./FormCategory";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postData } from "../utils/fetch";
import { toast } from "react-toastify";

function CreateCategory() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      name: form.name,
    };

    try {
      const res = await postData(`/categoryName`, payload);
      if (res?.data?.data) {
        toast.success(`Berhasil tambah category ${res.data.data.name}`);
        navigate("/company-hr");
      } else {
        toast.error(res.response.data.msg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg ?? "Internal Server Error");
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
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)", // Bayangan pada setiap sisi
            borderRadius: "10px",
          }}
        >
          <h1 className="title text-center mt-4">Category Event</h1>
          <div className="border-top border-gray-200 pt-4 mt-4">
            <FormCategory
              form={form}
              isLoading={isLoading}
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

export default CreateCategory;
