<template>
    <div class="swiper">
        <my-swiper-com :imgArr="imgArr"></my-swiper-com>
        <div class="explain">
            <div class="massige">
                <span class="massige_title">名称：</span><span class="massige_content">轮播图（swiper）</span>
            </div>
            <div class="massige">
                <span class="massige_title">版本：</span><span class="massige_content">swiper0.1</span>
            </div>
            <div class="massige">
                <span class="massige_title">更新时间：</span><span class="massige_content">{{systemTime}}</span>
            </div>
            <div class="massige">
                <span class="massige_title">功能：</span><span class="massige_content">自动+手动无限循环轮播组件封装</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mySwiperCom from '../../components/mySwiperCom/mySwiperCom.vue'

export default defineComponent({
    name: 'mySwiper',
    components: {
        mySwiperCom
    },
    data () {
        return {
            imgArr: [
                { imgUrl: require('../../assets/image/swiper0.jpg') },
                { imgUrl: require('../../assets/image/swiper1.jpg') },
                { imgUrl: require('../../assets/image/swiper2.jpg') }
            ]
        }
    }
})
</script>

<style scoped lang="less">
.explain {
    height: 100%;
    color: #fff;
    text-align: left;
    margin-top: 0.5rem;
}
.explain .massige {
    height: 0.24rem;
    line-height: 0.24rem;
}
.explain .massige_title {
    font-size: 0.16rem;
    font-weight: 600;
}
.explain .massige_content {
    font-size: 0.16rem;
}
</style>
