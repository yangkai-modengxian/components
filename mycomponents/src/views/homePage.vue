/* eslint-disable indent */
<template>
    <div class="home_page">
        <div class="content">
            <div @click="toComponents('swiper')"
                 class="my_swiper">
                <p class="single_text_flex"><span>swiper</span></p>
                <p class="single_text_flex"><span>轮播图</span></p>
            </div>
            <div class="my_swiper">
                <p class="single_text_flex"><span>swiper</span></p>
                <p class="single_text_flex"><span>轮播图</span></p>
            </div>
            <div class="my_swiper">
                <p class="single_text_flex"><span>swiper</span></p>
                <p class="single_text_flex"><span>轮播图</span></p>
            </div>
            <div class="my_swiper">
                <p class="single_text_flex"><span>swiper</span></p>
                <p class="single_text_flex"><span>轮播图</span></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'homePage',
    components: {},
    methods: {
        toComponents (val) {
            if (val === 'swiper') {
                this.$router.replace('/mySwiper')
            }
        }
    }
})
</script>
<style scoped>
@import '../style/style.less';
.home_page {
    padding: 0.15rem;
}
.content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.my_swiper {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.2rem;
    margin: 0.1rem;
    background-color: #e1f1f1;
}
.my_swiper p:first-child {
    height: 75%;
    background: url('../assets/image/swiper.jpg') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 0.3rem;
    font-weight: 600;
}
.my_swiper p:last-child {
    font-family: STXingkai;
    font-size: 0.25rem;
    font-weight: 600;
    height: 25%;
    align-items: center;
}
</style>
