import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { agentLocalAPI } from "~/apis/Catalogs/agentLocalAPI";
import Draggable from "react-draggable";
import {
  Province_Getlist,
  Province_Insert,
  Province_Update,
} from "~/redux/Catalogs/provinceSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// Component để tạo Paper có thể kéo thả
function DraggablePaper(props) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      bounds="parent"
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

function ProvinceIUpdateModal({ addNew, selectedItem, open, onClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [formAction, setFormAction] = useState(true);
  const [localList, setLocalList] = useState([]);
  const [PROV_ID, setPROV_ID] = useState(0);
  const [PROV_NAME, setPROV_NAME] = useState("");
  const [PROV_UNSIGNNAME, setPROV_UNSIGNNAME] = useState("");
  const [STAT_ID, setSTAT_ID] = useState("ENABLE");

  const handleSaveClose = async () => {
    // kiểm tra nhập liệu
    if (!PROV_NAME.trim()) {
      toast.warn("Chưa nhập tên đường.!");
      return;
    }

    await I_Update();
    // thêm và đóng form
    onClose();
  };

  const handleSaveAddNew = async () => {
    // kiểm tra nhập liệu
    if (!PROV_NAME.trim()) {
      toast.warn("Chưa nhập tên đường.!");
      return;
    }

    await I_Update();
    // clear state
    setFormAction(true);
    setPROV_NAME("");
    setPROV_UNSIGNNAME("");
    setSTAT_ID("ENABLE");
  };
  const I_Update = async () => {
    let postData;
    let result;
    if (formAction) {
      postData = {
        I_PROV_NAME: PROV_NAME,
        I_PROV_UNSIGNNAME: PROV_UNSIGNNAME,
        I_PROV_ID: PROV_ID,
        I_STAT_ID: STAT_ID,
      };
      result = await dispatch(Province_Getlist(postData)).unwrap(); // Gọi action thêm mới
      console.log("🚀 ~ handleSaveClose ~ result:", result);
      if (result?.O_RESULT === 1) {
        toast.success("Thêm mới thành công!", {
          position: "bottom-right", // 👈 Hiển thị ở góc dưới bên phải
          autoClose: 3000, // Tự tắt sau 3s
          theme: theme.palette.mode === "dark" ? "dark" : "light", // Đồng bộ theme
        });
        dispatch(Province_Getlist()); // Tải lại danh sách sau khi thêm
      } else {
        toast.error("Có lỗi xảy ra! " + result?.O_MESSAGE, {
          position: "bottom-right", // 👈 Hiển thị ở góc dưới bên phải
          autoClose: 3000, // Tự tắt sau 3s
          theme: theme.palette.mode === "dark" ? "dark" : "light", // Đồng bộ theme
        });
      }
    } else {
      postData = {
        I_STRT_ID: selectedItem?.STRT_ID,
        I_PROV_NAME: PROV_NAME,
        I_PROV_UNSIGNNAME: PROV_UNSIGNNAME,
        I_PROV_ID: PROV_ID,
        I_STAT_ID: STAT_ID,
      };
      result = await dispatch(Province_Update(postData)).unwrap(); // Gọi action thêm mới
      console.log("🚀 ~ handleSaveAddNew ~ result:", result);
      if (result?.O_RESULT === 1) {
        toast.success("Cập nhật thành công!", {
          position: "bottom-right", // 👈 Hiển thị ở góc dưới bên phải
          autoClose: 3000, // Tự tắt sau 3s
          theme: theme.palette.mode === "dark" ? "dark" : "light", // Đồng bộ theme
        });
        dispatch(Province_Getlist()); // Tải lại danh sách sau khi thêm
      } else {
        toast.error("Có lỗi xảy ra! " + result?.O_MESSAGE, {
          position: "bottom-right", // 👈 Hiển thị ở góc dưới bên phải
          autoClose: 3000, // Tự tắt sau 3s
          theme: theme.palette.mode === "dark" ? "dark" : "light", // Đồng bộ theme
        });
      }
    }
  };

  const loadList = async () => {
    const list = await agentLocalAPI.AgentLocal_Getlist();
    const data = list.O_DATATABLE || [];
    setLocalList(data);

    if (list?.O_DATATABLE?.length > 0) {
      setPROV_ID(list.O_DATATABLE[0].LAGNT_ID);
    }
  };

  // Load ds khu vực khi danh sách street được load trước
  useEffect(() => {
    loadList();
  }, []);

  useEffect(() => {
    if (!open) return;
    // state formAction thay đổi sẽ load lại dữ liệu
    console.log("🚀 ~ StreetIUpdateModal ~ formAction:", addNew);
    if (!addNew) {
      setPROV_ID(selectedItem?.LAGNT_ID);
      setPROV_NAME(selectedItem?.STRT_NAME);
      setPROV_UNSIGNNAME(selectedItem?.STRT_UNSIGNNAME);
      setSTAT_ID(selectedItem?.STAT_ID);
    } else {
      setPROV_NAME("");
      setPROV_UNSIGNNAME("");
      setSTAT_ID("ENABLE");
    }
    // nhận trạng thái ban đầu để form xác định đang thêm hay sửa
    setFormAction(addNew);
  }, [open, addNew]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={DraggablePaper}
      aria-labelledby="draggable-dialog-title"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          position: "absolute",
          top: 60, // cách top 60px
          m: 0, // bỏ margin
          borderRadius: 2,
          // minHeight: "520px",
          // width: "500px",
          maxWidth: "500px",
          cursor: "default",
          "&:hover": {
            boxShadow: (theme) => theme.shadows[8],
          },
        },
      }}
    >
      {/* Header with title and close button */}
      <DialogTitle
        id="draggable-dialog-title"
        sx={{
          cursor: "move",
          //  backgroundColor: "grey.50",
          userSelect: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          //  borderBottom: "1px solid #e0e0e0",
          pb: 0,
          mt: -1,
          "&:hover": {
            //backgroundColor: "grey.100",
          },
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {formAction ? "Thêm mới đường:" : "Cập nhật đường:"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ pt: 3, pb: 0, px: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Tên tỉnh"
            value={PROV_NAME}
            onChange={(e) => setPROV_NAME(e.target.value)}
            fullWidth
            required
            variant="outlined"
          />

          <TextField
            label="Tên viết tắt"
            value={PROV_UNSIGNNAME}
            onChange={(e) => setPROV_UNSIGNNAME(e.target.value)}
            fullWidth
            variant="outlined"
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="status-select-label">Trạng thái</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={STAT_ID}
              label="Trạng thái"
              onChange={(event) => {
                setSTAT_ID(event.target.value);
              }}
            >
              <MenuItem value="ENABLE">Đang sử dụng</MenuItem>
              <MenuItem value="DISABLE">Ngưng sử dụng</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      {/* Actions with buttons aligned to the right */}
      <DialogActions
        sx={{
          p: 1.5,
          pt: 1.5,
          pr: 3,
          backgroundColor: (theme) => theme.palette.background.secondary,
          // borderTop: "1px solid #e0e0e0",
          gap: 0,
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={handleSaveClose}
          variant="contained"
          size="small"
          sx={{ minWidth: "70px", px: 2, textTransform: "none", p: 1 }}
        >
          {/* <SaveOutlinedIcon /> */}
          Lưu
        </Button>
        <Button
          onClick={handleSaveAddNew}
          variant="outlined"
          color="success"
          size="small"
          sx={{ minWidth: "100px", px: 2, textTransform: "none", p: 1 }}
        >
          Lưu & Thêm
        </Button>

        <Button
          onClick={onClose}
          variant="outlined"
          color="warning"
          size="small"
          sx={{ minWidth: "70px", px: 2, textTransform: "none", p: 1 }}
        >
          {/* <ExitToAppIcon /> */}
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProvinceIUpdateModal;
