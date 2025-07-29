import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { departmentsAPI } from '~/apis/Catalogs/departmentsAPI'

// Thunk: Fetch danh sách departments
export const Departments_Getlist = createAsyncThunk(
  "Catalogs/Departments_Getlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await departmentsAPI.Departments_Getlist()
      return response
    } catch (error) {     
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải danh sách phòng ban')
    }
  }
);

// Thunk: Thêm Departments
export const Departments_Insert = createAsyncThunk(
  "Catalogs/Departments_Insert",
 async (data, { rejectWithValue }) => {
    try {
      const response = await departmentsAPI.Departments_Insert(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tạo phòng ban')
    }
  }
);

// Thunk: Cập nhật departments
export const Departments_Update = createAsyncThunk(
  "Catalogs/Departments_Update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await departmentsAPI.Departments_Update(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật phòng ban')
    }
  }
);

// Thunk: Xóa Departments
export const Departments_Delete = createAsyncThunk(
  "Catalogs/Departments_Delete",
   async (data, { rejectWithValue }) => {
    try {
      const response = await departmentsAPI.Departments_Delete(data)          
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa phòng ban')
    }
  }
);

const deparmentsSlice = createSlice({
  name: "departments",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load danh sách    
    .addCase(Departments_Getlist.pending, (state) => {
        state.loading = true;  
         state.error= null    
      })
      .addCase(Departments_Getlist.fulfilled, (state, action) => {
        state.loading = false;      
        state.items = action?.payload?.O_DATATABLE || [];       
      })
      .addCase(Departments_Getlist.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách phòng ban";       
      })      
      // goi ham them
      .addCase(Departments_Insert.pending, (state) => {
        state.loading = true;  
         state.error= null    
      })
      .addCase(Departments_Insert.fulfilled, (state, action) => {
        console.log("Departments_Insert",state, action)
      })      
      .addCase(Departments_Insert.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi thêm phòng ban";       
      })     
      //goi ham cap nhat
      .addCase(Departments_Update.pending, (state) => {
        state.loading = true;  
        state.error= null    
      })
      .addCase(Departments_Update.fulfilled, (state, action) => {
          state.loading = false;
          console.log("Departments_Update",state, action)
      })
      .addCase(Departments_Update.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi cập nhật phòng ban";       
      })    
      // goi ham xoa
       .addCase(Departments_Delete.pending, (state) => {
        state.loading = true;  
        state.error= null    
      })
      .addCase(Departments_Delete.fulfilled, (state, action) => {     
        state.loading = false;   
        console.log("Departments_Delete", action)  
      })
       .addCase(Departments_Delete.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi xóa phòng ban";       
      }) ;
  }
});

export default deparmentsSlice.reducer;
