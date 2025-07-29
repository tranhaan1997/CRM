import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { provinceAPI } from '~/apis/Catalogs/provinceAPI'

// Thunk: Fetch danh sách province
export const Province_Getlist = createAsyncThunk(
  "Catalogs/Province_Getlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await provinceAPI.Province_Getlist()
      return response
    } catch (error) {     
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải danh sách tỉnh/thành phố')
    }
  }
);

// Thunk: Thêm Province
export const Province_Insert = createAsyncThunk(
  "Catalogs/Province_Insert",
 async (data, { rejectWithValue }) => {
    try {
      const response = await provinceAPI.Province_Insert(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tạo tỉnh/thành phố')
    }
  }
);

// Thunk: Cập nhật Province
export const Province_Update = createAsyncThunk(
  "Catalogs/Province_Update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await provinceAPI.Province_Update(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật tỉnh/thành phố')
    }
  }
);

// Thunk: Xóa Province
export const Province_Delete = createAsyncThunk(
  "Catalogs/Province_Delete",
   async (data, { rejectWithValue }) => {
    try {
      const response = await provinceAPI.Province_Delete(data)          
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa tỉnh/thành phố')
    }
  }
);

const provinceSlice = createSlice({
  name: "provinces",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load danh sách    
    .addCase(Province_Getlist.pending, (state) => {
        state.loading = true;  
         state.error= null    
      })
      .addCase(Province_Getlist.fulfilled, (state, action) => {
        state.loading = false;      
        state.items = action?.payload?.O_DATATABLE || [];       
      })
      .addCase(Province_Getlist.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách tỉnh/thành phố";       
      })      
      // goi ham them
      .addCase(Province_Insert.pending, (state) => {
        state.loading = true;  
         state.error= null    
      })
      .addCase(Province_Insert.fulfilled, (state, action) => {
        console.log("Province_Insert",state, action)
      })      
      .addCase(Province_Insert.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi thêm Province";       
      })     
      //goi ham cap nhat
      .addCase(Province_Update.pending, (state) => {
        state.loading = true;  
        state.error= null    
      })
      .addCase(Province_Update.fulfilled, (state, action) => {
          state.loading = false;
          console.log("Province_Update",state, action)
      })
      .addCase(Province_Update.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi cập nhật tỉnh/thành phố";       
      })    
      // goi ham xoa
       .addCase(Province_Delete.pending, (state) => {
        state.loading = true;  
        state.error= null    
      })
      .addCase(Province_Delete.fulfilled, (state, action) => {     
        state.loading = false;   
        console.log("Province_Delete", action)  
      })
       .addCase(Province_Delete.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi xóa tỉnh/thành phố";       
      }) ;
  }
});

export default provinceSlice.reducer;
