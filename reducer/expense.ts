import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Expense } from '../types'

interface ExpenseState {
  expenses: Expense[]
}

const initialState: ExpenseState = {
  expenses: []
}

export const expenseReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<Expense[]>) => {
      const expenses = action.payload
      state.expenses = expenses
    },
    updateExpense: (state, action: PayloadAction<{
      id: string;
      expense: Expense
    }>) => {
      const { id, expense } = action.payload
      try {        
        const currentExpenses: Expense[] = JSON.parse(localStorage.getItem(id) || '[]')
        const expenses = [...currentExpenses, expense]
        localStorage.setItem(id, JSON.stringify(expenses))
        state.expenses = expenses
      } catch (error) {
        console.log(error)
      }
    }
  },
})

export const { setExpense, updateExpense } = expenseReducer.actions

export default expenseReducer.reducer