import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { fetchAllTramDung, deleteTramDung } from "../../services/api/TramDung/apiDanhSachTramDung";
import {Modal as AntdModal, notification} from "antd";

const DanhSachTramDung = () => {
  const [tramDung, setTramDung] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tramToDelete, setTramToDelete] = useState(null);

  useEffect(() => {
    const danhSachTramDung = async () => {
      try {
        const res = await fetchAllTramDung();
        setTramDung(res.data || []);
      } catch (error) {
        console.error("Không thể lấy dữ liệu trạm dừng:", error);
      }
    };
    danhSachTramDung();
  }, []);

  const showModal = (tram) => {
    setTramToDelete(tram);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (tramToDelete) {
      try {
        const res = await deleteTramDung(tramToDelete._id);
        if (res && res.EC === 0) {
          notification.success({
            message: "Xóa trạm dừng",
            description: "Xóa trạm dừng thành công"
          });
          setTramDung((prev) => prev.filter((tram) => tram._id !== tramToDelete._id));
        } else {
          alert(res.EM);
        }
      } catch (error) {
        console.error("Error deleting tram dung:", error);
        alert("Đã xảy ra lỗi khi xóa trạm dừng");
      }
    }
    setIsModalVisible(false);
    setTramToDelete(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTramToDelete(null);
  };

  return (
    <div className="w-auto h-full bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-4xl">Danh sách trạm dừng</h1>
        <Link to="/waypoint/list/create">
          <Button variant="contained" color="primary">Thêm trạm dừng</Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Mã Trạm</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Tên Trạm Dừng</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Địa Chỉ</TableCell>
              <TableCell sx={{ color: '#1a73e8', fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tramDung.map((tram) => (
              <TableRow key={tram._id} sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}>
                <TableCell>{tram.MaTramDung}</TableCell>
                <TableCell>{tram.TenTramDung}</TableCell>
                <TableCell>{tram.DiaChi}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => showModal(tram)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal xác nhận xóa */}
      <AntdModal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
      >
        <p>Bạn có chắc chắn muốn xóa trạm dừng này?</p>
      </AntdModal>
    </div>
  );
};

export default DanhSachTramDung;
