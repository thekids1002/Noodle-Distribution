import firestore from '@react-native-firebase/firestore';
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

interface User {
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
  tempUId: string;
}

const initialState: userState = {
  user: undefined,
  status: 'idle',
  error: null,
  tempUId: '',
};

// lấy dữ liệu từ firebase sử dụng createAsyncThunk và trả về 1 User
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

//  trừ đi ly mì đẫ chọn, sử dụng createAsyncThunk
export const subNoodle = createAsyncThunk(
  'user/subNoodle',
  async ({message, numberNoodle}: {message: string; numberNoodle: number}) => {
    await firestore()
      .collection('users')
      .doc(message)
      .update({
        numberNoodle: numberNoodle,
      })
      .then(() => {
        console.log('SubNoodle success :' + numberNoodle);
      });
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {},
    setTempUid: (state, action: PayloadAction<string>) => {
      state.tempUId = action.payload;
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
      })

      .addCase(subNoodle.pending, state => {
        state.status = 'loading';
      })
      .addCase(subNoodle.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(subNoodle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});
export const {setUser, setTempUid} = userSlice.actions;

export default userSlice.reducer;
