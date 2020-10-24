export function getSeconds(time: number): string {
    let seconds = time.toString().split(".");
    let num = Math.ceil(parseInt(seconds[1]) % 60); 
    return (num < 10 ? "0" : "") + num;
}

export function getMinutesToSeconds(time: number): string {
     let num = Math.floor((time * 60) % 60);
     return (num < 10 ? "0" : "") + num; 
}

export function getMinutes(time: number): string {
  let minutes = Math.floor(time % 60);
  return (minutes < 10 ? "0" : "") + minutes;
}

export function getHours(time: number): string {
  let hours = Math.floor(time / 60);
  return hours.toString();
}

export function hoursTimeFormat(time: number): string {
  let currentTime = getHours(time).charAt(0) !== "0" ? 
  `${getHours(time)}:${getMinutes(time)}:${getMinutesToSeconds(time)}` :
   `${getMinutes(time)}:${getMinutesToSeconds(time)}`
  ;
  return currentTime;
} 

export function timeFormat(time: number) {
    var currentHours = Math.floor(time / 3600);
    var currentMinutes = Math.floor(time / 60);
    var currentSeconds = Math.floor(time % 60);
    var hours = (currentHours < 10 ? "0" : "") + currentHours;
    var minutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    var seconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
    
    return currentHours >= 1
      ? `${hours}:${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
}