const { body } = document
const WIDTH = 992
export default {
    watch: {
        $route(route) {
            if (this.device === 'mobile' && this.sidebar.opened) {
                this.closeSideBar({ withoutAnimation: false })
            }
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.$_resizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resizeHandler)
    },
    mounted() {
        const isMobile = this.$_isMobile()
        if (isMobile) {
            this.toggleDevice('mobile')
            this.closeSideBar({ withoutAnimation: true })
        } else {
            this.toggleDevice('desktop')
        }
    },
    methods: {
        // use $_ for mixins properties
        // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
        $_isMobile() {
            const rect = body.getBoundingClientRect()
            return rect.width - 1 < WIDTH
        },
        $_resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.$_isMobile()
                this.toggleDevice(isMobile ? 'mobile' : 'desktop')
                if (isMobile) {
                    this.closeSideBar({ withoutAnimation: true })
                }
            }
        }
    }
}
