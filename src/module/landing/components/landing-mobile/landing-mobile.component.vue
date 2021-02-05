<template>
  <div class="LandingMobile Container">
    <q-card
      v-for="(user, index) in paginatedUsers.data"
      :key="index"
      :class-name="cardClassName(user.color)"
    >
      <div class="Flex MarginBottom">
        <div class="LandingMobile-image MarginRight">
          <img
            alt="Picture"
            class="BgColor-light"
            height="48"
            loading="lazy"
            :src="user.picture.thumbnail"
            width="48"
          />
        </div>

        <div>
          <p class="MarginBottom-xsmall">
            <strong>{{ fullName(user.name) }}</strong>
          </p>

          <p class="MarginBottom-xsmall">
            {{ user.dob.age }}
            <em>years old</em>
          </p>

          <p>
            <small>
              <code>{{ user.email }}</code>
            </small>
          </p>
        </div>
      </div>

      <p>{{ address(user.location) }}</p>
    </q-card>

    <q-button-to-top></q-button-to-top>
  </div>
</template>

<script lang="ts" src="./landing-mobile.component.ts"></script>
<style lang="scss" scoped src="./landing-mobile.component.scss"></style>
