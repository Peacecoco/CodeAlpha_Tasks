const content = document.querySelector(".content"), 
Playimage = content.querySelector(".music-image img"),
musicName = content.querySelector(".music-titles .name"),
musicArtist = content.querySelector(".music-titles .artist");
const Audio = document.querySelector(".main-song"),
playBtn = content.querySelector(".play-pause"),
playBtnIcon = content.querySelector(".play-pause span"),
repeatBtn = content.querySelector("#repeat"),
prevBtn = content.querySelector("#prev"),
nextBtn = content.querySelector("#next"),
progressBar = content.querySelector(".progress-bar"),
progressDetails = content.querySelector(".progress-details"),
volumeDetails = document.querySelector(".volume-details"),
volumeBar = document.querySelector(".volume-bar"),
playlistBtn = content.querySelector("#playlist"),
playlistBox = document.querySelector(".playlist"),
Shuffle = content.querySelector("#shuffle");


let index = 1;

window.addEventListener("load", ()=> {
    loadData(index);
    // Audio.play();
});

function loadData(indexValue){
    musicName.innerHTML = songs[indexValue - 1].name;
    musicArtist.innerHTML = songs[indexValue - 1].artist;
    Playimage.src  = "Images/"+songs[indexValue - 1].img+".jpg";
    Audio.src = "Music/"+songs[indexValue - 1].audio+".mp3";

}

playBtn.addEventListener("click", ()=> {
    const isMusicPaused = content.classList.contains("paused");
    if(isMusicPaused){
        pauseSong();
    }
    else{
        playSong();
    }
});

function playSong(){
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    Audio.play();
}

function pauseSong(){
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    Audio.pause();
}

nextBtn.addEventListener("click", ()=> {
    nextSong();
});

prevBtn.addEventListener("click", () => {
    prevSong();
});

function nextSong(){
    index++;
    if(index > songs.length){
        index = 1;
    }
    else{
        index = index
    }
    loadData(index);
    playSong();
}

function prevSong(){
    index --;
    if(index <=0){
        index = songs.length;
    }
    else{
        index = index;
    }
    loadData(index);
    playSong();
}


Audio.addEventListener("timeupdate", (e) => {
    const initialTime = e.target.currentTime;
    const finalTime = e.target.duration;
    let BarWidth = (initialTime / finalTime) * 100;
    progressBar.style.width = BarWidth+"%";

    progressDetails.addEventListener("click", (e) => {
        let progressValue = progressDetails.clientWidth;
        let clickedOffsetX = e.offsetX;
        let MusicDuration = Audio.duration;

        Audio.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
    });

    Audio.addEventListener("loadeddata", () => {
        let finalTimeData = content.querySelector(".final");

        let AudioDuration = Audio.duration;
        finalTimeData.innerText =AudioDuration;
        let finalMinutes = Math.floor(AudioDuration / 60);
        let finalSeconds = Math.floor(AudioDuration % 60);

        if(finalSeconds < 10){
            finalSeconds = "0"+finalSeconds;
        }
        finalTimeData.innerText = finalMinutes+":"+finalSeconds;
    });

    let currentTimeData = content.querySelector(".current");
    let CurrentTime = Audio.currentTime;
    let currentMinutes = Math.floor(CurrentTime / 60);
    let currentSeconds = Math.floor(CurrentTime % 60);
    if(currentSeconds < 10){
        currentSeconds = "0"+currentSeconds;
    }
    currentTimeData.innerText = currentMinutes+":"+currentSeconds;

});

// Repeat 
repeatBtn.addEventListener("click", () => {
    Audio.currentTime = 0; // restart current song
    playSong();
});


// Shuffle
Shuffle.addEventListener("click", ()=>{
    var randIndex = Math.floor(Math.random() * songs.length) + 1;
    loadData(randIndex);
    playSong();
});

Audio.addEventListener("ended", ()=>{
    index++;
    if(index > songs.length){
        index = 1;
    }
    loadData(index);
        playSong();
    
});

Audio.volume = 0.6;
volumeBar.style.width = "60%";

volumeDetails.addEventListener("click", (e) => {
    const barWidth = volumeDetails.clientWidth;
    const clickX = e.offsetX;

    let volumePercent = (clickX / barWidth) * 100;

    if (volumePercent < 0) volumePercent = 0;
    if (volumePercent > 100) volumePercent = 100;

    volumeBar.style.width = volumePercent + "%";

    Audio.volume = volumePercent / 100;
});





