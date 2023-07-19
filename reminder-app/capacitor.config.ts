import { CapacitorConfig } from '@capacitor/cli';
import { Preferences } from '@capacitor/preferences';

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
