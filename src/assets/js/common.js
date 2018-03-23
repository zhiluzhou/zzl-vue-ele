function getPath(path) {
  let str;
  if(path){
    if (path.substring(path.length - 4) == 'jpeg') {
      str = 'jpeg'
    } else if (path.substring(path.length - 3) == 'png') {
      str = 'png'
    } else {
      str = 'jpg'
    }
    let imgPath = '//fuss10.elemecdn.com/' + path[0] + '/' + path[1] + path[2] + '/' + path.split('').splice(3).toString().replace(/,/g, '') + '.' + str;
    return imgPath;
  }
}
export default  {
  getPath,
}


