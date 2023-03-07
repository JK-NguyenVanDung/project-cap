export default function uniqueId() {
  // always start with a letter (for DOM friendlyness)
  let idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
  do {
    // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
    const ascicodeChar = Math.floor(Math.random() * 25 + 65);
    idstr += String.fromCharCode(ascicodeChar);
    idstr += Math.floor(Math.random() * 99);
  } while (idstr.length < 8);

  return idstr;
}

export function removeVietnameseTones(str: string) {
  str = str?.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str?.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str?.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str?.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str?.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str?.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str?.replace(/đ/g, 'd');
  str = str?.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str?.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str?.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str?.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str?.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str?.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str?.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str?.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣
  str = str?.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛

  str = str?.replace(/ + /g, ' ');
  str = str?.trim();
  // Remove punctuations
  str = str?.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  return str;
}
export function getYears() {
  var year = new Date().getFullYear();
  var lastyear = new Date().getFullYear() - 1;
  var range = [];
  var lastrange = [];
  var academicYear = [];
  lastrange.push(lastyear);
  range.push(year);
  for (var i = 1; i < 2; i++) {
    lastrange.push(lastyear + i);
    range.push(year + i);
    academicYear.push(
      lastrange[i - 1] + '-' + lastrange[i].toString().slice(-2),
    );
    var fullyear = lastrange.concat(range);
  }
  return academicYear;
}
export function getColor() {
  return (
    'hsl(' +
    360 * Math.random() +
    ',' +
    (25 + 70 * Math.random()) +
    '%,' +
    (85 + 10 * Math.random()) +
    '%)'
  );
}
