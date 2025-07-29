import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { operatorsAPI } from "~/apis/Systems/operatorsAPI";
import { SSO } from "~/utils/constants";

// Thunk: Fetch danh sách operators
export const operatorsMe = createAsyncThunk(
  "Systems/Operators/Me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await operatorsAPI.info_Me();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải danh sách tài khoản hệ thống"
      );
    }
  }
);

// Thunk: Fetch danh sách operators
export const Operators_Getlist = createAsyncThunk(
  "System/Operators_Getlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await operatorsAPI.Operators_Getlist();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải danh sách tài khoản hệ thống"
      );
    }
  }
);

// Thunk: Thêm Operators
export const Operators_Insert = createAsyncThunk(
  "System/Operators_Insert",
  async (data, { rejectWithValue }) => {
    try {
      const response = await operatorsAPI.Operators_Insert(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tạo tài khoản hệ thống"
      );
    }
  }
);

// Thunk: Cập nhật Operators
export const Operators_Update = createAsyncThunk(
  "System/Operators_Update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await operatorsAPI.Operators_Update(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi cập nhật tài khoản hệ thống"
      );
    }
  }
);

// Thunk: Xóa Operators
export const Operators_Delete = createAsyncThunk(
  "System/Operators_Delete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await operatorsAPI.Operators_Delete(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi xóa tài khoản hệ thống"
      );
    }
  }
)

const operatorsSlice = createSlice({
  name: "operators",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load thông tin user
      .addCase(operatorsMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(operatorsMe.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action?.payload?.O_DATATABLE || [];

        // kiểm tra thông tin user
        if (action?.payload?.O_RESULT < -1 && action?.payload?.O_RESULT > -6) {
          // Chuyển hướng đến trang đăng nhập SSO
          const ssoLoginUrl =
            `${SSO}?app_code=CRM&redirect_uri=` +
            encodeURIComponent(window.location.href);
          window.location.href = ssoLoginUrl;
        }
      })
      .addCase(operatorsMe.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách tài khoản hệ thống";
      })

      // load danh sách operators
      .addCase(Operators_Getlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Operators_Getlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action?.payload?.O_DATATABLE || [];
      })
      .addCase(Operators_Getlist.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách tài khoản hệ thống";
      })

      // Thêm Operators
      .addCase(Operators_Insert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Operators_Insert.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Operators_Insert", state, action);
      })
      .addCase(Operators_Insert.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tạo tài khoản hệ thống";
      })

      // Cập nhật Operators
      .addCase(Operators_Update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Operators_Update.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Operators_Update", state, action);
      })
      .addCase(Operators_Update.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi cập nhật tài khoản hệ thống";
      }) 

      // Xóa Operators
      .addCase(Operators_Delete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Operators_Delete.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Operators_Delete", action);
      })
      .addCase(Operators_Delete.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi xóa tài khoản hệ thống";
      });
  },
});

export default operatorsSlice.reducer;