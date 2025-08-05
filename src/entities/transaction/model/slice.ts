import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../api/transactionApi";
import { Transaction } from "../types/types.ts";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transations/fetchAll",
  getTransactions
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (data: Omit<Transaction, "id">) => {
    return await createTransaction(data);
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, data }: { id: number; data: Omit<Transaction, "id"> }) => {
    return await updateTransaction(id, data);
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/delete",
  async (id: number) => {
    await deleteTransaction(id);
    return id; // Return the id for the reducer to handle deletion
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transactions";
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) state.transactions[index] = action.payload;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
