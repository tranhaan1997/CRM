import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { wardAPI } from '~/apis/Catalogs/wardAPI'

// Thunk: Fetch danh sách ward
export const Ward_Getlist = createAsyncThunk(
  "Catalogs/Ward_Getlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await wardAPI.Ward_Getlist()
      return response
    } catch (error) {     
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải danh sách ')
    }
  }
);

// Thunk: Thêm Ward
export const Ward_Insert = createAsyncThunk(
  "Catalogs/Ward_Insert",
 async (data, { rejectWithValue }) => {
    try {
      const response = await wardAPI.Ward_Insert(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tạo phường/xã')
    }
  }
);

// Thunk: Cập nhật ward
export const Ward_Update = createAsyncThunk(
  "Catalogs/Ward_Update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await wardAPI.Ward_Update(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật phường/xã')
    }
  }
);

// Thunk: Xóa Ward
export const Ward_Delete = createAsyncThunk(
  "Catalogs/Ward_Delete",
   async (data, { rejectWithValue }) => {
    try {
      const response = await wardAPI.Ward_Delete(data)          
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa phường/xã')
    }
  }
);

const wardSlice = createSlice({
  name: "wards",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load danh sách    
    .addCase(Ward_Getlist.pending, (state) => {
        state.loading = true;  
         state.error= null    
      })
      .addCase(Ward_Getlist.fulfilled, (state, action) => {
        state.loading = false;      
        state.items = action?.payload?.O_DATATABLE || [];       
      })
      .addCase(Ward_Getlist.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách phường/xã";       
      })      
      // goi ham them
      .addCase(Ward_Insert.pending, (state) => {
        state.loading = true;  
         state.error= null    
      })
      .addCase(Ward_Insert.fulfilled, (state, action) => {
        console.log("Ward_Insert",state, action)
      })      
      .addCase(Ward_Insert.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi thêm phường/xã";       
      })     
      //goi ham cap nhat
      .addCase(Ward_Update.pending, (state) => {
        state.loading = true;  
        state.error= null    
      })
      .addCase(Ward_Update.fulfilled, (state, action) => {
          state.loading = false;
          console.log("Ward_Update",state, action)
      })
      .addCase(Ward_Update.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi cập nhật phường/xã";       
      })    
      // goi ham xoa
       .addCase(Ward_Delete.pending, (state) => {
        state.loading = true;  
        state.error= null    
      })
      .addCase(Ward_Delete.fulfilled, (state, action) => {     
        state.loading = false;   
        console.log("Ward_Delete", action)  
      })
       .addCase(Ward_Delete.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi xóa phường/xã";       
      }) ;
  }
});

export default wardSlice.reducer;
