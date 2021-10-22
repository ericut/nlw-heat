import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Button } from '../Button/';
import { COLORS } from '../../theme';

export function SignInBox() {
  return (
    <View style={styles.container}>
      <Button
        icon="github"
        title="ENTRAR COM O GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
      ></Button>
    </View>
  );
}
