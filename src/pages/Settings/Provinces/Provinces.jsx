import { Box, Typography } from "@mui/material";
import MainLayout from "~/components/Layout/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import { useAppContext } from "~/AppContext";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import { Province_Getlist } from "~/redux/Catalogs/provinceSlice";
import { useEffect } from "react";

function Provinces() {
  const { header } = useAppContext();
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
  ];

  useEffect(() => {
    dispatch(Province_Getlist());
  }, [dispatch]);

  const paginationModel = { page: 0, pageSize: 20 };

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
          <Button variant="contained">Thêm mới</Button>
        </Box>
        <Box sx={{ height: "780px", mt: 1, border: "1px solid black" }}>
          <DataGrid
            rows={items || []}
            columns={columns}
            getRowId={(row) => row.PROV_ID}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Provinces;
