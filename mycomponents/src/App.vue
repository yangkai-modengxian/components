<template>
    <router-view />
</template>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: url('./assets/image/1602655822952.jpg') no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;
    font-size: 0.14rem;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
