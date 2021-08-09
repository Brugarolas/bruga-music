<template>
  <div class="loader-wrapper">
    <div class="loader">Loading...</div>
  </div>
</template>

<script>
// TODO add transition fade to Spinner instead of a simple v-if
export default {
  name: 'Spinner'
};
</script>

<style lang="less">
.loader-wrapper {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #0001;
  z-index: 4;
}
.loader, .loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  position: absolute;
  margin: 0;
  top: calc(50% - 61px);
  left: calc(50% - 61px);
  font-size: 10px;
  text-indent: -9999em;
  border-top: 1.12em solid lighten(#35495e, 25%);
  border-right: 1.12em solid lighten(#35495e, 25%);
  border-bottom: 1.12em solid lighten(#35495e, 25%);
  border-left: 1.12em solid #35495e;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  overflow: hidden;
  box-shadow: 0px 0px 12px 0px #000, inset 0px 0px 6px #000;
  -webkit-animation: load8 1.25s infinite linear;
  animation: load8 1.25s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
