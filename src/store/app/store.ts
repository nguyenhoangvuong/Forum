import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { adminSlice, categorySlice, commentSlice, postSlide, userSlide } from '../slice/export';

const store = configureStore({
    reducer: {
      category: categorySlice.reducer,
      admin: adminSlice.reducer,
      post: postSlide.reducer,
      user: userSlide.reducer,
      comment: commentSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    })
  });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {category: categoryState ... }
export type AppDispatch = typeof store.dispatch

export default store;