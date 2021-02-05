<template>
  <div>
    <div v-if="!state.isDataReady" class="Landing-loading">
      <span>Loading data, please wait...</span>
    </div>

    <div v-else-if="state.didSomethingWrong" class="Landing-error">
      <div class="TextAlign-center">
        <p class="MarginBottom">Something wrong.</p>

        <button
          class="Button Button--primary"
          type="button"
          @click="reloadCurrentPage"
        >
          Reload
        </button>
      </div>
    </div>

    <template v-else>
      <q-top-bar @sorted="handleSort"></q-top-bar>

      <landing-mobile
        v-if="isMobile"
        :paginated-users="state.paginatedUsers"
        @updated="paginateUsers"
      ></landing-mobile>

      <landing-desktop
        v-else
        :paginated-users="state.paginatedUsers"
        @updated="paginateUsers"
      ></landing-desktop>
    </template>
  </div>
</template>

<script lang="ts" src="./landing.component.ts"></script>
<style lang="scss" scoped src="./landing.component.scss"></style>
