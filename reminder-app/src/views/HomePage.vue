<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Erinnerungen-App</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item v-for="(reminder, index) in reminders" :key="index">
          <ion-label>{{ reminder.text }}</ion-label>
          <ion-label>{{ reminder.date }}</ion-label>
          <ion-label>{{ reminder.time }}</ion-label>
          <ion-button @click="editReminder(reminder)">Bearbeiten</ion-button>
          <ion-button @click="deleteReminder(reminder)">Löschen</ion-button>
        </ion-item>
      </ion-list>

      <ion-button expand="block" @click="addReminder">Erinnerung hinzufügen</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  alertController,
  IonAlert
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { Preferences } from '@capacitor/preferences';
//import { CapacitorConfig } from '@capacitor/cli';

// Mock data for testing
const reminders = ref([]);

const loadReminders = async () => {
  const remindersData = await Preferences.get({ key: 'reminders' });
  if (remindersData?.value) {
    reminders.value = JSON.parse(remindersData.value);
  }
};

const saveReminders = async () => {
  await Preferences.set({ key: 'reminders', value: JSON.stringify(reminders.value) });
};

const addReminder = async() => {
  const inputDialog = await alertController.create({
    header: 'Erinnerung hinzufügen',
    inputs: [
      {
        name: 'titel',
        type: 'text',
        placeholder: 'Titel',
        },
      {
        name: 'date',
        type: 'date',
        placeholder: 'Datum',
      },
      {
        name: 'time',
        type: 'time',
        placeholder: 'Uhrzeit',
      },
    ],
    buttons: [
      {
        text: 'Abbrechen',
        role: 'cancel'
      },
      {
        text: 'Hinzufügen',
        handler: async (data) => {
          const { text, date, time } = data;

            const reminder = {
                text,
                date,
                time,
            };

            reminders.value.push(reminder);

          // Check if both date and time are provided to schedule a local notification
          if (date && time) {
            const dateTime = new Date(`${date}T${time}`);
            // Code to schedule a local notification using the dateTime value
            // This will depend on the specific plugin/library you are using for local notifications
          }
          // Speichern der Änderungen im Local Storage
          await saveReminders();
        }
      }
    ]
  });

  await inputDialog.present();
};

const editReminder = async (reminder) => {
  const editDialog = await alertController.create({
    header: 'Erinnerung bearbeiten',
    inputs: [
      {
        name: 'titel',
        type: 'text',
        value: reminder.text,
        placeholder: 'Titel',
      },
      {
        name: 'date',
        type: 'date',
        value: reminder.date,
        placeholder: 'Datum',
      },
      {
        name: 'time',
        type: 'time',
        value: reminder.time,
        placeholder: 'Uhrzeit',
      },
    ],
    buttons: [
      {
        text: 'Abbrechen',
        role: 'cancel'
      },
      {
        text: 'Speichern',
        handler: async (data) => {
          const { text, date, time } = data;

            if (!text) {
                // Falls das Feld "text" nicht gefüllt ist, eine Meldung ausgeben und den Eingabe-Dialog erneut anzeigen
                alert("Das Feld 'Titel' ist ein Pflichtfeld!");
                // Rücksprung auf editReminder
                editReminder(reminder);
                return;
            }
          // Update the reminder properties
          reminder.text = text;
          reminder.date = date;
          reminder.time = time;

          // Check if both date and time are provided to update the local notification
          if (date && time) {
            const dateTime = new Date(`${date}T${time}`);
            // Code to update the scheduled local notification using the dateTime value
            // This will depend on the specific plugin/library you are using for local notifications
          }
          await saveReminders();
        }
      }
    ]
  });

  await editDialog.present();
};

const deleteReminder = async (reminder) => {
  const deleteDialog = await alertController.create({
    header: 'Löschen bestätigen',
    message: `Möchten Sie die Erinnerung "${reminder.text}" wirklich löschen?`,
    buttons: [
      {
        text: 'Abbrechen',
        role: 'cancel'
      },
      {
        text: 'Löschen',
        handler: async () => {
          // Code zum Löschen eines Reminders aus dem Array
          reminders.value = reminders.value.filter((r) => r !== reminder);
          // Code zum Löschen der geplanten Benachrichtigung
          //try {
          //  await LocalNotifications.cancel({
          //    notifications: [{ id: reminder.id }]
          //  });
          //  console.log('Benachrichtigung gelöscht');
          //} catch (error) {
          //  console.error('Fehler beim Löschen der Benachrichtigung:', error);
          //}
          // Speichern der Änderungen im Local Storage
          await saveReminders();
        }
      }
    ]
  });

  await deleteDialog.present();
};

defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
  },
  setup() {
    return {
      reminders,
      addReminder,
      editReminder,
      deleteReminder,
    };
  },
});

// Beim Laden der Seite die Reminder-Daten aus dem Local Storage abrufen
loadReminders();

</script>

