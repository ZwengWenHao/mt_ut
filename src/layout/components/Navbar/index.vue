<template>
    <div class="navbar">
        <Hamburger class="navbar_hamburger" :isActive="sidebar.opened" @toggleSideBar="toggleSideBar" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Hamburger from './components/Hamburger.vue'
export default {
    name: "",
    components: {
        Hamburger
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['sidebar'])
    },
    methods: {
        ...mapActions({
            toggleSideBar: 'app/toggleSideBar'
        }),
    }
}
</script>

<style lang="scss">
.navbar {
    height: 50px;

    &_hamburger {
        height: 100%;
        line-height: 50px;
    }
}
</style>
