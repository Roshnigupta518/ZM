import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import LoginReducer from '../reducers/Login';
import NewPostReducer from '../reducers/NewPost';
import NewMediaPost from '../reducers/NewMediaPost';
import DarkthemeReducer from '../reducers/Darktheme';
import SchedulePost from '../reducers/SchedulePost';
import UserMeta from '../reducers/UserMeta';
import IntroSlide from '../reducers/IntroSlide';
import Onboarding from '../reducers/Onboarding';
const persistConfig = {
  key: 'observeNow',
  version: 1,
  storage: AsyncStorage,
};

const authPersistConfig = {
  key: 'Login',
  storage: AsyncStorage,
  whitelist: ['Login'],
};

const darkthemePersistConfig = {
  key: 'Darktheme',
  storage: AsyncStorage,
  whitelist: ['Darktheme'],
};

const IntroSlidePersistConfig = {
  key: 'IntroSlide',
  storage: AsyncStorage,
  whitelist: ['IntroSlide'],
};
const OnboardingPersistConfig = {
  key: 'Onboarding',
  storage: AsyncStorage,
  whitelist: ['Onboarding'],
};

const rootReducer = combineReducers({
  login: persistReducer(authPersistConfig, LoginReducer),
  darktheme: persistReducer(darkthemePersistConfig, DarkthemeReducer),
  IntroSlide : persistReducer(IntroSlidePersistConfig, IntroSlide),
  Onboarding : persistReducer(OnboardingPersistConfig, Onboarding),
  newPost: NewPostReducer,
  NewMediaPost: NewMediaPost,
  SchedulePost: SchedulePost,
  UserMeta: UserMeta,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);
