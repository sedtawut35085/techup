export function formatDate(dateTime) {
    if (dateTime != null && dateTime != undefined) {
        var date = dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()
        var month = (parseInt(dateTime.getMonth()) + 1) < 10 ? "0" + (parseInt(dateTime.getMonth()) + 1) : (parseInt(dateTime.getMonth()) + 1)
        var year = dateTime.getFullYear()
            return date + "-" + month + "-" + year
    } else {
        return dateTime;
    }
}

export function convertToDate(dateTime) {
    if (dateTime != null && dateTime != undefined) {
        var date = (dateTime.split("-"))[0];
        var month = (dateTime.split("-"))[1];
        var year = (dateTime.split("-"))[2];

        return new Date(year + "-" + month + "-" + date);
    } else {
        return dateTime
    }
}

export function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
    } else {
        return true;
    }
}

export function isEmail(input) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))
    {
        return (true)
    }
    return (false)
}