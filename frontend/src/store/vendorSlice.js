import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// ------------------------
// FETCH Vendor Dashboard
// ------------------------
export const fetchVendorDashboard = createAsyncThunk(
  "vendor/dashboard",
  async (_, { getState, rejectWithValue }) => {
    try {

      const token = getState().auth.user?.token;  // <-- IMPORTANT

      const res = await API.get("/vendor/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,  // <-- TOKEN SENT
        },
      });

      return res.data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching vendor dashboard"
      );
    }
  }
);




// ------------------------
// ADD Product
// ------------------------
export const addProduct = createAsyncThunk(
  "vendor/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/vendor/add-product", formData);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error adding product");
    }
  }
);

// ------------------------
// GET Vendor Products
// ------------------------
export const fetchVendorProducts = createAsyncThunk(
  "vendor/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/vendor/products");
      return res.data.products;
    } catch (err) {
      return rejectWithValue("Failed to load vendor products");
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    dashboard: {
      vendor: {},
      metrics: {
        totalRevenue: 0,
        productsCount: 0,
        recentOrders: []
      }
    },
    products: [],
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // DASHBOARD
      .addCase(fetchVendorDashboard.pending, (s) => { s.loading = true; })
      .addCase(fetchVendorDashboard.fulfilled, (s, a) => {
        s.loading = false;
        s.dashboard = a.payload;
      })
      .addCase(fetchVendorDashboard.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // ADD PRODUCT
      .addCase(addProduct.pending, (s) => { s.loading = true; })
      .addCase(addProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.products.push(a.payload);
        s.success = "Product added successfully";
      })
      .addCase(addProduct.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // FETCH PRODUCTS
      .addCase(fetchVendorProducts.pending, (s) => { s.loading = true; })
      .addCase(fetchVendorProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.products = a.payload;
      })
      .addCase(fetchVendorProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  }
});

export const { clearMessages } = vendorSlice.actions;
export default vendorSlice.reducer;
