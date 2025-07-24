import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Job } from '../types/job';

interface JobsState {
  allJobs: Job[];
}

const initialState: JobsState = {
  allJobs: [],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.allJobs = action.payload;
    },
  },
});

export const { setJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
