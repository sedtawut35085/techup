import prettyBytes from 'pretty-bytes'
import { 
    FaRegFileArchive, 
    FaRegFileCode, 
    FaRegFileExcel, 
    FaRegFileImage, 
    FaRegFilePdf,
    FaRegFilePowerpoint,
    FaRegFileWord,
    FaRegFile
} from 'react-icons/fa'
import JsZip from 'jszip';
import { saveAs } from 'file-saver';

export function formatDate(dateTime) {
    if (dateTime !== null && dateTime !== undefined) {
        var date = dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()
        var month = (parseInt(dateTime.getMonth()) + 1) < 10 ? "0" + (parseInt(dateTime.getMonth()) + 1) : (parseInt(dateTime.getMonth()) + 1)
        var year = dateTime.getFullYear()
            return date + "-" + month + "-" + year
    } else {
        return dateTime;
    }
}

export function convertToDate(dateTime) {
    if (dateTime !== null && dateTime !== undefined) {
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
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))
    {
        return (true)
    }
    return (false)
}

export function fileSize(fileSize) {
    return prettyBytes(fileSize, {maximumFractionDigits: 2});
}

export function fileType(filename) {
    let array = filename.split('.')
    let type = array[array.length - 1]

    switch (type) {
        case 'pdf':
            return <FaRegFilePdf />
        case 'png':
            return <FaRegFileImage />
        case 'jpg':
            return <FaRegFileImage />
        case 'jpeg':
            return <FaRegFileImage />
        case 'gif':
            return <FaRegFileImage />
        case 'docx':
            return <FaRegFileWord />
        case 'doc':
            return <FaRegFileWord />
        case 'pptx':
            return <FaRegFilePowerpoint />
        case 'ppt':
            return <FaRegFilePowerpoint />
        case 'xlsx':
            return <FaRegFileExcel />
        case 'xls':
            return <FaRegFileExcel />
        case 'zip':
            return <FaRegFileArchive />
        case 'ZIP':
            return <FaRegFileArchive />
        case 'js':
            return <FaRegFileCode />
        case 'html':
            return <FaRegFileCode />
        case 'c':
            return <FaRegFileCode />
        case 'cpp':
            return <FaRegFileCode />
        case 'css':
            return <FaRegFileCode />
        case 'java':
            return <FaRegFileCode />
        default:
            return <FaRegFile />
    }
}

export function download(url, name) {
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

export function downloadAll(files, filename) {
    var zip = new JsZip();
    let count = 0;
    files.map((e) => {
      const blob = e.src;
      zip.file(e.name, blob, {
        binary: true
      });
      ++count;
      if (count == files.length) {
        zip
          .generateAsync({
            type: "blob"
          })
          .then(function (content) {
            saveAs(content, filename + ".zip");
          });
      }
    });
}

export function toggleScrollable(hidden) {
    if(hidden) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = ""
    }
}