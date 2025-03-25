import React from 'react';
import {Text, View} from 'react-native';

import {useTheme} from '../../context/ThemeContext';
import {CameraPermissionStyles} from '../../theme/ExtraScreens/CameraPermissionTheme';
import ButtonCustum from '../Ui/ButtonCustum';

interface CameraPermissionInterface {
  requestPermissions: () => Promise<void>;
  message: string;
  availableAuthorization?: boolean;
}
export const CameraPermission = ({
  requestPermissions,
  message,
  availableAuthorization = false,
}: CameraPermissionInterface) => {
  const {theme} = useTheme();

  return (
    <View style={CameraPermissionStyles(theme).CameraPermission}>
      <View style={CameraPermissionStyles(theme).messageContent}>
        <Text style={CameraPermissionStyles(theme).messageText}>{message}</Text>
      </View>

      {availableAuthorization && (
        <ButtonCustum
          title={'Autorizar camara'}
          onPress={requestPermissions}
          disabled={false}
          loading={false}
        />
      )}
    </View>
  );
};
