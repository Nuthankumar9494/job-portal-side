import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Job } from '../types/job';

interface BookmarksState {
  bookmarkedJobs: Job[];
}

const initialState: BookmarksState = {
  bookmarkedJobs: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Job>) => {
      state.bookmarkedJobs.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarkedJobs = state.bookmarkedJobs.filter(job => job.slug !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
