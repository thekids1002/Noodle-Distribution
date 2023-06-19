import firestore from '@react-native-firebase/firestore';
import {
  createSlice,
  PayloadAction,
  configureStore,
  createAsyncThunk,
} from '@reduxjs/toolkit';

interface User {
  UID: any;
  FullName: any;
  Birthday: any;
  Gender: any;
  Department: any;
  numberNoodle: any;
  Image: any;
}

interface userState {
  user: User | undefined | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: userState = {
  user: undefined,
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (message: string) => {
    const userDocument = firestore()
      .collection('users')
      .doc(message)
      .get()
      .then(snapshot => {
        const data: User | null =
          (snapshot.exists && (snapshot.data() as User)) || null;

        return data;
      });
    const data = await userDocument;
    return data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;