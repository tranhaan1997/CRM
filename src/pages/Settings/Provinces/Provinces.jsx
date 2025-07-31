import { Box, Typography } from "@mui/material";
import MainLayout from "~/components/Layout/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
// import { useAppContext } from "~/AppContext";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import { Province_Getlist } from "~/redux/Catalogs/provinceSlice";
import { useEffect, useState } from "react";
import ProvinceIUpdateModal from "./Actions/ProvinceIUpdateModal";
import ProvinceDeleteModal from "./Actions/ProvinceDeleteModal";

function Provinces() {
  // const { header } = useAppContext();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.province?.items);

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
    { field: "PROV_NAME", headerName: "Tên tỉnh", width: 300 },
    { field: "PROV_UNSIGNNAME", headerName: "Tên viết tắt", width: 300 },
    {
      field: "STAT_NAME",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        const value = params.row.STAT_ID;
        const name = params.row.STAT_NAME;
        let color = "default";
        if (value === "ENABLE") {
          color = "success";
        } else if (value === "DISABLE") {
          color = "warning";
        }
        return (
          <Chip label={name} variant="outlined" color={color} size="small" />
        );
      },
    },
    {
      field: "actions",
      headerName: "Chức năng",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => {
              setSelectedItem(params.row);
              handleIUpdate(false);
            }}
          >
            Sửa
          </Button>
          <Button variant="outlined" color="error" size="small">
            Xóa
          </Button>
        </>
      ),
    },
  ];

  // Load ds đường ban đầu
  useEffect(() => {
    dispatch(Province_Getlist());
  }, [dispatch]);

  const paginationModel = { page: 0, pageSize: 20 };

  // State cho dialog xác nhận
  const [openDel, setOpenDel] = useState(false);
  // state cho form thêm - cập nhật
  const [openAdd, setOpenAdd] = useState(false);
  //state thêm - cập nhật
  const [addNew, setAddNew] = useState(true);
  // Item đang được chọn
  const [selectedItem, setSelectedItem] = useState({});
  // gọi mở form gán loại cần thêm hoặc cập nhật
  const handleIUpdate = (add) => {
    setOpenAdd(true);
    setAddNew(add);
  };

  return (
    <MainLayout>
      <Box sx={{ p: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Danh mục tỉnh
          </Typography>
          <Button variant="contained" onClick={() => handleIUpdate(true)}>
            Thêm mới
          </Button>
        </Box>
        <Box sx={{ height: "600px", mt: 1, border: "1px solid black" }}>
          <DataGrid
            rows={items || []}
            columns={columns}
            getRowId={(row) => row.PROV_ID}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{
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

      <ProvinceIUpdateModal
        addNew={addNew}
        selectedItem={selectedItem}
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />

      <ProvinceDeleteModal
        open={openDel}
        selectedItem={selectedItem}
        onClose={() => setOpenDel(false)}
      />
    </MainLayout>
  );
}

export default Provinces;
