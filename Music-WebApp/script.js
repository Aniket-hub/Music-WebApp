console.log("Welcome to Music App");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongDisplay = document.getElementById('masterSongDisplay');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = document.getElementsByClassName('songItemPlay');
let liItems = document.querySelectorAll('li');

let homeItem = document.getElementById('homeItem');
let aboutItem = document.getElementById('aboutItem');
let aboutSection = document.getElementById('aboutSection');
let contactItem = document.getElementById('contactItem');
let contactSection = document.getElementById('contactSection');

let songs = [
    {songName: "Let me Love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "As long as you Love", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "BoyFriend", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Confident", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Sorry", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Baby", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Ghost", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "I'll Show You", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Intentions", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Stay", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

liItems.forEach(li => {
    li.addEventListener('mouseover', () => {
        li.style.color = '#44c42e';
        li.style.cursor = 'pointer';
        li.style.textDecoration = 'underline';
    })
    li.addEventListener('mouseout', () => {
        li.style.color = 'white';
        li.style.cursor = 'pointer';
        li.style.textDecoration = '';
    })
})

homeItem.addEventListener('click', () => {})
aboutItem.addEventListener('click', () => {
    aboutSection.style.display = 'block';
    contactSection.style.display = 'none';
})
aboutSection.addEventListener('mouseleave', () => {
    aboutSection.style.display = 'none';
})
contactItem.addEventListener('click', () => {
    contactSection.style.display = 'block';
    aboutSection.style.display = 'none';
})
contactSection.addEventListener('mouseleave', () => {
    contactSection.style.display = 'none';
})


songItems.forEach((element, i)=>{
    //console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

//Handling click events
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

//EventListner
audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100); //will fetch how much % the audio progressed 
    //console.log(progress);                                                   //Progress = (CT/Duration)*100
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration) / 100; //(CT = Progress*Duration)/100
})

const makeAllPlays = ()=>{
    Array.from(songItemPlay).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(songItemPlay).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if (audioElement.paused || audioElement.currentTime<=0){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filePath; //...........
            audioElement.type = "audio/mp3";
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            masterSongDisplay.innerText = songs[songIndex].songName;
        }
        else{
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.currentTime = 0;
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
        
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if (songIndex>=9) {
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = songs[songIndex].filePath; //...........
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongDisplay.innerText = songs[songIndex].songName;

})

document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex<=0) {
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = songs[songIndex].filePath; //...........
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongDisplay.innerText = songs[songIndex].songName;

})

