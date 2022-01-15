import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
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
      expense: Expense,
      operation?: 'add' | 'update' | 'remove'
    }>) => {
      const { id, expense, operation = 'add' } = action.payload
      const { id: expenseId } = expense;
      try {        
        const currentExpenses: Expense[] = JSON.parse(localStorage.getItem(id) || '[]')
        let expenses = currentExpenses;
        switch (operation) {
          case 'add':
            expenses = [...expenses, expense]
            break;
          case 'update':
            const index = currentExpenses.findIndex(item => item.id === expenseId);
            if(index !== -1){
              expenses[index] = expense;
            }
            break;
          case 'remove':
            expenses = expenses.filter(item => item.id !== expenseId)
            break;
          default:
            expenses = [...expenses, expense]
            break;
        }
        localStorage.setItem(id, JSON.stringify(expenses))
        state.expenses = expenses
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export const { setExpense, updateExpense } = expenseReducer.actions

export default expenseReducer.reducer