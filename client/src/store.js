import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice from 'redux/UserSlice';
 
import ChatReducer from './redux/ChatSlice' 
import RoomSlice from './redux/RoomSlice' 
import SuggestedSlice from './redux/SuggestedSlice' 
import VideoPlayerReducer from './redux/VideoPlayerSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, UserSlice)


export const store = configureStore({
  reducer: {
    user : persistedReducer,
    room: RoomSlice,
    chat: ChatReducer,
    suggested: SuggestedSlice,
    videoPlayer: VideoPlayerReducer, 
  },
}) 

export const persistor = persistStore(store)