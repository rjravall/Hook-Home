import Divider from '@/components/Divider';
import OptionWithIcon from '@/components/OptionWithIcon';
import ScreenName from '@/components/ScreenName';
import Title from '@/components/Title';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize, isIOS } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

function FAQScreen({ route }) {
  useEffect(() => {
    setTimeout(
      () => {
        route.params.setShowTabBar(false);
      },
      isIOS ? 600 : 0,
    );
    return () => {
      route.params.setShowTabBar(true);
    };
  }, []);

  const styles = StyleSheet.create({
    screenname_container: {
      backgroundColor: 'white',
    },
    faq_items_container: {
      paddingHorizontal: 16,
      backgroundColor: 'white',
      paddingBottom: 16,
    },
    title_type_txt: {
      marginTop: 16,
      fontFamily: fontFamily.Medium,
      fontSize: fontSize.semilarge,
    },
    option_item_txt: {
      fontFamily: fontFamily.Regular,
      fontSize: fontSize.xmedium,
      color: COLOR.GRAY_800,
    },
  });
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight + 4,
        backgroundColor: 'white',
      }}>
      <ScreenName
        name={strings.faq_screen.title}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View>
          <View style={styles.screenname_container}></View>
          <View>
            {FAQData.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.faq_items_container,
                    {
                      marginTop: index == 0 ? 0 : 4,
                      paddingTop: index == 0 ? 16 : 0,
                    },
                  ]}>
                  <Title title={item.title} style={styles.title_type_txt} />

                  {strings.faq_screen.FAQData[index].options.map(
                    (item, inx) => {
                      return (
                        <View key={inx}>
                          <View style={{ paddingVertical: 12 }}>
                            <OptionWithIcon
                              titleStyle={styles.option_item_txt}
                              title={item.name}
                              link={item.link}
                            />
                          </View>
                          <Divider />
                        </View>
                      );
                    },
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default FAQScreen;
