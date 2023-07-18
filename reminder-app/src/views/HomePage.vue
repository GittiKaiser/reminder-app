<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Reminder</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>  
      <ion-button expand="block" :disabled="false">Erinnerung hinzufügen</ion-button>
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
  } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonButton }
  });

</script>
