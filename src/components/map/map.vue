<template >
  <div class="page" transition="page">
      <header>
        <div class="left" v-link={'name':'index'}></div>
        地图
      </header>
      <div class="mapDiv"  style="margin-bottom:0">


      </div>
  </div>
</template>
<script>
  var geolocation;
  export default {
    data(){
      return {

      }
    },
    ready(){
      setTimeout(()=>{
        this.getLocation()
      },400)
    },
    methods:{
      initService(){

      },
      getLocation(){
        let self = this;
        this.mapObj = new AMap.Map('mapDiv',{
              resizeEnable: true,
              zoom:11,
              center: [116.397428, 39.90923]
        });
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
      }
    }
  }
</script>
