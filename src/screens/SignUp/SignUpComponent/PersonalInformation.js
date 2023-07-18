import { CalenderIcon } from '@/assets';
import TextInputField from '@/components/TextInputField';
import Title from '@/components/Title';
import { TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { strings } from '@/localization';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"

function PersonalInformation({
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
  extraStyle, placeholder = '' }) {

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  function onOpenDatePicker() {
    showDatepicker('date')
  }

  const handleConfirm = (date) => {

    hideDatePicker();
    var currDate = moment(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", true).format("yyyy-MM-DD")
    setDateOfBirth(currDate)
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
          setText={setFirstname}
          extraStyle={styles.flex}
          placeholder={strings.personal_information_signup.first_name}
        />
        <View style={{ width: 20 }} />
        <TextInputField
          text={lastName}
          setText={setLastname}
          extraStyle={styles.flex}
          placeholder={strings.personal_information_signup.last_name}
        />
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
        right={
          <TextInput.Icon
            icon={CalenderIcon}
            onPress={() => onOpenDatePicker()} />
        }
      />
      <View style={styles.height_Weight_container}>
        <TextInputField
          text={weight}
          setText={setWeight}
          keyboardType={"numeric"}
          extraStyle={styles.flex}
          placeholder={strings.personal_information_signup.height}
        />
        <View style={{ width: 20 }} />
        <TextInputField
          text={height}
          setText={setHeight}
          keyboardType={"numeric"}
          extraStyle={styles.flex}
          placeholder={strings.personal_information_signup.weight}
        />
      </View>

      <DateTimePickerModal
        isVisible={show}
        mode={mode}
        is24Hour={true}
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

  container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  height_Weight_container: {
    height: 50,
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default PersonalInformation;
