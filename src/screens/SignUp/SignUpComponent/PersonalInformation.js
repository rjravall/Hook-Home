import { CalenderIcon } from '@/assets';
import TextInputField from '@/components/TextInputField';
import Title from '@/components/Title';
import { TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { strings } from '@/localization';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"
import { subYears } from 'date-fns';
import { COLOR } from '@/theme/theme';

function PersonalInformation(
  {
    firstName,
    setFirstname,
    lastName,
    setLastname,
    preferredName,
    setPreferredName,
    dateOfBirth,
    setDateOfBirth,
    weight,
    setWeight,
    height,
    setHeight,
    isFirstNameNull,
    setIsFirstNameNull,
    isLastNameNull,
    setIsLastNameNull,
    isDateSelected,
    setIsDateSelected,
    isHeightNull,
    setIsHeightNull,
    isWeightNull,
    setIsWeightNull,
    extraStyle, placeholder = '' }
) {

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  function onOpenDatePicker() {
    showDatepicker('date')
  }

  const handleConfirm = (date) => {

    hideDatePicker();
    var currDate = moment(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", true).format("yyyy-MM-DD")
    setDateOfBirth(currDate)
    setIsDateSelected(false);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (formate) => {
    showMode(formate);
  };

  return (
    <View>
      <Title title={strings.personal_information_signup.title} />

      <View style={styles.container}>

        <TextInputField
          text={firstName}
          setText={(text) => { setFirstname(text), setIsFirstNameNull(false) }}
          extraStyle={styles.flex}
          isRequire={<Text style={styles.RequireTick}>*</Text>}
          placeholder={strings.personal_information_signup.first_name}
        />
        <View style={{ width: 20 }} />

        <TextInputField
          text={lastName}
          setText={(text) => { setLastname(text), setIsLastNameNull(false) }}
          extraStyle={styles.flex}
          isRequire={<Text style={styles.RequireTick}>*</Text>}
          placeholder={strings.personal_information_signup.last_name}
        />
      </View>

      <View style={[styles.container, { marginTop: 8, height: 0, }]}>
        {
          isFirstNameNull ?
            <Text style={styles.RequireText}>This field is required </Text>
            : <View style={{ flex: 1 }} />
        }
        <View style={{ width: 20 }} />
        {
          isLastNameNull ?
            <Text style={styles.RequireText}>This field is required </Text>
            : <View style={{ flex: 1 }} />
        }
      </View>
      <TextInputField
        text={preferredName}
        setText={setPreferredName}
        extraStyle={{ marginTop: 10 }}
        placeholder={strings.personal_information_signup.Preferred_name}
      />
      <TextInputField
        text={dateOfBirth}
        setText={setDateOfBirth}
        extraStyle={{ marginTop: 10 }}
        placeholder={strings.personal_information_signup.date_of_birth}
        editable={false}
        isRequire={<Text style={[styles.RequireTick, { top: "35%", }]}>*</Text>}
        right={
          <TextInput.Icon
            icon={CalenderIcon}
            onPress={() => onOpenDatePicker()} />
        }
      />
      {
        isDateSelected &&
        <Text style={{ width: '100%', color: COLOR.PRIMARY, fontSize: 12, }}>This field is required </Text>
      }
      <View style={[styles.height_Weight_container, !isDateSelected && { marginTop: 12 }]}>
        <TextInputField
          text={height}
          setText={(text) => { setHeight(text), setIsHeightNull(false) }}
          keyboardType={"numeric"}
          extraStyle={styles.flex}
          isRequire={<Text style={styles.RequireTick}>*</Text>}
          placeholder={strings.personal_information_signup.height}
        />
        <View style={{ width: 20 }} />
        <TextInputField
          text={weight}
          setText={(text) => { setWeight(text), setIsWeightNull(false) }}
          keyboardType={"numeric"}
          extraStyle={styles.flex}
          isRequire={<Text style={styles.RequireTick}>*</Text>}
          placeholder={strings.personal_information_signup.weight}
        />
      </View>
      <View style={[styles.container, { marginTop: 8, height: 0, }]}>
        {
          isHeightNull ?
            <Text style={styles.RequireText}>This field is required </Text>
            : <View style={{ flex: 1 }} />
        }
        <View style={{ width: 20 }} />
        {
          isWeightNull ?
            <Text style={styles.RequireText}>This field is required </Text>
            : <View style={{ flex: 1 }} />
        }
      </View>

      <DateTimePickerModal
        isVisible={show}
        mode={mode}
        is24Hour={true}
        maximumDate={new Date(subYears(new Date(), 10))}
        minimumDate={new Date(subYears(new Date(), 100))}
        display='inline'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  RequireText: {
    flex: 1,
    color: COLOR.PRIMARY,
    fontSize: 12,
  },
  RequireTick: {
    position: 'absolute',
    color: 'red',
    fontWeight: 'bold',
    right: 0,
    top: "50%",
    textAlignVertical: 'center',
  },
  container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  height_Weight_container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default PersonalInformation;
