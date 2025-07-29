import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { positionAPI } from '~/apis/Catalogs/positionAPI'

// Thunk: Fetch danh sách position
export const Position_Getlist = createAsyncThunk(
  "Catalogs/Position_Getlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await positionAPI.Position_Getlist()
      return response
    } catch (error) {     
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải danh sách vị trí công việc')
    }
  }
);

// Thunk: Thêm position
export const Position_Insert = createAsyncThunk(
  "Catalogs/Position_Insert",
 async (data, { rejectWithValue }) => {
    try {
      const response = await positionAPI.Position_Insert(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tạo vị trí công việc')
    }
  }
);

// Thunk: Cập nhật position
export const Position_Update = createAsyncThunk(
  "Catalogs/Position_Update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await positionAPI.Position_Update(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật vị trí công việc')
    }
  }
);

// Thunk: Xóa position
export const Position_Delete = createAsyncThunk(
  "Catalogs/Position_Delete",
   async (data, { rejectWithValue }) => {
    try {
      const response = await positionAPI.Position_Delete(data)          
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa vị trí công việc')
    }
  }
);

const positionSlice = createSlice({
  name: "positions",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load danh sách    
    .addCase(Position_Getlist.pending, (state) => {
        state.loading = true;  
         state.error= null    
      })
      .addCase(Position_Getlist.fulfilled, (state, action) => {
        state.loading = false;      
        state.items = action?.payload?.O_DATATABLE || [];       
      })
      .addCase(Position_Getlist.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách vị trí công việc";       
      })      
      // goi ham them
      .addCase(Position_Insert.pending, (state) => {
        state.loading = true;  
         state.error= null    
      })
      .addCase(Position_Insert.fulfilled, (state, action) => {
        console.log("Position_Insert",state, action)
      })      
      .addCase(Position_Insert.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi thêm vị trí công việc";       
      })     
      //goi ham cap nhat
      .addCase(Position_Update.pending, (state) => {
        state.loading = true;  
        state.error= null    
      })
      .addCase(Position_Update.fulfilled, (state, action) => {
          state.loading = false;
          console.log("Position_Update",state, action)
      })
      .addCase(Position_Update.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi cập nhật vị trí công việc";       
      })    
      // goi ham xoa
       .addCase(Position_Delete.pending, (state) => {
        state.loading = true;  
        state.error= null    
      })
      .addCase(Position_Delete.fulfilled, (state, action) => {     
        state.loading = false;   
        console.log("Position_Delete", action)  
      })
       .addCase(Position_Delete.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi xóa vị trí công việc";       
      }) ;
  }
});

export default positionSlice.reducer;
