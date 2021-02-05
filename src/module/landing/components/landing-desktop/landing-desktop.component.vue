<template>
  <div class="LandingDesktop Container" @scroll="onHorizontalScroll">
    <div
      v-for="(user, index) in paginatedUsers.data"
      :key="index"
      class="LandingDesktop-column"
    >
      <q-card :class-name="cardClassName(user.color)">
        <div class="LandingDesktop-image TextAlign-center">
          <img
            alt="Picture"
            class="BgColor-light"
            height="48"
            loading="lazy"
            :src="user.picture.thumbnail"
            width="48"
          />
        </div>

        <p>
          <strong>{{ fullName(user.name) }}</strong>
        </p>

        <p>
          {{ user.dob.age }}
          <em>years old</em>
        </p>

        <p>{{ address(user.location) }}</p>
        <p>
          <code>{{ user.email }}</code>
        </p>
      </q-card>
    </div>

    <q-button-to-left selector=".LandingDesktop"></q-button-to-left>
  </div>
</template>

<script lang="ts" src="./landing-desktop.component.ts"></script>
<style lang="scss" scoped src="./landing-desktop.component.scss"></style>
