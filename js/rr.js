var process = ["P1","P2","P3","P4","P5","P6"], length = process.length, q =3;
var arrivalTime = [5,4,3,1,2,6];
var burstTime = [5,6,7,9,2,3];
var orderProcess = [], timeProcess = [], resultProcess = [];
 
var min = arrivalTime.reduce((a,b) =>{
  if(a < b) { return a;}
  else { return b;}
});

for(let i = 0; i < length; i++){
  if(arrivalTime[i] == min){
    orderProcess.push(process[i]);
    timeProcess.push(min);
  }
}

let greater_0 = 0;
let arrMinLength = [], minLength = Infinity;
function findMinLength(){
  for(let i = 0; i < length; i++){
    if(arrMinLength[i] != 0 && arrMinLength[i] < minLength){
      minLength = arrMinLength[i];
    }
  }
  return minLength;
}
function sort_process(){
  for(let i = 0; i < length; i++){
    if(timeProcess[timeProcess.length - 2] < arrivalTime[i] && arrivalTime[i] <= timeProcess[timeProcess.length -1] && arrivalTime[i] != min){
      arrMinLength.push(arrivalTime[i]);  ++greater_0;
    }
    else{
      arrMinLength.push(0);
    }
  }

  for(let i = 0; i < greater_0; i++){
    findMinLength();
    for(let j = 0; j < length; j++){
      if(arrivalTime[j] == minLength){
        orderProcess.push(process[j]);
        arrMinLength.splice(j,1,0);
      }
    } 
    minLength = Infinity;
  } 
  greater_0 = 0;
  arrMinLength = [];
}

while(true){
  for(let i = 0; i < length; i++){
    if(process[i] == orderProcess[0]){
      if(burstTime[i] <= q){
        resultProcess.push(orderProcess[0]); 
        timeProcess.push(timeProcess[timeProcess.length-1] + burstTime[i]);  
        for(let j = 0; j < length; j++){
          if(timeProcess[timeProcess.length - 2] < arrivalTime[j] && arrivalTime[j] <= timeProcess[timeProcess.length - 1]){
            sort_process();
            break;
          }
        }
        orderProcess.splice(0,1);
      }
      else{
        burstTime[i] -= q;
        resultProcess.push(orderProcess[0]);
        timeProcess.push(timeProcess[timeProcess.length-1] + q);
        for(let j = 0; j < length; j++){
          if(timeProcess[timeProcess.length - 2] < arrivalTime[j] && arrivalTime[j] <= timeProcess[timeProcess.length - 1]){
            sort_process();
            break;
          }
        }
        orderProcess.push(orderProcess[0]);
        orderProcess.splice(0,1);
      }
    }
  }
  if(orderProcess.length == 0){
    break;
  }else{
    continue;
  }
}


console.log(resultProcess)
// console.log(resultProcess.length)
console.log(timeProcess)
// console.log(timeProcess.length)