import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from "vuetify/lib/util/colors";

import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

const customTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: colors.blue.base,
    error: colors.red.base,
    // 'on-surface': basicTypographyColor,
    // 'on-background': basicTypographyColor,
    // 後は必要に応じて
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "customTheme",
      themes: {
        customTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
       aliases,
       sets: {
           mdi,
       },
    }
  });

  nuxtApp.vueApp.use(vuetify);
});
