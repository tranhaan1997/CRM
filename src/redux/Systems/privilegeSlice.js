import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privilegeAPI } from "~/apis/Systems/privilegeAPI";

// Thunk: Fetch danh sách nhóm quyền/vai trò
export const Privilege_Getlist = createAsyncThunk(
  "System/Privilege_Getlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await privilegeAPI.Privilege_Getlist()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải danh sách nhóm quyền/vai trò')
    }
  }
);

// Thunk: Thêm thông tin nhóm quyền/vai trò
export const Privilege_Insert = createAsyncThunk(
  "System/Privilege_Insert",
  async (data, { rejectWithValue }) => {
    try {
      const response = await privilegeAPI.Privilege_Insert(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi thêm thông tin nhóm quyền/vai trò')
    }
  }
);

// Thunk: Cập nhật thông tin nhóm quyền
export const Privilege_Update = createAsyncThunk(
  "System/Privilege_Update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await privilegeAPI.Privilege_Update(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật thông tin nhóm quyền')
    }
  }
);

// Thunk: Xóa thông tin quyền
export const Privilege_Delete = createAsyncThunk(
  "System/Privilege_Delete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await privilegeAPI.Privilege_Delete(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa thông tin quyền')
    }
  }
);

const privilegeSlice = createSlice({
  name: "privileges",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load danh sách    
      .addCase(Privilege_Getlist.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(Privilege_Getlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action?.payload?.O_DATATABLE || [];
      })
      .addCase(Privilege_Getlist.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách nhóm quyền/vai trò";
      })
      // goi ham them
      .addCase(Privilege_Insert.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(Privilege_Insert.fulfilled, (state, action) => {
        console.log("Privilege_Insert", state, action)
      })
      .addCase(Privilege_Insert.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi thêm thông tin nhóm quyền/vai trò";
      })
      //goi ham cap nhat
      .addCase(Privilege_Update.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(Privilege_Update.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Privilege_Update", state, action)
      })
      .addCase(Privilege_Update.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi cập nhật thông tin nhóm quyền";
      })
      // goi ham xoa
      .addCase(Privilege_Delete.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(Privilege_Delete.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Privilege_Delete", action)
      })
      .addCase(Privilege_Delete.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi xóa thông tin quyền";
      });
  }
});

export default privilegeSlice.reducer;