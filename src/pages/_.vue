<template>
  <div class="NotFound">
    <p class="FontSize-2xlarge MarginBottom">Page Not Found</p>

    <nuxt-link
      id="BtnBackToLanding"
      class="Button Button--primary"
      to="/landing"
    >
      Take me away
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "NotFound",

  setup() {
    useMeta({ title: "Page Not Found | Phone Book" });
  },

  head: {},
});
</script>

<style lang="scss" scoped>
.NotFound {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}
</style>
