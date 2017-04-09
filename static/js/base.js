/**
 * Created by 98259 on 2017/4/4 0004.
 */
var baseURL = "http://wangjingxin.top:8080/bishe/common";
function toRequest(myurl,method,data) {
    var myheader = new Headers();
    myheader.append('Content-Type', 'application/x-www-form-urlencoded');
    myheader.append('Accept', 'application/json');
    return fetch(myurl,{
        method:method,
        headers:myheader,
        model:'no-cors',
        body:data
    });
}

/*
* 获取表单里面的内容
* */
function getContent(formId,flag) {
    var element = new Array();
    var element2 = "";
    var form = $("#"+formId).serializeArray();
    $.each(
        form,function () {
            //数组
            element[this.name] = this.value;
            //字符串
            element2 += this.name+"="+this.value+"&";
        }
    );
    if(flag){
        return element;
    }else{
        return element2;
    }
}

/*
* 检验表单的内容
* */
function checkForm(arr) {
    for(var key in arr){
        $("#"+key).css("border-color","lightblue");
        if(arr[key] == ""){
            $("#"+key).css("border-color","red");
            alert(($("#label-"+key).html())+"不能为空~~");
            return false;
        }
    }
    return true;
}

/*
* 清空表单
* */
function formReset(formId) {
    $("#"+formId)[0].reset();
}