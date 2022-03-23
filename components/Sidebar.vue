
<script lang="ts" setup>
import { useUserStore } from '~/stores/user'


const user = useUserStore()

</script>


<template>
  <aside class="sidebar-application">
    <header class="header">
      <section class="user">
        <strong class="title">{{ user.firstname }} {{ user.lastname }}</strong>
        <strong class="role">{{ user.role }}</strong>
      </section>

      <img class="avatar" :src="user.avatar" alt />
    </header>
  </aside>
</template>

<style lang="scss">
.sidebar-application {
  width: 340px;
  height: 100vh;

  flex: none;
  position: sticky;

  top: 0;
  left: 0;
  background-color: #abdef0;

  > .header {
    width: 100%;
    height: 140px;

    display: flex;
    flex-direction: row-reverse;

    background-color: #0d0e0f;
    // border-right: 1px solid get-color(brand-accent);
  }

  > .header {
    > .avatar {
      width: 140px;
      height: 140px;

      flex-shrink: 0;
      border-radius: 4px;
    }

    > .user {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    > .user > .title {
      color: white;
    }
    > .user > .role {
      margin-bottom: 32px;
      color: white;
      text-shadow: -2px 3px 0 black;
    }
  }

  > .list {
    overflow: hidden;

    margin-top: 12px;
    background-color: white;
  }
}
</style>
