import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { permissionsAPI } from "~/apis/Systems/permissionsAPI";

// Thunk: Fetch danh sách Permissions
export const permissionsMe = createAsyncThunk(
  "Systems/Permissions/Me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await permissionsAPI.permissions_Me();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải danh sách "
      );
    }
  }
)

// Thunk: Fetch danh sách Permissions
export const Permissions_Getlist = createAsyncThunk(
  "Systems/Permissions/Getlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await permissionsAPI.Permissions_Getlist();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải danh sách quyền"
      );
    }
  }
)

// Thunk: Thêm thông tin Permissions
export const Permissions_Insert = createAsyncThunk(
  "Systems/Permissions/Insert",
  async (data, { rejectWithValue }) => {
    try {
      const response = await permissionsAPI.Permissions_Insert(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi thêm thông tin quyền"
      );
    }
  }
)

// Thunk: Cập nhật thông tin Permissions
export const Permissions_Update = createAsyncThunk(
  "Systems/Permissions/Update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await permissionsAPI.Permissions_Update(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi cập nhật thông tin quyền"
      );
    }
  }
)

// Thunk: Xóa thông tin Permissions
export const Permissions_Delete = createAsyncThunk(
  "Systems/Permissions/Delete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await permissionsAPI.Permissions_Delete(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi xóa thông tin quyền"
      );
    }
  }
)

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load danh sách
      .addCase(permissionsMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(permissionsMe.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action?.payload?.O_DATATABLE || [];

        // không được cấp quyền nào cả
        if (
          action?.payload?.O_DATATABLE == null ||
          action?.payload?.O_DATATABLE.length == 0
        )
          window.location.href = "/access-deny";
      })
      .addCase(permissionsMe.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách permision";
      })

      // load danh sách Permissions
      .addCase(Permissions_Getlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(Permissions_Getlist.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action?.payload?.O_DATATABLE || [];
    })
    .addCase(Permissions_Getlist.rejected, (state) => {
      state.loading = false;
      state.error = "Lỗi khi tải danh sách quyền";
    })

    // Thêm thông tin Permissions
    .addCase(Permissions_Insert.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(Permissions_Insert.fulfilled, (state, action) => {
      state.loading = false;
      console.log("Permissions_Insert", state, action);
    })
    .addCase(Permissions_Insert.rejected, (state) => {
      state.loading = false;
      state.error = "Lỗi khi thêm thông tin quyền";
    })

    // Cập nhật thông tin Permissions
    .addCase(Permissions_Update.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(Permissions_Update.fulfilled, (state, action) => {
      state.loading = false;
      console.log("Permissions_Update", state, action);
    })
    .addCase(Permissions_Update.rejected, (state) => {
      state.loading = false;
      state.error = "Lỗi khi cập nhật thông tin quyền";
    })

    // Xóa thông tin Permissions
    .addCase(Permissions_Delete.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(Permissions_Delete.fulfilled, (state, action) => {
      state.loading = false;
      console.log("Permissions_Delete", action);
    })
    .addCase(Permissions_Delete.rejected, (state) => {
      state.loading = false;
      state.error = "Lỗi khi xóa tài khoản hệ thống";
    });
},
});

export default permissionsSlice.reducer;
