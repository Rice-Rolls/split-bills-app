import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Bill } from '../types'

interface BillState {
  bills: Record<string, Bill>
}

const initialState: BillState = {
  bills: {}
}

export const billReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setBill: (state, action: PayloadAction<Record<string, Bill>>) => {
      const bills = action.payload
      state.bills = bills
    },
    updateBill: (state, action: PayloadAction<{
      id: string;
      bill: Bill
    }>) => {
      const { id, bill } = action.payload
      try {        
        const currentBills: Record<string, Bill> = JSON.parse(localStorage.getItem('bill') || '{}')
        const bills = Object.assign(currentBills, { [id]: bill })
        localStorage.setItem('bill', JSON.stringify(bills))
        state.bills = bills
      } catch (error) {
        console.log(error)
      }
    }
  },
})

export const { setBill, updateBill } = billReducer.actions

export default billReducer.reducer