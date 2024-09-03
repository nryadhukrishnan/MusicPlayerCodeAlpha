let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//create a audio Element
let track = document.createElement('audio');

//All songs list
let All_songs = [
    {
        name: "first song",
        path: "music2.mp3",
        img: "pic5.jpg",
        singer: "Justin bieber"
    },
    {
        name: "second song",
        path: "music1.mp3",
        img: "pic2.jpg",
        singer: "Hiphop Tamizha Adhi"

    },
    {
        name: "third song",
        path: "music3.mp3",
        img: "pic3.jpg",
        singer: "Alan walker"

    },
    {
        name: "fourth song",
        path: "music.mp3",
        img: "pic4.jpg",
        singer: "Mamta Sharma and Wajid Ali"

    },
    {
        name: "fifth song",
        path: "music4.mp3",
        img: "pic1.jpg",
        singer: "Keerthana Sabarish"

    }

];

//All function

//function load the track
function load_track(index_no){
    clearInterval(timer);
    track.src = All_songs[index_no].path;
    title.innerHTML = All_songs[index_no].name;
    track_image.src = All_songs[index_no].img;
    artist.innerHTML = All_songs[index_no].singer;
    track.load();

    total.innerHTML = All_songs.length;
    present.innerHTML = index_no + 1;
    timer  = setInterval(range_slider , 1000);
}
load_track(index_no);

//mute sound
function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}


//reset song slider
function reset_slider(){
    slider.value = 0;
}

//checking the song is playing or not
function justplay(){
    if(playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}

//play song
function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML ='<i class="fa fa-pause"></i>';
}

//pause song
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML ='<i class="fa fa-play"></i>';

}

//next song
function next_song(){
    if (index_no < All_songs.length - 1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }

}


//previous song
function previous_song(){
    if (index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = All_songs.length;
        load_track(index_no);
        playsong();
    }

    
}

// change volume
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

//change slider position
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//autoplay fuction
function autoplay_switch(){
    if (autoplay==1){
        autoplay=0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    }else{
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}


function range_slider(){
    let position = 0;

    //update slider position
    if(!isNaN(track.duration)){
        position = track.currentTime * (100/ track.duration);
        slider.value = position;
    }
    //fuction will run when the song is over
if (track.ended){
    play.innerHTML = '<i class="fa fa-play"></i>';
    if (autoplay==1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }
}

}
