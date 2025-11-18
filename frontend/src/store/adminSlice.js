import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// ------------------------
// Fetch Admin Dashboard Stats
// ------------------------
export const fetchAdminStats = createAsyncThunk(
  "admin/stats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/stats");
      return res.data;
    } catch (err) {
      return rejectWithValue("Unable to fetch admin stats");
    }
  }
);

// ------------------------
// Fetch all pending vendors
// ------------------------
export const fetchPendingVendors = createAsyncThunk(
  "admin/pendingVendors",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/vendors/pending");
      return res.data.vendors;
    } catch (err) {
      return rejectWithValue("Failed to load vendors");
    }
  }
);

// ------------------------
// Approve Vendor
// ------------------------
export const approveVendor = createAsyncThunk(
  "admin/approveVendor",
  async (vendorId, { rejectWithValue }) => {
    try {
      const res = await API.post(`/admin/vendor/approve/${vendorId}`);
      return res.data.vendor;
    } catch (err) {
      return rejectWithValue("Failed to approve vendor");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: {},
    pendingVendors: [],
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    clearAdminMsg: (state) => {
      state.error = null;
      state.success = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // STATS
      .addCase(fetchAdminStats.pending, (s) => { s.loading = true; })
      .addCase(fetchAdminStats.fulfilled, (s, a) => {
        s.loading = false;
        s.stats = a.payload;
      })
      .addCase(fetchAdminStats.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // LOAD PENDING VENDORS
      .addCase(fetchPendingVendors.pending, (s) => { s.loading = true; })
      .addCase(fetchPendingVendors.fulfilled, (s, a) => {
        s.loading = false;
        s.pendingVendors = a.payload;
      })
      .addCase(fetchPendingVendors.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // APPROVE VENDOR
      .addCase(approveVendor.pending, (s) => { s.loading = true; })
      .addCase(approveVendor.fulfilled, (s, a) => {
        s.loading = false;
        s.pendingVendors = s.pendingVendors.filter(v => v._id !== a.payload._id);
        s.success = "Vendor approved successfully";
      })
      .addCase(approveVendor.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { clearAdminMsg } = adminSlice.actions;
export default adminSlice.reducer;
