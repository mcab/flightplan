export const sharedMixin = {
  methods: {
    async toast({ message, color, duration, showCloseButton }) {
      const toast = await this.$ionic.toastController.create({
        message,
        color,
        duration,
        showCloseButton
      });
      await toast.present();
    }
  }
};
