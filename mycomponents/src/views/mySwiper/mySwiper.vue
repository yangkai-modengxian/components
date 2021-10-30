<template>
    <div class="swiper">
        <div class="ContinuPlay_box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
            <div class="items_box">
                <div v-for="(item, index) in swiperImgArr" class="slide" :key="index">
                    <img :src="item.imgUrl" alt="">
                </div>
            </div>
            <div class="points_box">
                <div class="points">
                    <div class="each_point" v-for="(item, index) in indexItems" :key="index" :class="{current:item.indexItemStyle}"></div>
                </div>
            </div>
        </div>
        <div class="explain">
            <div class="massige">
                <span class="massige_title">名称：</span><span class="massige_content">轮播图（swiper）</span>
            </div>
            <div class="massige">
                <span class="massige_title">版本：</span><span class="massige_content">swiper0.0.2</span>
            </div>
            <div class="massige">
                <span class="massige_title">更新时间：</span><span class="massige_content">{{systemTime}}</span>
            </div>
            <div class="massige">
                <span class="massige_title">功能：</span><span class="massige_content">自动无限循环轮播</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'mySwiper',
    props: {
        msg: String
    },
    data () {
        return {
            indexItems: [],
            swiperImgArr: [
                { index: 1, imgUrl: require('../../assets/image/swiper0.jpg') },
                { index: 2, imgUrl: require('../../assets/image/swiper1.jpg') },
                { index: 3, imgUrl: require('../../assets/image/swiper2.jpg') },
                { index: 4, imgUrl: require('../../assets/image/swiper3.jpg') }
            ],
            imageIndex: 0,
            indexItemStyle: false,
            systemTime: '',
            flag: true, // 节流阀 防止快速滑动
            playTimer: 0, // 圆点定时器
            imgWidth: 0, // 图片宽度
            bannerwidth: 0, // 轮播图宽度
            StartPoint: 0, // 触摸开始的点的横坐标
            EndPoint: 0, // 触摸结束的点的横坐标
            MoveLength: 0, // StartPoint与EndPoint的差值
            interval: 2000 // 滚动间隔时间
        }
    },
    created () {
        this.indexItems = []
        this.swiperImgArr.forEach(item => {
            const obj = {
                index: item.index,
                indexItemStyle: false
            }
            this.indexItems.push(obj)
        })
    },
    mounted () {
        // const fastPageObj = this.swiperImgArr[0]
        // const lastPageObj = this.swiperImgArr[this.swiperImgArr.length - 1]
        // this.swiperImgArr.unshift(lastPageObj)
        // this.swiperImgArr.push(fastPageObj)
        this.addDate()
        this.startPlay()
    },
    methods: {
        // 当前时间
        addDate () {
            const nowDate = new Date()
            const date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate()
            }
            this.systemTime = date.year + '-' + date.month + '-' + date.date
        },
        // 手指开始触摸事件
        touchstart (event) {
            clearInterval(this.playTimer) // 关闭自动轮播
            this.StartPoint = event.changedTouches[0].pageX // 获取开始触摸位置
        },
        // 手指开始移动
        touchmove (event) {
            this.EndPoint = event.changedTouches[0].pageX
            this.slidings()
        },
        // 结束触摸
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        touchend () {
            this.Jump()
            // 触摸事件完成，继续自动轮播
            clearInterval(this.playTimer) // 防止定时器叠加
            this.startPlay()
        },
        // Jump()方法用于处理滑动到一定程度后松手自动跳转到下一页或上一页
        Jump () {
            const currentimg: any = document.getElementsByClassName('slide')
            // 滑动超过轮播图宽度的百分之40，则跳转下一张，否则不跳转
            if (this.MoveLength > 0 && this.imageIndex !== this.swiperImgArr.length - 1) {
                if (this.MoveLength > this.bannerwidth * 0.4) {
                    this.imageIndex++
                    currentimg[0].style.marginLeft = -this.imageIndex * this.bannerwidth + 'px'
                } else {
                    currentimg[0].style.marginLeft = -this.imageIndex * this.bannerwidth + 'px'
                }
            } else if (this.MoveLength < 0 && this.imageIndex !== 0) {
                if (-this.MoveLength > this.bannerwidth * 0.4) {
                    this.imageIndex--
                    currentimg[0].style.marginLeft = -this.imageIndex * this.bannerwidth + 'px'
                } else {
                    currentimg[0].style.marginLeft = -this.imageIndex * this.bannerwidth + 'px'
                }
            } else if (this.MoveLength < 0 && this.imageIndex === 0) {
                if (-this.MoveLength > this.bannerwidth * 0.4) {
                    this.swiperImgArr.shift()
                    this.imageIndex--
                    currentimg[0].style.marginLeft = -this.imageIndex * this.bannerwidth + 'px'
                } else {
                    currentimg[0].style.marginLeft = -this.imageIndex * this.bannerwidth + 'px'
                }
            }
        },
        // slidings()方法用于处理在滑动过程中，轮播图跟着手指滑动的距离移动
        slidings () {
            // 判断是点击还是滑动
            if (this.StartPoint === this.EndPoint) { return }
            this.MoveLength = this.StartPoint - this.EndPoint
            // 操作DOM，获取轮播图对象标签
            const currentimg: any = document.getElementsByClassName('slide')
            // 获取轮播图的宽度
            this.bannerwidth = currentimg[0].offsetWidth
            // 判断是否超出滑动范围，即第一页无法再往前一页滑动，最后一页无法再往后一页滑动
            console.log(this.MoveLength, this.imageIndex)
            if (this.MoveLength > 0 && this.imageIndex !== this.swiperImgArr.length - 1) {
                currentimg[0].style.marginLeft = -this.MoveLength - this.imageIndex * this.bannerwidth + 'px'
            } else if (this.MoveLength < 0 && this.imageIndex !== 0) {
                currentimg[0].style.marginLeft = -this.MoveLength - this.imageIndex * this.bannerwidth + 'px'
            } else if (this.MoveLength < 0 && this.imageIndex === 0) {
                const lastPageObj = this.swiperImgArr[this.swiperImgArr.length - 1]
                this.swiperImgArr.unshift(lastPageObj)
            }
        },
        getIndexItemStyle () {
            this.indexItems.forEach(item => {
                if (this.imageIndex !== 4 && item.index - 1 === this.imageIndex) {
                    item.indexItemStyle = true
                } else if (this.imageIndex === 4 && item.index === 1) {
                    item.indexItemStyle = true
                } else {
                    item.indexItemStyle = false
                }
            })
        },
        // 开启轮播
        startPlay () {
            const that = this
            const lastIndex = this.swiperImgArr.length
            this.getIndexItemStyle()
            clearInterval(this.playTimer)
            this.playTimer = setInterval(() => {
                const currentimg: any = document.getElementsByClassName('slide')
                that.bannerwidth = currentimg[0].offsetWidth
                that.imageIndex = that.imageIndex + 1
                if (that.imageIndex === lastIndex) {
                    const fastPageObj = that.swiperImgArr[0]
                    that.swiperImgArr.push(fastPageObj)
                    currentimg[0].style.transition = 'all 1s ease'
                } else if (that.imageIndex === lastIndex + 1) {
                    that.imageIndex = 0
                    currentimg[0].style.transition = 'all 0s ease'
                    that.swiperImgArr.pop()
                } else {
                    currentimg[0].style.transition = 'all 1s ease'
                }
                that.getIndexItemStyle()
                currentimg[0].style.marginLeft = -that.imageIndex * that.bannerwidth + 'px'
            }, 3000)
        }
    }
})
</script>

<style scoped lang="less">
.ContinuPlay_box {
    overflow: hidden;
    position: relative;
}
.ContinuPlay_box .items_box {
    display: flex;
}
.ContinuPlay_box .slide {
    flex-shrink: 0;
    width: 100%;
}
.ContinuPlay_box .slide img,
.ContinuPlay_box .slide a {
    width: 100%;
    height: 100%;
}

.points_box {
    display: flex;
    justify-content: center;
}

.points {
    display: flex;
    width: 33%;
    height: 10px;
    position: absolute;
    bottom: 8px;
    justify-content: space-evenly;
}
.points .each_point {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #ccc;
    opacity: 0.7;
}
.points .current {
    background: #ff0031;
}

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
