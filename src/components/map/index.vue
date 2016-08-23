<template >
  <div class="scroll-hide">
    <header>
      列表
      <div class="right" @click="showMap">地图</div>
    </header>
    <div class="searchBox">
      <input type="search" class="search" placeholder="搜索关键词" v-model="keyword" @keyup.13="onEnter"/>
      <p class="tips" v-show="slist.length">已为您筛选了最近的<span class="red">10</span>条数据</p>
    </div>
    <div class="map"  id="mapList">
        <ul class="list">
          <template v-for="item in slist">
            <li @click="showDetail(item)">
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
          <div class="gv_loading" v-show="!slist.length && !noresult">
            <div class="ball-clip-rotate"><span></span></div><div class="loading_text">加载中...</div>
          </div>
          <div class="noresult red" v-show="noresult">
              附件没有与相关的内容，换个关键词试试
          </div>
        </ul>
    </div>
    <div class="page" id="mapPage">
        <header>
          <div class="left" @click="hideMap"></div>
          地图
        </header>
        <div id="mapDiv"  style="margin-bottom:0">


        </div>
        <div id="panel"></div>
    </div>
  </div>
    <router-view></router-view>
</template>
<script>
  var geolocation;
  export default {
    data(){
      return {
          placeSearch:null,
          mapObj:null,
          geolocation:null,
          keyword:null,
          coordinates:{lng:null,lat:null},
          noresult:false,
          markers:[],
          walking:null,
          slist:[]
      }
    },
    ready(){
      this.getLocation()
      let self = this;

    },
    methods:{
      initService(){
        console.log(111)
        AMap.service('AMap.PlaceSearch',()=>{//回调函数
             //实例化PlaceSearch
             this.placeSearch= new AMap.PlaceSearch({
                type: '餐饮服务'
             });
             this.searchKeyWord()
         })
      },
      getLocation(){
        let self = this;
        this.mapObj = new AMap.Map('mapDiv');
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
        this.walking = new AMap.Walking({
           map: self.mapObj
        });
      },
      onComplete(data){
        this.coordinates.lng = data.position.getLng();
        this.coordinates.lat = data.position.getLat();
        this.initService();
      },
      onError(){
        console.log('err')
      },
      searchKeyWord(){
        this.slist = [];
        this.noresult = false;
        this.placeSearch.searchNearBy("", [this.coordinates.lng,this.coordinates.lat], 50000, (status, result)=> {
            console.log(result)
            if (status === 'complete' && result.info === 'OK') {
                this.slist = result.poiList.pois;
            }else{
                this.noresult = true;
            }
        });
      },
      onEnter(){
        this.placeSearch= new AMap.PlaceSearch({
           type: this.keyword
        });
        this.searchKeyWord()
      },
      showMap(){
        document.getElementById("mapList").className = "map page-hide";
        document.getElementById("mapPage").className = "page page-enter";
        this.setMarker()
      },
      hideMap(){
        document.getElementById("mapList").className = "map";
        document.getElementById("mapPage").className = "page page-leave";
        this.removeMarker()
      },
      removeMarker(){
        this.mapObj.remove(this.markers);
      },
      setMarker(){
         let list = this.slist;
         this.setDetail(list)
      },
      showDetail(item){
        document.getElementById("mapList").className = "page-hide";
        document.getElementById("mapPage").className = "page page-enter";
        // this.setDetail([item])
        let self = this;
        this.walking.clear()
        this.walking.search([self.coordinates.lng, self.coordinates.lat], [item.location.lng, item.location.lat]);
      },
      setDetail(list){
        for(let i = 0; i < list.length; i += 1){
            let markerOption = {
               map:this.mapObj,
               icon:"http://webapi.amap.com/images/"+(i+1)+".png",
               position:new AMap.LngLat(list[i].location.lng, list[i].location.lat),
               topWhenMouseOver:true

           };
           let mar = new AMap.Marker(markerOption);
           this.markers.push(mar);
        }
       this.mapObj.setCenter(list[0].location);
      }
    }
  }
</script>
