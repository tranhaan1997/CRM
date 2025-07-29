import { Box, Typography, Button, Chip } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Street_Getlist } from "~/redux/Catalogs/streetSlice";
import StreetIUpdateModal from "./Actions/StreetIUpdateModal";
import { DataGrid } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useAppContext } from "~/AppContext";
import StreetDeleteModal from "./Actions/StreetDeleteModal";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-cell[data-field='index'], & .MuiDataGrid-columnHeader[data-field='index']":
    {
      position: "sticky",
      left: 0,
      backgroundColor: theme.palette.background.fixColumnBg,
      zIndex: 2,
    },
  "& .MuiDataGrid-cell[data-field='STRT_NAME'], & .MuiDataGrid-columnHeader[data-field='STRT_NAME']":
    {
      position: "sticky",
      left: 50, // width cột ID
      backgroundColor: theme.palette.background.fixColumnBg,
      zIndex: 2,
    },
  // Hover chỉ cho cột sticky và luôn nổi trên các cell khác
  "& .MuiDataGrid-row:hover .MuiDataGrid-cell[data-field='ROW_INDEX'], \
   & .MuiDataGrid-row:hover .MuiDataGrid-cell[data-field='STRT_NAME']": {
    backgroundColor: theme.palette.background.fixColumnHover,
  },
}));

function Streets() {
  const { header } = useAppContext();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.street?.items);

  const columns = [
    {
      field: "index",
      headerName: "#",
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const index = params.api.getRowIndexRelativeToVisibleRows(params.id);
        const page = params.api.state.pagination.paginationModel.page; // page hiện tại (0-based)
        const pageSize = params.api.state.pagination.paginationModel.pageSize;
        return index != null ? index + 1 + page * pageSize : "";
      },
    },
    {
      field: "STRT_NAME",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "STRT_UNSIGNNAME",
      flex: 1,
      headerName: "Tên viết tắt",
      minWidth: 300,
    },
    { field: "LAGNT_NAME", headerName: "Đơn vị", width: 150 },
    {
      field: "STAT_NAME",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        const value = params.row.STAT_ID;
        const name = params.row.STAT_NAME;
        let color = "default";
        if (value === "ENABLE") color = "success";
        else if (value === "DISABLE") color = "warning";

        return (
          <Chip label={name} color={color} size="small" variant="outlined" />
        );
      },
    },
    {
      field: "actions",
      headerName: "Chức năng",
      width: 200,
      sortable: false, // Tắt sort
      disableColumnMenu: true, // Ẩn nút menu cột
      resizable: false, // Không cho kéo resize
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => {
              setSelectedItem(params.row);
              handleIUpdate(false);
            }}
          >
            Sửa
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => {
              setSelectedItem(params.row);
              setOpenDel(true);
            }}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  // State cho dialog xác nhận
  const [openDel, setOpenDel] = useState(false);
  // state cho form thêm - cập nhật
  const [openAdd, setOpenAdd] = useState(false);
  // state thêm - cập nhật
  const [addNew, setAddNew] = useState(true);
  // Item đang đc chọn
  const [selectedItem, setSelectedItem] = useState({});
  // gọi mở form gán loại cần thêm hoặc cập nhật
  const handleIUpdate = (add) => {
    setOpenAdd(true);
    setAddNew(add);
  };

  // Load ds đường ban đầu
  useEffect(() => {
    dispatch(Street_Getlist());
  }, [dispatch]);

  return (
    <MainLayout>
      {/* <Drag /> */}
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Danh mục đường
          </Typography>

          <Typography variant="h4" gutterBottom>
            <Button
              variant="contained"
              onClick={() => handleIUpdate(true)}
              startIcon={<AddIcon />}
              sx={{ mr: 1 }}
            >
              Thêm
            </Button>
          </Typography>
        </Box>

        <Box
          sx={{
            height: header
              ? `calc(100vh - 130px + 55px) `
              : `calc(100vh - 130px) `,
            border: "1px solid #c4c4c4",
          }}
        >
          <DataGrid
            rows={items || []}
            columns={columns}
            getRowId={(row) => row.STRT_ID}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            rowHeight={36} // 👈 nhỏ hơn mặc định 52
            //headerHeight={40} // 👈 Giảm từ mặc định 56 xuống còn 40
            disableVirtualization
            sx={{
              // minWidth: "1000px",
              "& .MuiDataGrid-columnHeaders": {
                minHeight: "40px !important",
                maxHeight: "40px !important",
              },
              "& .MuiDataGrid-columnHeader": {
                lineHeight: "40px",
                paddingTop: 0,
                paddingBottom: 0,
                bgcolor: (theme) => theme.palette.background.headerGrid,
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "inherit !important", // không đổi màu khi chọn
              },
              "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                {
                  outline: "none",
                },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
                fontSize: "1rem",
              },
              "& .MuiDataGrid-scrollbarFiller--header": {
                background: (theme) => theme.palette.background.headerGrid,
              },
              // '& .MuiDataGrid-cell': {
              //   bgcolor: 'white'
              // },
              "& .MuiToolbar-root": {
                bgcolor: (theme) => theme.palette.background.headerGrid,
              },
              "& .MuiDataGrid-filler": {
                background: (theme) => theme.palette.background.headerGrid,
              },
              "& .MuiDataGrid-columnSeparator": {
                opacity: 0,
                transition: "opacity 0.2s",
              },
              "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-columnSeparator":
                {
                  opacity: 1,
                },
            }}
          />
        </Box>
      </Box>

      {/* Dialog Thêm và cập nhật */}
      <StreetIUpdateModal
        addNew={addNew}
        selectedItem={selectedItem}
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />

      {/* Dialog xác nhận xóa */}
      <StreetDeleteModal
        open={openDel}
        selectedItem={selectedItem}
        onClose={() => setOpenDel(false)}
      />
    </MainLayout>
  );
}

export default Streets;
