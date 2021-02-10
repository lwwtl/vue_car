<template>
    <div class="container">
        <div class="top_left">
            <div class="userPanel">
                <div class="icon">
                    <img src="../assets/img/user.png">
                </div>
                <div>
                    <div class="num">{{userNum}}</div>
                    <div class="text">用户数量</div>
                </div>
            </div>
            <div class="storePanel">
                <div class="icon" id="store">
                    <img src="../assets/img/store.png">
                </div>
                <div >
                    <div class="num">{{storeNum}}</div>
                    <div class="text">门店数量</div>
                </div>
            </div>
            <div class="carPanel">
                <div class="icon" id="car">
                    <img src="../assets/img/car.png">
                </div>
                <div>
                    <div class="num">{{carNum}}</div>
                    <div class="text">车辆数量</div>
                </div>
            </div>
            <div class="carCount">
                <div class="count">使用量</div>
                <div class="circle">
                <el-progress type="circle" :percentage="this.carRate" color="orange"></el-progress>
                </div>
            </div>
        </div>
        <div class="top-right">
            <div class="chart" ref="chart" :style="{width: '630px', height: '280px'}"></div>
        </div>
        <div class="bottom-left" >
            <div class="orderChart" ref="orderChart" :style="{width: '1200px', height: '360px'}"></div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Index",
        data(){
            return{
                userNum:'0',
                storeNum:'0',
                carNum:'0',
                rent:'0',
                carRate:1,
                foldXData:[],
                foldYData:[],
                foldList:[],
                lineXData:[],
                lineYData:[],
                LineList:[],
            }
        },
        methods: {
            drawLine(){

                // 基于准备好的dom，初始化echarts实例
                const chart = this.$refs.chart
                let myChart = this.$echarts.init(chart)
                const _this = this
                this.$axios.get("/order/drawLine").then(res => {
                        _this.LineList = res.data.data
                        _this.LineList.forEach((item,i) => {
                            _this.lineXData[i] = _this.LineList[i].name
                            _this.lineYData[i] = _this.LineList[i].total
                        })
                // 绘制图表
                myChart.setOption({
                    color: ['#2fbeb1'],
                    title: {
                        left:'center',
                        text: '车型热度排行实时数据',
                        textStyle:{
                            color:'#9e9e9e',
                            fontSize:28, //字体大小
                        },
                    },

                    tooltip: {

                    },
                    xAxis: {
                        axisTick: {//刻度
                            show:false,
                            alignWithLabel: true
                        },
                        axisLine:{show:false},//主轴线是否显示
                        axisLabel:{
                            show:true,
                            color:'#7b7b98',
                        },
                        data: this.lineXData
                    },
                    yAxis: {
                        splitLine:{show:false},//网格线是否显示
                        axisLine:{show:false},//主轴线是否显示
                        axisLabel:{//轴线字体样式
                            show:true,
                            color:'#8687a3',
                        },
                        axisTick: {//刻度
                            show:false,
                            alignWithLabel: true
                        },
                    },
                    series: [{
                        name: '租赁次数',
                        type: 'bar',
                        barWidth: '70%',
                        data: this.lineYData

                    }]
                });
                })
            },
            drawFold(){
                // 基于准备好的dom，初始化echarts实例
                const chart = this.$refs.orderChart
                let myChart = this.$echarts.init(chart)
                const _this = this
                this.$axios.get("/order/drawFold").then(res => {
                    _this.foldList = res.data.data
                    _this.foldList.forEach((item,i) => {
                        _this.foldXData[i] = _this.foldList[i].days.substr
                        (5,8);
                        _this.foldYData[i] = _this.foldList[i].quantity
                    })

                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        // 自定义悬浮框展示的内容。此json对象的内容可自定义，我只是举个例子。{name: '内容标题'， value：'可以是任意字符，根据业务需求来吧'}
                        formatter(params) {
                            //console.dir可以查看obj的内容
                            return `日期：${params[0].name}
                            成交量：${params[0].value}`
                        }
                    },
                    title: {
                        left:'center',
                        text: '近一个月租赁订单数据',
                        textStyle:{
                            color:'#666',
                            fontSize:28, //字体大小
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data: this.foldXData,
                        axisTick: {//刻度
                            show:false,
                            alignWithLabel: true
                        },
                        axisLine:{show:true},//主轴线是否显示
                        axisLabel:{
                            show:true,
                            color:'#7b7b98',
                        },
                    },
                    yAxis: {
                        type: 'value',
                        splitLine:{show:false},//网格线是否显示
                        axisLine:{show:true},//主轴线是否显示
                        axisLabel:{//轴线字体样式
                            show:true,
                            color:'#8687a3',
                        },
                        axisTick: {//刻度
                            show:false,
                            alignWithLabel: true
                        },
                    },
                    series: [{
                        // data: [820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330],
                        data: this.foldYData,
                        type: 'line',
                        smooth: false, // 是否平滑 也可以设置为 0 到 1 的值，表示平滑程度。
                        symbol: 'circle', //折线点设置为实心点
                        symbolSize: 2, // 折线点的大小,为了方便观察，设置了30
                        itemStyle : {
                            normal: {
                                color: "#083a86", // 设置折线点颜色
                                lineStyle: {
                                    color: '#66b1ff' // 设置折线颜色
                                }
                            }
                        }
                    }]
                });
                })
            },
            useRate(){
                const _this = this
                this.$axios.get("/car/carRate").then(res => {
                    const temp = res.data.data
                    console.log(temp)
                    let t =temp.substr(0,temp.indexOf(","))
                    let r =temp.substr(temp.indexOf(",")+1,temp.length)
                    _this.carNum = t
                    _this.carRate = Math.round(r/t*100)
                })
            },
            storeCount(){
                const _this = this
                this.$axios.get("/store/storeNum").then(res => {
                    _this.storeNum = res.data.data
                })
            },
             userCount(){
                const _this = this
                this.$axios.get("/user/userNum").then(res => {
                    _this.userNum = res.data.data
                })
            },

        },
        mounted(){
            this.useRate()
            this.storeCount()
            this.userCount()
            this.$nextTick(() => {
                this.drawLine();
                this.drawFold();
            });

        },
    }
</script>

<style scoped>
    .container{
        width: 1327px;
        height: 100%;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        margin-left: -55px;
    }
    .top_left{
        height: 300px;
        width: 600px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 50px;
        background:linear-gradient(to right, #1cd1c0 , #ffffffc2);
    }
    .top-right{
        height: 300px;
        width: 640px;
        background:#ffffffc2;
        margin-left: 30px;
    }
    .userPanel{
        height: 50%;
        width: 50%;
        background:linear-gradient(to right, #66b1ff , #ffffffc2);
    }
    .icon{
        width: 110px;
        height: 100%;
        background-color: #66b1ff;
        float: left;
    }
    .count{
        width: 30px;
        height: 100%;
        float: left;
        font-size: 20px;
        text-align: center;
        margin-top: 35px;
        margin-left: 40px;
    }
    #store{
        background-color: #f44336;
    }
    #car{
        background-color: #1cd1c0;
    }
    .icon img{
        margin: 37px 20px;
        width: 70px;
    }
    .num{
        margin-top: 35px;
        margin-left: 190px;
        font-size: 30px;
        font-weight: bold;
    }
    .text{
        margin-top: 25px;
        font-weight: bold;
        text-align: center;
    }
    .storePanel{
        height: 50%;
        width: 50%;
        background:linear-gradient(to right, #f44336 , #ffffffc2);
    }
    .carPanel{
        height: 50%;
        width: 50%;
    }
    .carCount{
        height: 50%;
        width: 50%;
    }
    .circle{
        text-align: center;
        margin-top: 10px;
    }
    .chart{
        margin-top: 20px;
    }
    .bottom-left{
        height: 400px;
        width: 1270px;
        background-color:white;
        margin-top: 30px;
        margin-left: 50px;
    }
    .orderChart{
        margin-top: 20px;
    }
</style>