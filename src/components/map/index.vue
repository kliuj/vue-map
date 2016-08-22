<template >
    <header>
      美食
      <div class="right">地图</div>
    </header>
    <div class="searchBox">
      <input type="search" class="search" placeholder="搜索美食"/>
      <p class="tips">已为您筛选了最近的10条数据</p>
    </div>
    <div class="map"  >
        <ul class="list">
          <template v-for="item in slist">
            <li>
              <div class="name">
                  <div class="eight text">
                    {{item.name}}
                  </div>
                  <span class="distance">{{item.distance}}米</span>
              </div>
              <div class="type">
                  <div class="half text">
                    {{item.type}}
                  </div>
                  <span class="distance">{{item.address}}</span>
              </div>
            </li>
          </template>
        </ul>
    </div>
    <div id="container">

    </div>
</template>
<script>
  var geolocation;
  export default {
    data(){
      return {
          placeSearch:null,
          mapObj:null,
          geolocation:null,
          slist:[]
      }
    },
    ready(){
      this.getLocation()
      let self = this;

    },
    methods:{
      initService(lng,lat){
        console.log(111)
        AMap.service('AMap.PlaceSearch',()=>{//回调函数
             //实例化PlaceSearch
             this.placeSearch= new AMap.PlaceSearch({
                type: '餐饮服务'
             });
             this.searchKeyWord(lng,lat)
         })
      },
      getLocation(){
        let self = this;
        this.mapObj = new AMap.Map('container');
        this.mapObj.plugin('AMap.Geolocation', () =>{
            this.geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            this.mapObj.addControl(this.geolocation);
            this.geolocation.getCurrentPosition();
            AMap.event.addListener(this.geolocation, 'complete', this.onComplete);//返回定位信息
            AMap.event.addListener(this.geolocation, 'error', this.onError);      //返回定位出错信息
        });
      },
      onComplete(data){
        console.log(data+'呵呵')
        this.initService(data.position.getLng(),data.position.getLat());
      },
      onError(){
        console.log('err')
      },
      searchKeyWord(lng,lat){
        this.placeSearch.searchNearBy("", [lng,lat], 500, (status, result)=> {
            console.log(result)
            if (status === 'complete' && result.info === 'OK') {
                this.slist = result.poiList.pois;
            }
        });
      }
    }
  }
</script>
