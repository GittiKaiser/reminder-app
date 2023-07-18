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
  alertController
} from "@ionic/vue";
import { defineComponent, ref } from "vue";

// Mock data for testing
const reminders = ref([
  {
    text: "Erinnerung 1",
    date: "2023-07-19",
    time: "09:00"
  },
  {
    text: "Erinnerung 2",
    date: "2023-07-20",
    time: "14:30"
  }
]);

const addReminder = async() => {
  const alert = await alertController.create({
    header: 'Erinnerung hinzufügen',
    inputs: [
      {
        name: 'text',
        type: 'text',
        placeholder: 'Text',
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
        handler: (data) => {
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
        }
      }
    ]
  });

  await alert.present();
};

const editReminder = async (reminder) => {
  const alert = await alertController.create({
    header: 'Erinnerung bearbeiten',
    inputs: [
      {
        name: 'text',
        type: 'text',
        value: reminder.text,
        placeholder: 'Text',
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
        handler: (data) => {
          const { text, date, time } = data;

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
        }
      }
    ]
  });

  await alert.present();
};

const deleteReminder = async (reminder) => {
  const alert = await alertController.create({
    header: 'Löschen bestätigen',
    message: `Möchten Sie die Erinnerung "${reminder.text}" wirklich löschen?`,
    buttons: [
      {
        text: 'Abbrechen',
        role: 'cancel'
      },
      {
        text: 'Löschen',
        handler: () => {
          // Code to delete the reminder and cancel any scheduled notification
          reminders.value = reminders.value.filter((r) => r !== reminder);
        }
      }
    ]
  });

  await alert.present();
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
</script>
