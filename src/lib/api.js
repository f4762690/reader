export function syncConfig(key,data){
    try{
      window.localStorage.setItem(key,JSON.stringify(data));
    }catch(e){
      console.log(e);
    }
}


export function configGet(key,callBack){
    try{
      let result = window.localStorage.getItem(key)||'';
      callBack(JSON.parse(result))
    }catch(e){
      console.log(e);
    }
}



