import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privilegeProfilesAPI } from '~/apis/Systems/privilegeProfilesAPI';

// Thunk: Fetch danh sách đã/chưa phân quyền
export const PrivilegeProfile_GetPrid = createAsyncThunk(
  "System/PrivilegeProfile_GetPrid/{I_PRIV_ID}/{I_ADD}",
  async (_, { rejectWithValue }) => {
    try {
      const response = await privilegeProfilesAPI.PrivilegeProfile_GetPrid()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải danh sách đã/chưa phân quyền')
    }
  }
);

// Thunk: Thêm thông tin quyền vào nhóm
export const PrivilegeProfile_Insert = createAsyncThunk(
  "System/PrivilegeProfile_Insert",
  async (data, { rejectWithValue }) => {
    try {
      const response = await privilegeProfilesAPI.PrivilegeProfile_Insert(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi thêm thông tin quyền vào nhóm')
    }
  }
);

// Thunk: Xóa thông tin cấp quyền vào nhóm
export const PrivilegeProfile_Delete = createAsyncThunk(
  "System/PrivilegeProfile_Delete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await privilegeProfilesAPI.PrivilegeProfile_Delete(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa thông tin cấp quyền vào nhóm')
    }
  }
);

const privilegeProfilesSlice = createSlice({
  name: "privilegeProfiles",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load danh sách    
      .addCase(PrivilegeProfile_GetPrid.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(PrivilegeProfile_GetPrid.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action?.payload?.O_DATATABLE || [];
      })
      .addCase(PrivilegeProfile_GetPrid.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách đã/chưa phân quyền";
      })
      // goi ham them
      .addCase(PrivilegeProfile_Insert.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(PrivilegeProfile_Insert.fulfilled, (state, action) => {
        console.log("PrivilegeProfile_Insert", state, action)
      })
      .addCase(PrivilegeProfile_Insert.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi thêm thông tin quyền vào nhóm";
      })
      // goi ham xoa
      .addCase(PrivilegeProfile_Delete.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(PrivilegeProfile_Delete.fulfilled, (state, action) => {
        state.loading = false;
        console.log("PrivilegeProfile_Delete", action)
      })
      .addCase(PrivilegeProfile_Delete.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi xóa thông tin cấp quyền vào nhóm";
      });
  }
});

export default privilegeProfilesSlice.reducer;
