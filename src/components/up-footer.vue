<template>
  <div class="up-footer">
    <div class="box footer">
      <div class="info">
        <div class="brand">
          <img class="logo" src="@/assets/images/logo.svg" alt="logo" />
          <img class="logo-jvs" src="@/assets/images/logo-jvs.svg" alt="logo" />
        </div>
      </div>
      <div class="icons">
        <img
          class="icon"
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          alt="icon"
        />
        <img
          class="icon"
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          alt="icon"
        />
        <img
          class="icon"
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          alt="icon"
        />
      </div>
    </div>
    <div class="box reserved">@2022 JVS. All rights reserved</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.up-footer {
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  height: 260px;

  .box {
    margin: 0 auto;
    max-width: 1200px;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px 0;
    .info {
      .brand {
        display: flex;
        align-items: center;

        .logo {
          width: 80px;
          height: 80px;
        }
        .logo-jvs {
          margin-left: 26px;
          width: 85px;
          height: 37px;
        }
      }
    }
    .icons {
      .icon {
        margin-left: 40px;
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
    }
  }
  .reserved {
    font-size: 20px;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.8);
    line-height: 20px;
    letter-spacing: 1px;
  }
}
</style>
