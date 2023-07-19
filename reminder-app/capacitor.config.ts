import { CapacitorConfig } from '@capacitor/cli';
import { Preferences } from '@capacitor/preferences';
import { DatetimePicker } from '@capawesome-team/capacitor-datetime-picker';

const present = async () => {
  const date = new Date('1995-12-24T02:23:00');

  const result = await DatetimePicker.present({
    cancelButtonText: 'Cancel',
    doneButtonText: 'Ok',
    mode: 'time',
    value: date.toISOString(),
    theme: 'dark',
    locale: 'en-US',
  });

  if (result && typeof result === 'object' && 'value' in result) {
    return result.value;
  }

  return null; // Wenn die Eigenschaft "value" nicht vorhanden ist oder das Ergebnis null ist
};



const setName = async () => {
  await Preferences.set({
    key: 'name',
    value: 'Max',
  });
};

const checkName = async () => {
  const { value } = await Preferences.get({ key: 'name' });

  console.log(`Hello ${value}!`);
};

const removeName = async () => {
  await Preferences.remove({ key: 'name' });
};

const config: CapacitorConfig = {
  plugins: {
    LocalNotificatios: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    }
  },
  appId: 'io.ionic.starter',
  appName: 'reminder-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
