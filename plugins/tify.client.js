import "tify";
import "tify/dist/tify.css";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      Tify,
    },
  };
});
