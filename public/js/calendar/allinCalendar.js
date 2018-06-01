var uiBackgroundColor = "#00add8";
var uiBorderColor = "#00add8";
var uiTextColor = "#ffffff";

var uiBackgroundColorTotal = "#b4b4b4";
var uiBorderColorTotal = "#b4b4b4";
var uiTextColorTotal = "#ffffff";

var uiCurrentBackgroundColor = "#00c0ef";
var uiCurrentBorderColor = "#00c0ef";
var uiCurrentTextColor = "#ffffff";   


function cleanJson(json) {
    
    if(json===null){
        return null;
    }
    
    var jsonClean = {
        id: json.id,
        title: json.title,
        commentaire: json.commentaire,
        start: json.start,
        duree: json.duree,
        end: json.end,
        url: json.url,
        backgroundColor: json.backgroundColor,
        defaultBackgroundColor : json.defaultBackgroundColor,
        borderColor: json.borderColor,
        textColor: json.textColor,
        fullDay: json.fullDay,
        typeEvent: json.typeEvent,
        dragSource: json.dragSource,
        client: json.client
    };
    return jsonClean;
}

function sendToServer(val, eventName) {
//    var calendarProxy = zk.Widget.$(jq('$calendar-proxy')[0]);
//    zAu.send(new zk.Event(calendarProxy, eventName, val, {toServer: true}));
}

function refreshCalendar(events) {
    $('#allin-calendar').fullCalendar('removeEvents');
    $('#allin-calendar').fullCalendar('addEventSource', events);
//    $.each(events, function (index, event) {
//        $('#allin-calendar').fullCalendar('renderEvent', event, false);
//    });
}
function updateCalendar(events) {
    var eventsCalendar = $('#allin-calendar').fullCalendar('clientEvents');

    $.each(eventsCalendar, function (index, eventCal) {
        $.each(events, function (index, eventToRrefresh) {
           if(eventCal.id === eventToRrefresh.id) {
               $('#allin-calendar').fullCalendar('removeEvents', eventCal.id);
               eventCal = eventToRrefresh;
               $('#allin-calendar').fullCalendar('renderEvent', eventCal, false);
           }
        });
    });
}

function createEventCal(prestation, type, bgcolor, bordercolor, textcolor) {
    var title = prestation.nomenclatureDetail === null ? "Pas de nomenclature" : prestation.nomenclatureDetail.libelle;
    var date = toDateDay(prestation.calendrier.id);
    
    var eventUI = {
        id: prestation.id,
        title: title,
        commentaire: prestation.commentaire,
        start: date,
        end: date,
        duree: hhmmToMinutes(prestation.duree),
        backgroundColor: bgcolor,                   // background courant (que l'event soit sélectionné ou non)
        defaultBackgroundColor : bgcolor,           // background quand l'event n'est pas sélectionné
        borderColor: bordercolor,
        textColor: textcolor,
        url: '',
        allDay: true,
        typeEvent: type,
        client: prestation.client
    };  

    return eventUI;
}

function createEventCalTotal(currentDate, duree, pointage, type, bgcolor, bordercolor, textcolor) {
    var date = toDateDay(currentDate);
    
    // déterminer la couleur du pointage erh en fonction de l'écart avec les prestations
    var pointageColor = "";
    var pointageHH = 0;
    var pointageMM = 0;
    var pointageMinutes = 0;
    var ecart = 0;
    if (pointage.length > 0 && pointage !== "0h"){
        pointageHH = parseInt(pointage.substring(0,pointage.indexOf('h')));
        pointageMM = parseInt(pointage.substring(pointage.indexOf('h')+1));
        pointageMinutes = (pointageHH * 60) + pointageMM;
        ecart = Math.abs(pointageMinutes - duree);
        if (ecart >= 0 && ecart <= 15){
            pointageColor = "fa fa-circle text-green";
        }
        if (ecart > 15 && ecart <= 30){
            pointageColor = "fa fa-circle text-orange";
        }
        else if (ecart > 30){
            pointageColor = "fa fa-circle text-red";
        }
    }

    // Le fait de mettre un espace au début va permettre de mettre la bulle tout au dessus du jour
    // Le label "Total :" sera ajouté par javascript dans l'UI via le fullcalendar dans allinCalendar.js
    // Le fait de passer par javascript va permettre d'englober Total dans un span et de masquer le span Total 
    // quand la largeur deviendra insuffisante car l'information prioritaire à lire est l'heure et non le label        
    var eventUI = {
        id:moment(currentDate).unix().toString(),
        title: " " + toHHMM(duree),
        start: date,
        end: date,
        duree: duree,
        pointage:pointage,
        pointageColor:pointageColor,
        backgroundColor: bgcolor,
        borderColor: bordercolor,
        textColor: textcolor,
        url: '',
        allDay: true,
        typeEvent: type
    };      

    return eventUI;
}

function formatDate(date) {
    var d = date.getDate();
    var m = date.getMonth();
    m += 1;  // JavaScript months are 0-11
    var y = date.getFullYear();

    return d + '-' + m + '-' + y;
}

/**
 * Dans la DB, les durees des prestations sont encodees dans un entier mais cet entier est au format hhmm !!
 * @param dureePrestation
 * @return 
 */
function hhmmToMinutes(dureePrestation) {
    if(dureePrestation === null) return 0;
    if(dureePrestation >= 100) {
        var heures = parseInt(dureePrestation / 100);
        var minutes = dureePrestation - (heures*100);
        return (heures*60)+minutes;
    } else {
        return dureePrestation;
    }
}

function toYYYMMDD(date) {
    var yyyy = date.getFullYear().toString();
   var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = date.getDate().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
}

//
// ATTENTION : Ces transformations en minutes sont specifiques a l environnement
// Allin ou les minutes sont stockees en DB sous le format hmm (ex:330 pour 3h30)
//

function toHHMM(minutes) {
    //if(minutes < 60) return "0h"+minutes;
    hh = parseInt(minutes / 60);
    mm = minutes -(hh*60);
    var mmFormatted = mm == 0 ? "" : (mm < 10 ? "0"+mm : ""+mm);
    return hh + "h" + mmFormatted;
} 

function toMinutes(hmm){
    hmm = hmm.toString();
    hmm = hmm.replace(":","");
    while(hmm.length < 3){
        hmm = "0"+hmm;
    }
    return hmm;
}

function toDateDay(currentDate) {
    var dateStr = moment(currentDate).format("YYYYMMDD");
    var date = moment(dateStr, "YYYYMMDD");    
    return date;
}


function getDateFromCalendrier(calendrier){
    if(calendrier === null){
        return null;
    }
    return moment(calendrier.id).format("DD/MM/YYYY");
}

function getCalendrierFromDate(date){
    // Ce check est important dans le cas ou un input date n'est pas rempli
    if(typeof date != 'undefined' && date != null && date != '')
        return moment(date, "DD/MM/YYYY");  
    else
        return null;
}

function formatDureeMinute(duree) {
    var heures = parseInt(duree / 60);
    var minutes = duree - heures*60;
    var strMinutes = minutes <= 0 ? '' : (minutes < 10 ? '0' + minutes : minutes);
    return heures + 'h' + strMinutes;
}

function isSameDay(date1, date2) {
    var day1 = moment(date1).format("YYYYMMDD");
    var day2 = moment(date2).format("YYYYMMDD");
    return day1 === day2;
}    


//
//  Fonctions DATE classiques
//

function getDateJJMMYYYY(date){
    if(date===null){
        return null;
    }
    return moment(date).format("DD/MM/YYYY");
};



function minutesToTimePicker(mask, time){
    
    if(time === 0){
        return '';
    }
    
    var heures = parseInt(time / 60);
    var minutes = time - heures*60;   
    
    var nbrH = (mask.match(new RegExp("H", "g")) || []).length;
    
    var strHeures = ""+heures;
    while(strHeures.length<nbrH){
        strHeures = '0'+strHeures;
    }
    
    var strMinutes = minutes <= 0 ? '' : (minutes < 10 ? '0' + minutes : minutes);
    strHeures = heures <= 0 && minutes <= 0 ? '' : strHeures;
    
    if(strHeures > 0 && strMinutes === '') strMinutes = '00';
    
    return strHeures + ':' + strMinutes;
}

function minutesToTimePickerClean(mask, time){
    var sTime = minutesToTimePicker(mask,""+time);
    sTime = sTime.replace(":", "h");
    
    while(sTime.startsWith("0")){
        if(sTime.length>1 && sTime.charAt(1) !== 'h'){
            sTime = sTime.substr(1, sTime.length-1);
        }
        else{
            break;
        }
    }
    
    return sTime;
}

function timePickerToMinutes(time){
    var nbrH = (time.match(new RegExp("H", "g")) || []).length;
    var nbrM = (time.match(new RegExp("H", "g")) || []).length;
    
    if(nbrH>0 || nbrM>0){
        return 0;
    }
    
    var res = time.split(":");
    
    if(res.length !== 2){
        return 0;
    }
    
    return Number(res[0]) * 60 + Number(res[1]);
}

