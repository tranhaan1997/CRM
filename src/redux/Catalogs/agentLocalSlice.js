import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { agentLocalAPI } from '~/apis/Catalogs/agentLocalAPI'

// Thunk: Fetch danh sách position
export const AgentLocal_Getlist = createAsyncThunk(
  "Catalogs/AgentLocal_Getlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await agentLocalAPI.AgentLocal_Getlist()
      return response
    } catch (error) {     
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải danh sách khu vực, chi nhánh')
    }
  }
);

const agentLocalSlice = createSlice({
  name: "agentLocals",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load danh sách    
    .addCase(AgentLocal_Getlist.pending, (state) => {
        state.loading = true;  
         state.error= null    
      })
      .addCase(AgentLocal_Getlist.fulfilled, (state, action) => {
        state.loading = false;      
        state.items = action?.payload?.O_DATATABLE || [];       
      })
      .addCase(AgentLocal_Getlist.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi khi tải danh sách khu vực, chi nhánh";       
      });
  }
});

export default agentLocalSlice.reducer;
