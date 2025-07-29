import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Street_Delete, Street_Getlist } from "~/redux/Catalogs/streetSlice";

function StreetDeleteModal({ selectedItem, open, onClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  // Xác nhận xóa
  const handleConfirmDelete = async () => {
    console.log("Xóa street với ID:", selectedItem?.STRT_ID);
    var postDATA = {
      I_STRT_ID: selectedItem.STRT_ID,
    };
    var result = await dispatch(Street_Delete(postDATA)).unwrap(); // Gọi action xóa nếu cần

    if (result?.O_RESULT === 1) {
      toast.success("Xóa thành công!", {
        position: "bottom-right", // 👈 Hiển thị ở góc dưới bên phải
        autoClose: 3000, // Tự tắt sau 3s
        theme: theme.palette.mode === "dark" ? "dark" : "light", // Đồng bộ theme
      });
      dispatch(Street_Getlist()); // Tải lại danh sách sau khi xóa
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
            <strong>{selectedItem.STRT_NAME}</strong> (ID:{" "}
            {selectedItem.STRT_ID}) không?
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

export default StreetDeleteModal;
