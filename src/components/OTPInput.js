import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';

import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: { padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },

  cell: {
    width: 50,
    height: 36,
    lineHeight: 40,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.SemiBold,
    color: COLOR.BLACK90,
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default function OTPInpute({ value, setValue, cellCount }) {
  const CELL_COUNT = cellCount;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="*"
          isLastFilledCell={isLastFilledCell({ index, value })}>
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <View style={{ justifyContent: 'center' }} key={index}>
        <Text
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          {textChild}
        </Text>
        <View
          style={{
            borderBottomWidth: 2,
            borderRadius: 12,
            justifyContent: 'space-between',
            borderColor: COLOR.GRAY_500,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
    </SafeAreaView>
  );
}
