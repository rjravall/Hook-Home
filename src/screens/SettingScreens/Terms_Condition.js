import ScreenName from '@/components/ScreenName';
import Title from '@/components/Title';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Terms_Condition(props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ paddingTop: 16 }}>
      <ScreenName
        name={strings.tems_condtion_screen.title}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.text_style]}>
          {strings.tems_condtion_screen.welcome_text}
        </Text>

        <Title
          title={strings.tems_condtion_screen.hook_rule}
          touchableStyle={{ marginVertical: 16 }}
        />
        <Text style={[styles.text_style, { marginTop: 0 }]}>
          {strings.tems_condtion_screen.hook_rule_text}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text_style: {
    lineHeight: 20,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.small,
    color: COLOR.BLACK80,
    marginTop: 12,
  },
});

export default Terms_Condition;
