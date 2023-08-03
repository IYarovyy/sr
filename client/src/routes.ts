import Auth from '@pages/Auth';
import SoundCheck from '@pages/SoundCheck';
import { FC } from "react";


export const paths = {
  main: '/',
  auth: '/auth',
  soundcheck: '/soundcheck'
};

export const routes: RouteData[] = [
  {
    path: paths.auth,
    component: Auth,
    isPrivate: false
  },
  {
    path: paths.soundcheck,
    component: SoundCheck,
    isPrivate: true
  }
]

export interface RouteData{
  path: string;
  component: FC,
  isPrivate: boolean
}