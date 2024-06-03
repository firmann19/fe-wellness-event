import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/partikel/Button";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Table from "../../components/partikel/TableWithAction";
import SearchInput from "../../components/partikel/SearchInput";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../redux/events/actions";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { toast } from "react-toastify";

function Vendor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const events = useSelector((state) => state.events);
  console.log(events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/wellnessEvent/${id}`);
        if (res?.data?.data) {
          toast.success(`Berhasil hapus event ${res.data.data.JudulEvent}`);
          dispatch(fetchEvents());
        } else {
          toast.error("Gagal menghapus grup");
        }
      }
    });
  };
  return (
    <>
      <Navbar />
      <Container className="grup mt-3" style={{ height: "80vh" }}>
        <Button
          className="btn me-3"
          action={() => navigate("/create-wellness-event")}
        >
          Tambah Acara
        </Button>

        <Button
          className="btn"
          variant={"secondary"}
          action={() => navigate("/create-category")}
        >
          Tambah Kategori
        </Button>
        <BreadCrumb textSecound={"Vendor"} />
        <Row>
          <Col md="4">
            <SearchInput query={""} handleChange={""} />
          </Col>
        </Row>

        <Table
          status={events.status}
          thead={[
            "Acara",
            "Vendor",
            "Tanggal Konfirmasi",
            "Tanggal Diciptakan",
            "Status",
            "Aksi",
          ]}
          data={events.data}
          tbody={[
            "Judul",
            "Vendor",
            "purposedDate",
            "dateCreated",
            "Status",
            "Aksi",
          ]}
          Detail={`/detail-wellness-event`}
          deleteAction={(e) => handleDelete(e)}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Vendor;
