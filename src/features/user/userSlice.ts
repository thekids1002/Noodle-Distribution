// Định nghĩa slice quản lý trạng thái của người dùng
// Bao gồm thông tin về người dùng như UID, họ tên, ngày sinh, giới tính, phòng ban, số mì tương ứng và hình ảnh.
// Slice bao gồm một trạng thái ban đầu cho người dùng là không xác định và trạng thái của slice có thể là idle, loading, succeeded hoặc failed.
// Slice bao gồm một action để thiết lập thông tin người dùng và một async action để lấy thông tin người dùng từ tài liệu Firestore
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

export const setNumberNoodle = createAsyncThunk(
  'user/setNumberNoodle',
  async ({message, numberNoodle}: {message: string; numberNoodle: number}) => {
    firestore()
      .collection('users')
      .doc(message)
      .update({
        numberNoodle: numberNoodle,
      })
      .then(() => {
        console.log('User updated!');
      });
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
      })

      .addCase(setNumberNoodle.pending, state => {
        state.status = 'loading';
      })
      .addCase(setNumberNoodle.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(setNumberNoodle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
