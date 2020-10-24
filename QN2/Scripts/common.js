function $(id)
{
    return document.getElementById(id);
}

function $hide(id){
    $(id).style.display = "none";
}

function $show(id){
    $(id).style.display = "inline-block";
}

//The classname to which events have to be bound, for that event, a function should be associated.
function $mapEvent(classname, callbackFn){
    let allElements = document.getElementsByClassName(classname);
    for(let i = 0; i < allElements.length; i++){
        allElements[i].onclick = callbackFn;
    }
}