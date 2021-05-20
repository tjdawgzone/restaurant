import { sort } from 'fast-sort';


function sortResults (results,type){
    const clean = ((array,type)=>{
      let additional = [];
      if(type==="rating"){
        let i = 0;
        for(i=0;i<array.length;i++){
          if(array[i].rating===null){
            additional.push(array[i]);
            array.splice(i,1);
          }
        }
      }
      else if(type==="price"){
        let i = 0;
        for(i=0;i<array.length;i++){
          if(array[i].price_level===null){
            additional.push(array[i]);
            array.splice(i,1);
          }
        }
      }
      else{
        let i = 0;
        for(i=0;i<array.length;i++){
          if(array[i].name===null){
            additional.push(array[i]);
            array.splice(i,1);
          }
        }
      }
      return additional;
    })

    if(type==="rating1"){
      let additional = clean(results,"rating");
      const sortedArray = sort(results).desc(r => r.rating);
      const finalArray = sortedArray.concat(additional);
      return finalArray;
    }
    else if(type==="rating2"){
      let additional = clean(results,"rating");
      const sortedArray = sort(results).asc(r => r.rating);
      const finalArray = sortedArray.concat(additional);
      return finalArray;
    }
    else if(type==="price1"){
      let additional = clean(results,"price");
      const sortedArray = sort(results).desc(r => r.price_level);
      const finalArray = sortedArray.concat(additional);
      return finalArray;
    }
    else if(type==="price2"){
      let additional = clean(results,"price");
      const sortedArray = sort(results).asc(r => r.price_level);
      const finalArray = sortedArray.concat(additional);
      return finalArray;
    }
    else if(type==="name1"){
      let additional = clean(results,"name");
      const sortedArray = sort(results).asc(r => r.name);
      const finalArray = sortedArray.concat(additional);
      return finalArray;
    }
    else{
      let additional = clean(results,"name");
      const sortedArray = sort(results).desc(r => r.name);
      const finalArray = sortedArray.concat(additional);
      return finalArray;
    }
}

export default sortResults;