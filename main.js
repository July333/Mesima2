//variables
var template;
var arr = [];
var myMain = document.getElementById('myMain');
var gen = document.getElementById('gen');
var helpEl;
//events
gen.addEventListener('click', function () {
    RandomUser();
});

///StartPrograms
//template
function templateUser() {
        $.ajax({
            method: "GET",
            url: "user.html",
            dataType: "html",
            success: function (t) {
                template = t;
            },
            error: function (jqXHR, textStatus) {
                alert("Request faied: " + textStatus);
            }
        });
}
templateUser();

///
function changeTemplate(o) {
    let temp=template;
    temp = temp.replace('{{img}}', o.picture.large);
    temp = temp.replace('{{gender}}', o.gender);
    temp = temp.replace('{{name}}', o.name.first);
    temp = temp.replace('{{age}}', o.dob.age);
    temp = temp.replace('{{mail}}', o.email);
    if ($('#myMain > *').length > 0) {
        $('#myMain section:last-child').after(temp);
    }
    else {
        myMain.innerHTML += temp;
    }
    myMain.lastChild.dataset.cell = o.cell;//because there is a broblem with id
    $("#myMain section:last-child .del").click(function () {
        let p = $(this).parent();
        delFunc(p[0]);
    });
    $("#myMain section:last-child .edit").click(function () {
        let p = $(this).parent();
        helpEl=p[0];
    });
}
//Load
$(document).ready(myLoad);
function myLoad() {
    arr = JSON.parse(window.localStorage.getItem("myBase"));
    let item;
    if (arr) {
        for (let i = 0; i < arr.length; i++) {
            item = arr[i];
            changeTemplate(item);
        }
    }
    else {
        arr = [];
        Random10Users();
    }
}
//Random
function RandomUser() {
    $.ajax({
        method: "GET",
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function (obj) {
            changeTemplate(obj.results[0]);
            arr.push(obj.results[0]);
            window.localStorage.setItem("myBase", JSON.stringify(arr));
        },
        error: "Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you."
    });
}

function Random10Users() {
    $.ajax({
        method: "GET",
        url: 'https://randomuser.me/api/?results=10',
        dataType: 'json',
        success: function (obj) {
            for (i = 0; i < 10; i++) {
                changeTemplate( obj.results[i]);
                arr.push(obj.results[i]);
                window.localStorage.setItem("myBase", JSON.stringify(arr));
            }
        },
        error: "Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you."
    });
}

///Support functions
function delFunc(e) {
    arr = JSON.parse(window.localStorage.getItem("myBase"));
    let temp = arr.filter(function (ele) {
        return ele.cell != e.dataset.cell;
    });
    $('#myMain section[data-cell="'+e.dataset.cell+'"]').remove();
    arr = temp;
    window.localStorage.setItem("myBase", JSON.stringify(arr));
}

//Modal
function saveCh() {
    arr = JSON.parse(window.localStorage.getItem("myBase"));
    console.log(arr);
    debugger;
    console.log(helpEl);
    let temp = $("#modalN").val();
    console.log($("#modalN").val());
    debugger;
    let temp2 = $("#modalEm").val();
    console.log($("#modalEm").val());
    debugger;
    let target='#myMain section[data-cell="'+helpEl.dataset.cell+'"] ';
    $(target + 'p .name').text(temp);
    $(target + 'p .mail').text(temp2);
    debugger;
    let tt=$(target);
    console.log(tt);
    console.log(tt[0]);
    for(let i=0;i<arr.length;i++){
        debugger;
        if(arr[i].cell==helpEl.dataset.cell){
            arr[i].name.first=temp;
            arr[i].email=temp2;
            console.log(arr[i]);
            break;
        }
    }
    debugger;
    helpEl=null;
    window.localStorage.setItem("myBase", JSON.stringify(arr));
    $("#myModal").modal("hide");
}