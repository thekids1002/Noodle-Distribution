import firestore from '@react-native-firebase/firestore';
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import storage from '@react-native-firebase/storage';
interface User {
  UserID: any;
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

// lấy dữ liệu từ firebase sử dụng createAsyncThunk và trả về 1 User
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (message: string) => {
    try {
      const userDocument = await firestore()
        .collection('users')
        .where('UserID', '==', message)
        .get();

      if (userDocument.empty) {
        return null;
      }
      const user = userDocument.docs[0].data() as User;
      if (user.Image != '') {
        user.Image = await storage().ref(user.Image).getDownloadURL();
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
);

//  trừ đi ly mì đẫ chọn, sử dụng createAsyncThunk
export const subNoodle = createAsyncThunk(
  'user/subNoodle',
  async ({message, numberNoodle}: {message: string; numberNoodle: number}) => {
    await firestore()
      .collection('users')
      .where('UserID', '==', message)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async doc => {
          await firestore().collection('users').doc(doc.id).update({
            numberNoodle: numberNoodle,
          });
        });
        console.log('SubNoodle success :' + numberNoodle);
      });
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {},
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
export const {setUser} = userSlice.actions;

export default userSlice.reducer;
