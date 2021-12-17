const socket=io();
var videoGrid=document.querySelector('.video-grid');
var myVideo=document.createElement('video');
myVideo.muted=true;



function Matches(){
    var X=document.getElementsByClassName('select-box');
    switch(X[0].value){
            case "match1":
           document.getElementById('match1').style.display="inline-block";
           document.getElementById('match2').style.display="none";
           document.getElementById('match3').style.display="none";
           document.getElementById('match4').style.display="none";
            break;
            case "match2":
                document.getElementById('match2').style.display="inline-block";
                document.getElementById('match1').style.display="none";
                document.getElementById('match3').style.display="none";
                document.getElementById('match4').style.display="none";

            break;
            case "match3":
                document.getElementById('match3').style.display="inline-block";
                document.getElementById('match1').style.display="none";
                document.getElementById('match2').style.display="none";
                document.getElementById('match4').style.display="none";

            break;
            case "match4":
                document.getElementById('match4').style.display="inline-block";
                document.getElementById('match1').style.display="none";
                document.getElementById('match3').style.display="none";
                document.getElementById('match2').style.display="none";

            break;

    }
}
function Video(){
    var X=document.getElementById('videoon');
    var Y=document.getElementById('videooff');
    if(Y.style.display==="none"){
             Y.style.display="inline-block";
             X.style.display="none";
    }
    else{
        X.style.display="inline-block";
        Y.style.display="none";
    }
}


function Mic(){
    var A=document.getElementById('micon');
    var B=document.getElementById('micoff');
    if(B.style.display==="none"){
             B.style.display="inline-block";
             A.style.display="none";
    }
    else{
        A.style.display="inline-block";
        B.style.display="none";
    }
}