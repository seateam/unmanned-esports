<template>
  <div class="up-card">
    <slot />
  </div>
</template>

<style lang="scss">
.up-card {
  padding: 0 40px;
  margin-bottom: 40px;
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 28px;
  overflow: hidden;
}
.up-card-title-box {
  padding: 36px 8px 32px;
  text-align: left;
  align-self: flex-start;
  .title {
    position: relative;
    font-size: 24px;
    font-family: Helvetica;
    color: var(--white);
    line-height: 24px;
    letter-spacing: 1px;
    display: flex;

    span {
      color: var(--primary);
    }
    .shadow {
      font-family: Helvetica-Bold, Helvetica;
      text-transform: uppercase;
      font-size: 24px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.06);
      line-height: 24px;
      letter-spacing: 1px;
      position: absolute;
      bottom: 6px;
      left: 40px;
      user-select: none;
      z-index: -1;
    }
  }
}
</style>
