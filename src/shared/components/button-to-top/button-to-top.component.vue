<template>
  <q-slide-up-transition>
    <button
      v-if="state.isShowButton"
      class="ButtonToTop Button Button--dark Button--rounded Button--elevated"
      @click="onClickButton"
    >
      Take me to fly up
    </button>
  </q-slide-up-transition>
</template>

<script lang="ts" src="./button-to-top.component.ts"></script>
<style lang="scss" scoped src="./button-to-top.component.scss"></style>
