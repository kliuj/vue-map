/*封装localStorage*/
export default class Store {
  constructor() {

  }
  //存储信息
  setStore(name,value){
      localStorage.setItem(name,JSON.stringify(value))
  }
  //删除信息
  delStore(name){
      localStorage.removeItem(name)
  }
  //获取信息
  getStore(name){
      return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : ''
  }
  //批量获取信息
  getAllStore(nameList){
      let result = [],
          self = this;
      nameList.forEach(function(value){
        result.push(self.getStore(value))
      })
  }
  //批量删除信息
  delAllStore(nameList){
    nameList.forEach(function(value){
      result.push(self.delStore(value))
    })
  }
  //clear所有信息
  clearStore(){
      localStorage.clear()
  }
  // 自动存储浏览记录
  saveFrom(name,transit) {
    	var qhfrom = transit.to.query.qhfrom ;//默认全部返回首页
      var para = transit.to.query.para ? JSON.parse(transit.to.query.para) : '';
      if(!qhfrom) return false;
    	var paths  = localStorage.getItem("FromUrlStore") ? JSON.parse(localStorage.getItem("FromUrlStore")) : {};
      if (localStorage) {
      	paths[name] = {
          'name':qhfrom,
          'para':para
        }
      	localStorage.setItem("FromUrlStore", JSON.stringify(paths));

      }
  }

    // 返回localstorage存储的对应目录记录
  getBack(name) {
    	var paths = {};
      if (localStorage) {
          paths = localStorage.getItem("FromUrlStore") ? JSON.parse(localStorage.getItem("FromUrlStore")) :'';
          if(paths && paths[name]){
          	return paths[name];
          }else{
          	return ''
          }
      }
  }
}
