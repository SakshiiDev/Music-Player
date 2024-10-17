const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
const playlist = document.getElementById('playlist');
const songs = playlist.querySelectorAll('li');

let songIndex = 0;
const songList = [
    { title: 'Song 1', artist: 'Amitabh Bhattacharya, Sachin-Jigar, Madhubanti Bagchi, Divya Kumar', src: 'audio/song1.mp3', cover: 'img/cover1.jpg' },
    { title: 'Song 2', artist: 'Akhil Sachdeva', src: 'audio/song2.mp3', cover: 'img/cover2.jpg' },
    { title: 'Song 3', artist: 'Anuv Jain', src: 'audio/song3.mp3', cover: 'img/cover3.jpg' },
    { title: 'Song 4', artist: 'Anuv Jain', src: 'audio/song4.mp3', cover: 'img/cover4.webp' },
    { title: 'Song 5', artist: 'Badshah, Payal Dev', src: 'audio/song5.mp3', cover: 'img/cover5.jpg' },
    { title: 'Song 6', artist: 'Karan Aujla', src: 'audio/song6.mp3', cover: 'img/cover6.jpg' },
    { title: 'Song 7', artist: ' Michael David Rosenberg', src: 'audio/song7.mp3', cover: 'img/cover7.jpg' },
    { title: 'Song 8', artist: 'Aditya Narayan', src: 'audio/song8.mp3', cover: 'img/cover8.jpg' },
    { title: 'Song 9', artist: 'Juss', src: 'audio/song9.mp3', cover: 'img/cover9.jpg' },
    { title: 'Song 10', artist: 'Siddhant Bhosle', src: 'audio/song10.mp3', cover: 'img/cover10.jpg' },
];


function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

function playSong() {
    audio.play();
    playBtn.innerText = '⏸️';
}

function pauseSong() {
    audio.pause();
    playBtn.innerText = '▶️';
}

function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function updateProgress() {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeElem.innerText = formatTime(audio.currentTime);
    durationElem.innerText = formatTime(audio.duration);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

function changeVolume() {
    audio.volume = volume.value;
}

function selectSong(index) {
    songIndex = index;
    loadSong(songList[songIndex]);
    playSong();
}

songs.forEach((song, index) => {
    song.addEventListener('click', () => selectSong(index));
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songList.length) % songList.length;
    selectSong(songIndex);
});
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songList.length;
    selectSong(songIndex);
});
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);
volume.addEventListener('input', changeVolume);

// Load the first song initially
loadSong(songList[songIndex]);
