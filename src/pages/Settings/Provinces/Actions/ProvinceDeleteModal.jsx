import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Province_Delete,
  Province_Getlist,
} from "~/redux/Catalogs/provinceSlice";

export default function ProvinceDeleteModal(selectedItem, open, onClose) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleConfirmDelete = async () => {
    console.log("Xóa Province với ID:", selectedItem?.PROV_ID);
    var postDATA = {
      I_PROV_ID: selectedItem.PROV_ID,
    };
    var result = await dispatch(Province_Delete(postDATA)).unwrap(); // Gọi action xóa nếu cần

    if (result?.O_RESULT === 1) {
      toast.success("Xóa thành công!", {
        position: "bottom-right", // 👈 Hiển thị ở góc dưới bên phải
        autoClose: 3000, // Tự tắt sau 3s
        theme: theme.palette.mode === "dark" ? "dark" : "light", // Đồng bộ theme
      });
      dispatch(Province_Getlist()); // Tải lại danh sách sau khi xóa
      onClose();
    } else {
      toast.error("Có lỗi xảy ra! " + result?.O_MESSAGE, {
        position: "bottom-right", // 👈 Hiển thị ở góc dưới bên phải
        autoClose: 3000, // Tự tắt sau 3s
        theme: theme.palette.mode === "dark" ? "dark" : "light", // Đồng bộ theme
      });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            position: "absolute",
            top: 60, // cách top 60px
            m: 0, // bỏ margin
          },
        }}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa đường{" "}
            <strong>{selectedItem.PROV_NAME}</strong> (ID:{" "}
            {selectedItem.PROV_ID}) không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
