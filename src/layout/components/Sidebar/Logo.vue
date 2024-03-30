<template>
    <div class="sidebar_logo_container">
        <transition name="sidebarLogoFade">
            <router-link v-if="collapse" key="collapse" class="sidebar_logo_link" to="/">
                <img v-if="img" class="sidebar_logo" :src="img" alt="" />
                <h1 v-else class="sidebar_title">{{ title }}</h1>
            </router-link>
            <router-link v-else key="expand" class="sidebar_logo_link" to="/">
                <img v-if="img" class="sidebar_logo" :src="img" alt="" />
                <h1 class="sidebar_title">{{ title }}</h1>
            </router-link>
        </transition>
    </div>
</template>

<script>
import img from "@/assets/logo.png";
export default {
    props: {
        collapse: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            title: "这是测试名称",
            img: img,
        };
    },
};
</script>

<style lang="scss">
.sidebar_logo_container {
    height: 50px;
    text-align: center;
    line-height: 50px;
    & .sidebar_logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 6px;
    }

    & .sidebar_title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        line-height: 50px;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
    }
}

.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar_logo_link {
    overflow: hidden;
}
</style>
