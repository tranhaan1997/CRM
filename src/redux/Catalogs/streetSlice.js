import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { streetAPI } from "~/apis/Catalogs/streetAPI";

// Thunk: Fetch danh sách street
export const Street_Getlist = createAsyncThunk(
  "Catalogs/Street_Getlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await streetAPI.Street_Getlist();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải danh sách "
      );
    }
  }
);

// Thunk: Thêm Street
export const Street_Insert = createAsyncThunk(
  "Catalogs/Street_Insert",
  async (data, { rejectWithValue }) => {
    try {
      const response = await streetAPI.Street_Insert(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tạo street"
      );
    }
  }
);

// Thunk: Cập nhật contact
export const Street_Update = createAsyncThunk(
  "Catalogs/Street_Update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await streetAPI.Street_Update(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi cập nhật street"
      );
    }
  }
);

// Thunk: Xóa Street
export const Street_Delete = createAsyncThunk(
  "Catalogs/Street_Delete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await streetAPI.Street_Delete(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi xóa street"
      );
    }
  }
);

const streetSlice = createSlice({
  name: "streets",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load danh sách
      .addCase(Street_Getlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Street_Getlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action?.payload?.O_DATATABLE || [];
      })
      .addCase(Street_Getlist.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách Street";
      })
      // goi ham them
      .addCase(Street_Insert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Street_Insert.fulfilled, (state, action) => {
        console.log("Street_Insert", state, action);
      })
      .addCase(Street_Insert.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi thêm Street";
      })
      //goi ham cap nhat
      .addCase(Street_Update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Street_Update.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("Street_Update", state, action)
      })
      .addCase(Street_Update.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi cập nhật Street";
      })
      // goi ham xoa
      .addCase(Street_Delete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Street_Delete.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("Street_Delete", action)
      })
      .addCase(Street_Delete.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi xóa Street";
      });
  },
});

export default streetSlice.reducer;
