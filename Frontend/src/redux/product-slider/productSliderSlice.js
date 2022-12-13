import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const productSliderSlice = createSlice({
    name: 'productSlider',
    initialState,
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        },
        remove: (state) => {
            state.value = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { set, remove } = productSliderSlice.actions

export default productSliderSlice.reducer