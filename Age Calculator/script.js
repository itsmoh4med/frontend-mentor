//---------Inputs------------
const birthDay = document.querySelector("#birthDay");
const birthMonth = document.querySelector("#birthMonth");
const birthYear = document.querySelector("#birthYear");
//---------------------------

//---------Errors------------
const labelDay = document.querySelector("#labelDay");
const labelMonth = document.querySelector("#labelMonth");
const labelYear = document.querySelector("#labelYear");
const errorMsgDay = document.querySelector("#errorMsgDay");
const errorMsgMonth = document.querySelector("#errorMsgMonth");
const errorMsgYear = document.querySelector("#errorMsgYear");
//---------------------------

const submit = document.querySelector("#submit");
const resultYears = document.querySelector("#resultYears");
const resultMonths = document.querySelector("#resultMonths");
const resultDays = document.querySelector("#resultDays");

const monthsTab = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

submit.addEventListener("click", ageCalculator);

function ageCalculator() {
    let b_day = birthDay.value;
    let b_month = birthMonth.value;
    let b_year = birthYear.value;

    resetStyle();

    if(!detectErrors(b_day,b_month,b_year)){
        calculate(b_day,b_month,b_year);
    }
    
    function calculate(bd,bm,by){
        let d = new Date();
        let t = d.getDate();
        let m = d.getMonth() + 1;
        let y = d.getFullYear();
        let dd,mm,yyyy;
        if(t < bd){
            m--;
            dd = t - bd + 30;
        }
        else{
            dd = t - bd;
        }
        if(m < bm){
            y--;
            mm = m - bm + 12;
        }
        else{
            mm = m - bm;
        }
        yyyy = y - by;

        resultYears.textContent = yyyy;
        resultMonths.textContent = mm;
        resultDays.textContent = dd;
    }

    function detectErrors (bd,bm,by){
        let day_error = true;
        let day_error_type = 0; // 1 : fieldrequired 2 : valid day
        let month_error = true;
        let month_error_type = 0; // 1 : fieldrequired 2 : valid month
        let year_error = true;
        let year_error_type = 0; // 1 : fieldrequired 2 : valid year 3 : past
        let d = new Date();
        let today = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();

        if((bd.length != 0) && (bm.length != 0) && (by.length != 0)){
            bd = Number(bd);
            bm = Number(bm);
            by = Number(by);
            if(!isNaN(by)){
                if(!isNaN(bm)){
                    if(!isNaN(bd)){
                        if((bd < 1) || (bm < 1) || (by < 1)){
                            if(bd < 1) { 
                                day_error_type = 2;
                                if(by > year){
                                    year_error_type = 3;
                                }
                                else{
                                    year_error = false;
                                }
                                if(bm > 12){
                                    month_error_type = 2;
                                }
                                else{
                                    if((by == year) && (bm > month)){
                                        month_error_type = 2;
                                    }
                                    else{
                                        month_error = false;
                                    }
                                }
                            }
                            if(bm < 1) { 
                                month_error_type = 2;
                                if(bd > 31){
                                    day_error_type = 2;
                                }
                                else{
                                    day_error = false;
                                }
                                if(by > year){
                                    year_error_type = 3;
                                }
                                else{
                                    year_error = false;
                                }
                            }
                            if(by < 1) {
                                if(bm > 12){
                                    month_error_type = 2;
                                }
                                else{
                                    month_error = false;
                                }
                                if(bd > 31){
                                    day_error_type = 2;
                                }
                                else{
                                    if(bd > (monthsTab[bm-1])){
                                        day_error_type = 2;
                                    }
                                    else{
                                        day_error = false;
                                    }
                                }
                                year_error_type = 2; 
                            }
                            if((bd < 1) && (bm < 1)){
                                day_error_type = 2; 
                                month_error_type = 2;
                                if(by > year){
                                    year_error_type = 3;
                                }
                                else{
                                    year_error = false;
                                }
                            }
                            if((bd < 1) && (by < 1)){
                                day_error_type = 2;
                                if(bm > 12){
                                    month_error_type = 2;
                                }
                                else{
                                    month_error = false;
                                }
                                year_error_type = 2;
                            }
                            if((bm < 1) && (by < 1)){
                                if(bd > 31){
                                    day_error_type = 2;
                                }
                                else{
                                    day_error = false;
                                }
                                month_error_type = 2;
                                year_error_type = 2;
                            }
                            if((bd < 1) && (bm < 1) && (by < 1)){
                                day_error_type = 2; 
                                month_error_type = 2;
                                year_error_type = 2;
                            }
                        }
                        else{
                            if(by < year){
                                year_error = false;
                                if(bm < 13){
                                    month_error = false;
                                    if((bd < 32) && (bd <= monthsTab[bm-1])){
                                        day_error = false;
                                    }
                                    else{
                                        day_error_type = 2;
                                    }
                                }
                                else{
                                    month_error_type = 2;
                                    if(bd > 31){
                                        day_error_type = 2;
                                    }
                                    else{
                                        day_error = false;
                                    }
                                }
                            }
                            else if(by == year){
                                year_error = false;
                                if((bm > 12)){
                                    month_error_type = 2;
                                    if(bd > 31){
                                        day_error_type = 2;
                                    }
                                    else{
                                        day_error = false;
                                    }
                                }
                                else if(bm > month){
                                    month_error_type = 2;
                                    if((bd < 32) && (bd <= monthsTab[bm-1])){
                                        day_error = false;
                                    }
                                    else{
                                        day_error_type = 2;
                                    }
                                }
                                else if(bm == month){
                                    month_error = false;
                                    if((bd < 32) && (bd <= today)){
                                        day_error = false;
                                    }
                                    else{
                                        day_error_type = 2;
                                    }
                                }
                                else{
                                    month_error = false;
                                    if((bd < 32) && (bd <= monthsTab[bm-1])){
                                        day_error = false;
                                    }
                                    else{
                                        day_error_type = 2;
                                    }
                                }
                            }
                            else{
                                year_error_type = 3;
                                if((bm > 12)){
                                    month_error_type = 2;
                                    if(bd > 31){
                                        day_error_type = 2;
                                    }
                                    else{
                                        day_error = false;
                                    }
                                }
                                else{
                                    month_error = false;
                                    if((bd < 32) && (bd <= monthsTab[bm-1])){
                                        day_error = false;
                                    }
                                    else{
                                        day_error_type = 2;
                                    }
                                }
                            }
                        }
                    }
                    else{
                        day_error_type = 2;
                        if(by < year){
                            year_error = false;
                            if(bm < 13){
                                month_error = false;
                            }
                            else{
                                month_error_type = 2;
                            }
                        }
                        else if(by == year){
                            year_error = false;
                            if((bm < 13) && (bm < month)){
                                month_error = false;
                            }
                            else{
                                month_error_type = 2;
                            }
                        }
                        else{
                            year_error_type = 3;
                            if(bm < 13){
                                month_error = false;
                            }
                            else{
                                month_error_type = 2;
                            }
                        }
                    }
                }
                else{
                    if(!isNaN(bd)){
                        if(bd > 31){
                            day_error_type = 2;
                        }
                        else{
                            day_error = false;
                        }
                    }
                    else{
                        day_error_type = 2;
                    }
                    month_error_type = 2;
                    if(by <= year){
                        year_error = false;
                    }
                    else{
                        year_error_type = 3;
                    }
                }
            }
            else{
                if(bm < 13){
                    month_error = false;
                }
                else{
                    month_error_type = 2;
                }

                if((bd < 32) && (bd <= monthsTab[bm-1])){
                    day_error = false;
                }
                else{
                    day_error_type = 2;
                }
                year_error_type = 2;
            }
        }
        else{
            if(bd.length == 0){
                day_error_type = 1;
            }
            if(bm.length == 0){
                month_error_type = 1;
            }
            if(by.length == 0){
                year_error_type = 1;
            }
            if(bd.length != 0){
                bd = Number(bd);
                if(!isNaN(bd)){
                    if((bd > 31) || (bd < 1)){
                        day_error_type = 2;
                    }
                    else{
                        day_error = false;
                    }
                }
                else{
                    day_error_type = 2;
                }
            }
            if(bm.length != 0){
                bm = Number(bm);
                if(!isNaN(bm)){
                    if((bm > 12) || (bm < 1)){
                        month_error_type = 2;
                    }
                    else{
                        month_error = false;
                    }
                }
                else{
                    month_error_type = 2;
                }
            }
            if(by.length != 0){
                by = Number(by);
                if(!isNaN(by)){
                    if(by < 1){
                        year_error_type = 2;
                    }
                    else if(by > year){
                        year_error_type = 3;
                    }
                    else{
                        year_error = false;
                    }
                }
                else{
                    year_error_type = 2;
                }
            }
        }

        if(day_error){
            errorStyle(1,day_error_type);
        }
        if(month_error){
            errorStyle(2,month_error_type);
        }
        if(year_error){
            errorStyle(3,year_error_type);
        }

        if(!day_error && !month_error && !year_error){
            return false;
        }
        else{
            return true;
        }
    }

    function resetStyle(){
        labelDay.style.color = "lightgreen";
        birthDay.style.borderColor = "lightgreen";
        errorMsgDay.style.display = "none";
        labelMonth.style.color = "lightgreen";
        birthMonth.style.borderColor = "lightgreen";
        errorMsgMonth.style.display = "none";
        labelYear.style.color = "lightgreen";
        birthYear.style.borderColor = "lightgreen";
        errorMsgYear.style.display = "none";
    }

    function errorStyle(value, msgID){
        switch(value){
            case 1:
                labelDay.style.color = "red";
                birthDay.style.borderColor = "red";
                errorMsgDay.style.display = "block";
                errorMsgDay.style.color = "red";
                if(msgID == 1){ errorMsgDay.textContent = `This field is required`; }
                else { errorMsgDay.textContent = `Must be a valid day`; }
                break;
            case 2:
                labelMonth.style.color = "red";
                birthMonth.style.borderColor = "red";
                errorMsgMonth.style.display = "block";
                errorMsgMonth.style.color = "red";
                if(msgID == 1){ errorMsgMonth.textContent = `This field is required`; }
                else { errorMsgMonth.textContent = `Must be a valid month`; }
                break;
            case 3:
                labelYear.style.color = "red";
                birthYear.style.borderColor = "red";
                errorMsgYear.style.display = "block";
                errorMsgYear.style.color = "red";
                errorMsgYear.textContent = `This field is required`;
                if(msgID == 1){ errorMsgYear.textContent = `This field is required`; }
                else if(msgID == 2) { errorMsgYear.textContent = `Must be a valid year`; }
                else { errorMsgYear.textContent = `Must be in the past`; }
                break;
        }
    }
}