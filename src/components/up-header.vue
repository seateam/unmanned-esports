<template>
  <div class="up-header">
    <div class="header-box">
      <div class="brand">
        <img class="logo" src="@/assets/images/logo.svg" alt="logo" />
        <img class="logo-jvs" src="@/assets/images/logo-jvs.svg" alt="logo" />
      </div>
      <nav>
        <up-link
          v-for="tab in tabs"
          :class="{ active: tab.path === route.path }"
          :key="tab.path"
          :to="tab.path"
          >{{ tab.name }}</up-link
        >
      </nav>
      <div v-if="user.avatar" class="avatar-box" @click="user.exit">
        <img class="avatar" :src="user.avatar" alt="avatar" />
      </div>
      <div v-else class="login" @click="user.login">Login</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '@/stores/user'
const tabs = ref([
  {
    path: '/',
    name: 'HOME',
  },
  {
    path: '/price',
    name: 'PRICE',
  },
  {
    path: '/mine',
    name: 'MY JVS',
  },
])
const route = useRoute()
const user = useUser()
</script>

<style lang="scss">
.up-header {
  background: #1e1e1f;
  position: sticky;
  height: 104px;
  top: 0;
  z-index: 100;
  .header-box {
    width: 100%;
    height: 100%;
    max-width: 1160px;
    margin-inline: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .brand {
      display: flex;
      align-items: center;
      .logo {
        width: 48px;
        height: 48px;
      }
      .logo-jvs {
        margin-left: 14px;
        width: 50px;
        height: 22px;
      }
    }
    nav {
      display: flex;
      text-align: center;
      justify-content: space-between;

      a {
        user-select: none;
        width: 200px;
        height: 20px;
        font-size: 16px;
        font-family: Helvetica;
        color: rgba(255, 255, 255, 0.68);
        line-height: 20px;
      }
      a.active {
        font-size: 20px;
        color: var(--white);
      }
      a.active::after {
        content: '';
        width: 32px;
        height: 2px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 1px;
        display: flex;
        margin: 0 auto;
        margin-top: 16px;
      }
      a:hover {
        color: var(--white);
      }
    }
  }
  .login {
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 52px;
    border-radius: 26px;
    border: 2px solid var(--white);
    font-size: 20px;
    font-family: Helvetica;
    color: var(--white);
    line-height: 20px;
  }
  .login:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  .avatar-box {
    cursor: pointer;
    width: 110px;
    display: flex;
    justify-content: center;

    .avatar {
      border-radius: 50%;
      width: 48px;
      height: 48px;
      border: 1px solid var(--white);
    }
  }
}
</style>
