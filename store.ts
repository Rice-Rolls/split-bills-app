import { configureStore } from '@reduxjs/toolkit'
import billReducer from './reducer/bill'
import expenseReducer from './reducer/expense'

const store = configureStore({
  reducer: {
    billStore: billReducer,
    expenseStore: expenseReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store