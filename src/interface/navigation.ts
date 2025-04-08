import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppNavigationStackParamList } from '../navigator/AppNavigation';
import { BottomNavigationStackParamList } from '../navigator/BottomNavigation';
import { CodebarUpdateNavigationStackParamList } from '../navigator/CodebarUpdateNavigation';
import { ProfileNavigationStackParamList } from '../navigator/ProfileNavigation';
import { AuthNavigationStackParamList } from '../navigator/AuthNavigation';

export type MainNavigationProp = NativeStackNavigationProp<
  Partial<AppNavigationStackParamList> & Partial<AuthNavigationStackParamList>
>;

export type AuthNavigationProp = NativeStackNavigationProp<
  AuthNavigationStackParamList
>;

export type AppNavigationProp = NativeStackNavigationProp<
  Partial<AppNavigationStackParamList>
>;
export type ProfileNavigationProp = NativeStackNavigationProp<
  Partial<ProfileNavigationStackParamList>
>;
export type BottomNavigationProp = NativeStackNavigationProp<
  Partial<BottomNavigationStackParamList>
>;

export type CombineNavigationProp = NativeStackNavigationProp<
  Partial<CombinedBottomAndAppNavigationStackParamList>
>;
export type CodebarUpdateNavigationProp = NativeStackNavigationProp<
  Partial<CodebarUpdateNavigationStackParamList>
>;

export type CombinedBottomAndAppNavigationStackParamList =
  AppNavigationStackParamList & BottomNavigationStackParamList;


export type BottomNavigationParams = {
  screen: string;
  params: {
    screen: string;
    params: {
      fromLogIn: boolean;
    };
  };
};