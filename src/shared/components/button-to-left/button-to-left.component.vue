<template>
  <q-slide-up-transition>
    <button
      v-if="state.isShowButton"
      class="ButtonToLeft Button Button--dark Button--rounded Button--elevated"
      @click="onClickButton"
    >
      Give me back to the left
    </button>
  </q-slide-up-transition>
</template>

<script lang="ts" src="./button-to-left.component.ts"></script>
<style lang="scss" scoped src="./button-to-left.component.scss"></style>
