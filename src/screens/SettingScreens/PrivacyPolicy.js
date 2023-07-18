import ScreenName from '@/components/ScreenName';
import Title from '@/components/Title';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function PrivacyPolicy(props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ paddingTop: 16 }}>
      <ScreenName
        name={strings.privacy_policy_screen.title}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={{ paddingHorizontal: 16, marginBottom: 64 }}>
        <Text style={[styles.text_style, { marginTop: 32 }]}>
          {strings.privacy_policy_screen.welcome_text}
          <Text
            style={[styles.text_style, { color: COLOR.PRIMARY }]}
            onPress={() => Linking.openURL('https://google.com')}>
            {strings.privacy_policy_screen.highlight_text}
          </Text>
        </Text>
        <Text style={styles.text_style}>
          {strings.privacy_policy_screen.whilst_text}
        </Text>

        <Title
          title={strings.privacy_policy_screen.filter}
          touchableStyle={{ marginVertical: 16 }}
        />
        <Text style={styles.text_style}>
          {strings.privacy_policy_screen.filter_data}
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
export default PrivacyPolicy;
