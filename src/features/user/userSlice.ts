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
    await firestore()
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
export const {setUser, setTempUid} = userSlice.actions;

export default userSlice.reducer;
