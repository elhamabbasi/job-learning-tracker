import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { graphqlFetch } from '@/lib/graphql/client'
import { RootState } from '../store'
import { JobStatus } from '@/app/generated/prisma/client'

// Types
interface JobApplication {
  id: string
  companyName: string
  jobTitle: string
  jobLink: string | null
  location: string | null
  applicationDate: string
  status: JobStatus
  salaryMin: number | null
  salaryMax: number | null
  notes: string | null
}

interface JobsState {
  jobs: JobApplication[]
  isLoading: boolean
  error: string | null
}

// Initial state
const initialState: JobsState = {
  jobs: [],
  isLoading: false,
  error: null,
}

// GraphQL queries and mutations
const GET_JOBS_QUERY = `
  query JobApplications {
    jobApplications {
      id
      companyName
      jobTitle
      jobLink
      location
      applicationDate
      status
      salaryMin
      salaryMax
      notes
    }
  }
`

const CREATE_JOB_MUTATION = `
  mutation CreateJobApplication($input: CreateJobApplicationInput!) {
    createJobApplication(input: $input) {
      id
      companyName
      jobTitle
      jobLink
      location
      applicationDate
      status
      salaryMin
      salaryMax
      notes
    }
  }
`

const DELETE_JOB_MUTATION = `
  mutation DeleteJobApplication($id: ID!) {
    deleteJobApplication(id: $id)
  }
`

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token
      const data = await graphqlFetch<{ jobApplications: JobApplication[] }>(
        GET_JOBS_QUERY,
        {},
        token
      )
      return data.jobApplications
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch jobs')
    }
  }
)

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (input: Omit<JobApplication, 'id'>, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token
      const data = await graphqlFetch<{ createJobApplication: JobApplication }>(
        CREATE_JOB_MUTATION,
        { input },
        token
      )
      return data.createJobApplication
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create job')
    }
  }
)

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const token = state.auth.token
      await graphqlFetch<{ deleteJobApplication: boolean }>(
        DELETE_JOB_MUTATION,
        { id },
        token
      )
      return id
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete job')
    }
  }
)

// The slice
const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobs: (state) => {
      state.jobs = []
      state.error = null
    },
    clearJobsError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<JobApplication[]>) => {
        state.isLoading = false
        state.jobs = action.payload
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create job
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createJob.fulfilled, (state, action: PayloadAction<JobApplication>) => {
        state.isLoading = false
        state.jobs.unshift(action.payload) // Add to beginning of list
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Delete job
      .addCase(deleteJob.fulfilled, (state, action: PayloadAction<string>) => {
        state.jobs = state.jobs.filter(job => job.id !== action.payload)
      })
  },
})

export const { clearJobs, clearJobsError } = jobsSlice.actions
export default jobsSlice.reducer
