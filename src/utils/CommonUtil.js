import moment from 'moment'

// 将指定文件生成base64
export const getImgBase64 = async (imgSrc) => {
   let base64 = "";
   let img = new Image();
   img.src = imgSrc;
   let promise = new Promise(resolve => {
      img.onload = () => {
         let canvas = document.createElement("canvas");
         canvas.width = img.width;
         canvas.height = img.height;
         canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
         base64 = canvas.toDataURL("image/png");
         resolve(base64)
      };
   });
   await promise;
   return base64;
};

// 将指定文件下载
export const download = (fileContent, fileName) => {
   // 利用 Buffer 转为对象
   const buf = Buffer.from(fileContent);
   // 再输入到 Blob 生成文件
   let blob = new Blob([buf], {type: 'application/pdf'});
   let a = document.createElement('a');
   // 指定生成的文件名
   a.download = fileName;
   a.href = URL.createObjectURL(blob);
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
};
export const getJsonValue = (original, key) => {
   let ret = '未知';
   for (let i = 0; i < original.length; i++) {
      if (original[i].value === key) {
         ret = original[i].label;
         break;
      }
   }
   return ret;
};

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * @param date 要格式化的日期
 * @param format 指定格式 例：FormatUtil.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S q') ==> 2018-09-19 13:33:17.148 3
 */
export const formatDate = (date, format) => {
   // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   // eslint-disable-next-line no-extend-native
   Date.prototype.Format = function (fmt) { //author: meizz
      let o = {
         "M+": this.getMonth() + 1,                     //月份
         "d+": this.getDate(),                          //日
         "h+": this.getHours(),                         //小时
         "m+": this.getMinutes(),                       //分
         "s+": this.getSeconds(),                       //秒
         "q+": Math.floor((this.getMonth() + 3) / 3),  //季度
         "S": this.getMilliseconds()                    //毫秒
      };
      if (/(y+)/.test(fmt))
         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
         if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
   };

   // string类型时，不能纯数字，并且Date.parse有正常值
   if (typeof date === 'string' && isNaN(date) && !isNaN(Date.parse(date))) {
      return new Date(date).Format(format);
   } else if (date instanceof Date) {
      return date.Format(format);
   } else {
      // 非法日期参数，则返回空
      return '';
   }
};

export const getDateTime = (date) => {
   return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
};

export const getTimestamp = (date) => {
   return formatDate(date, 'yyyy-MM-ddThh:mm:ssZ');
};

export const getDate = (date) => {
   return formatDate(date, 'yyyy-MM-dd');
};

export const getDateFormat = (date) => {
   return formatDate(date, 'yyyyMMdd');
};

export const getYearMonthDate = (t) => {
   return moment(t).format('YYYY-MM-DD')
}
export const getYearMonth = (t) => {
  return moment(t).format('YYYY-MM')
}
export const getYear = (t) => {
   return moment(t).format('YYYY')
}

export const getTime = (t) => {
   console.log()
   return moment(t).format('HH:mm')
}

export const getYearMonthDateMin = (t) => {
   return moment(t).format('YYYY-MM-DD HH:mm')
}
export const formatDateTime = (t) => {
   return moment(t).format('YYYY-MM-DD HH:mm:ss')
}

export const formatTime = (t) => {
   return moment(t, "HH:mm:ss").format('HH:mm')
}

export const number2date = (dateNum) => {
   let dateStr = dateNum + '';
   return dateStr.substring(0,4) + '-' + dateStr.substring(4,6) + '-' + dateStr.substring(6,8);
};

/**
 * 数字格式化。
 * @param number 数字
 * @param decimals 保留小数位数
 * @returns {string} 标准格式 例：FormatUtil.formatNumber(123456.789, 2) ==> 123,456.79
 */
export const formatNumber = (number, decimals) => {
   decimals = typeof decimals === 'undefined' ? 0 : decimals;
   // 保留指定小数点后位数，并分割数组
   let formatNum = 0;
   if (isNumber(number)) {
      formatNum = number;
   } else  if (typeof number === 'string') {
      formatNum = parseInt(number);
      formatNum = isNaN(parseInt(number)) ? 0 : formatNum;
   } else {
      formatNum = 0;
   }
   let x = formatNum.toFixed(decimals).split('.');
   let x1 = x[0];
   let x2 = x.length > 1 ? '.' + x[1] : '';
   let rgx = /(\d+)(\d{3})/;
   while (rgx.test(x1))
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
   return x1 + x2;
};

/**
 * 货币格式化。
 * @param amount 货币
 * @returns {string} 人民币货币格式  例：FormatUtil.formatCurrency(123456.789) ==> CN¥123,456.79
 */
export const formatCurrency = (amount) => {
   return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'CNY',currencyDisplay: "symbol"}).format(amount);
};

function isNumber(val){
   //非负浮点数
   let regPos = /^\d+(\.\d+)?$/;
   //负浮点数
   let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
   return regPos.test(val) || regNeg.test(val);
}

export const isPhone = (phone) => {
   let phoneReg=/^1[3-9]\d{9}$/;
   return phoneReg.test(phone);
};

export const hidePhone = (phone) => {
   if(phone.length>7){
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
   }else{
      return phone
   }
   
}
export function mapToObj(strMap){
   let obj= Object.create(null);
   for (let[key,value] of strMap) {
      obj[key] = value;
   }
   return obj;
}

export function objToMap(obj){
   let strMap = new Map();
   for (let k of Object.keys(obj)) {
      strMap.set(k,obj[k]);
   }
   return strMap;
}


export const getBirthById = (idNum)=>{
   if(idNum.length === 18){
      return idNum.substring(6,14);
   }else{
      return 0;
   }
    
   
}

export const getGenderById = (idNum)=>{
   if(idNum.length === 18){
      return parseInt(idNum.substr(16, 1)) % 2 ;
   }else{
      return 1;
   }
}

export const getAgeByBirth = (birth)=>{
   const duration =moment.duration(moment().diff(new Date(birth)))
   return duration.years()
}

export const getBizApplyStatus = (status) => {
   if(status ==3){
      return "已通过"
   }else if(status==2){
      return "被驳回"
   }else{
      return "待处理"
   }
}

export const getComplaintatus = (status) => {
   if(status ==1){
      return "待处理"
   }else {
      return "已处理"
   }
}


export const getSalaryText = (salaryMin, salaryMax) => {
   if (salaryMax == 0) {
     return '面议';
   } else {
     return salaryMin + 'K - ' + salaryMax + 'K ';
   }
 };