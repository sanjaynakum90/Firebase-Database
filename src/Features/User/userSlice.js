import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Firebase/config";



export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const docRef = await addDoc(collection(db, "users"), user);
  return { id: docRef.id, ...user };
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, ...fields }) => {
    await updateDoc(doc(db, "users", id), fields);
    return { id, ...fields };
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await deleteDoc(doc(db, "users", id));
  return id;
});


export const subscribeToUsers = (dispatch) => {
  return onSnapshot(collection(db, "users"), (snapshot) => {
    const users = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    dispatch(syncUsers(users));
  });
};



const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle",     
    error: null,
    editingUser: null,   
  },
  reducers: {
    
    syncUsers(state, action) {
      state.list = action.payload;
      state.status = "succeeded";
    },

    setEditingUser(state, action) {
      state.editingUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

    
      .addCase(addUser.pending, (state) => {
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        
        state.status = "succeeded";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

    
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.editingUser = null; 
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      
      .addCase(deleteUser.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        state.list = state.list.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { syncUsers, setEditingUser } = userSlice.actions;
export default userSlice.reducer;