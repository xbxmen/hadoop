/**
 * Created by 98259 on 2017/4/4 0004.
 */
/*
 * 展示模态框
 * */
function showMadol() {
    $("#machineadd")[0].reset();
    $("#serverip").removeAttr("readonly");
    $("#addmechine").modal('show');
}
/*
 * 新增
 */
function add() {
    $("#huoqu").css("display","none");
    $("#baocun").css("display","inline")
    $("#gengixn").css("display","none")
    showMadol();
}
/*
 * 修改
 * */
function modify() {
    $("#ip").removeAttr("readonly");
    $("#huoqu").css("display","inline");
    $("#gengxin").css("display","inline");
    $("#baocun").css("display","none");
    showMadol();
}

/*
* 重新加载表格
* */
function reload(element) {
    $("#grid-table").jqGrid('setGridParam',{
        datatype:'json',
        postData:element,
        page:1
    }).trigger("reloadGrid")
}

/*
 * 添加 机器信息
 * */
function addMachine() {
    var arr = getContent("machineadd",true);
    console.log(arr);
    /*检查 表单内容*/
    if(!checkForm(arr))
        return false;
    var res = toRequest(baseURL+"/insertMachine","POST",getContent("machineadd",false));
    res.then(
        function (e) {
            return e.text();
        }
    ).then(
        function (text) {
            if(text == "1"){
                alert("成功添加信息");
                $("#addmechine").modal('hide');
                reload();
            }else if(text == "-1"){
                alert("IP已经存在");
            }
        }
    );
}

/*
* 修改机器信息
* */
function updateMechine() {
    var arr = getContent("machineadd",true);
    console.log(arr);
    /*检查 表单内容*/
    if(!checkForm(arr))
        return false;
    var res = toRequest(baseURL+"/updateMachine","POST",getContent("machineadd",false));
    res.then(
        function (e) {
            return e.text();
        }
    ).then(
        function (text) {
            if(text == "1"){
                alert("成功修改信息");
                $("#addmechine").modal('hide');
                reload();
            }else if(text == "-1"){
                alert("IP已经存在");
            }
        }
    );
}

/*
 * 查询多条数据
 * */
function getMachines() {
    var form = $("#chaxun").serializeArray();
    var element = new Map();
    $.each(
        form,function () {
            //字符串
            if(this.value != ""){
                element[this.name] = this.value;
            }
        }
    );
    console.log(element);
    reload(element);
}
/*
 * 获取一条数据
 * */
function getOneMachine() {
    var arr = getContent("machineadd",true);
    if(arr["ip"] == ""){
        alert("服务器ip不能为空~");
        return false;
    }
    else if(arr["user"] == ""){
        alert("用户名为空~");
        return false;
    }
    else if(arr["password"] == ""){
        alert("密码不能为空");
        return false;
    }
    var res = toRequest(baseURL+"/getOneMachine?"+"ip="+arr['ip']+"&user="+arr['user']+"&password="+arr['password'],"GET");
    res.then(
        function (e) {
            return e.text();
        }
    ).then(
        function (text) {
            if(text != ""){
                $("#ip").attr("readonly","zs");
                text = eval('('+text+')');
                for(key in text){
                    $("#"+key).val(text[key]);
                }
            }else{
                alert("记录不存在~");
            }
        }
    );
}

/*修改一条数据*/
function setMechine() {
    /*var ele = document.getElementsByClassName("ui-widget-content jqgrow ui-row-ltr ui-state-highlight");
    if(ele.length == 0 || ele.length > 1){
        alert("必须选择一个元素~~");
        return false;
    }
    console.log(ele);
    console.log(ele[0].id);
    result = toRequest("","GET",{"id":ele[0].id});
    if(result != ""){
        $("#huoqu").hide();
        $("#addmechine").modal('show');
        for(key in result){
        }
    }*/
}

/*var grid_data =
    [
        {id:"1",ip:"121.122.322.222",hostname:"dw123",username:"root",cputype:"intel(r) core(tm) i5-6400",kernel:"1",memory:"2"
            ,disk:"500",bandwidth:"100Mb/s",system:"Ubuntu",container:"2",docker:"4243",dockerstate:"启动",
            serverstate:"正常",gateway:"10.1.22.254",subnet:"255.255.255.0"},
        {id:"2",ip:"121.122.322.222",hostname:"dw123",username:"root",cputype:"intel(r) core(tm) i5-6400",kernel:"1",memory:"2"
            ,disk:"500",bandwidth:"100Mb/s",system:"Ubuntu",container:"2",docker:"4243",dockerstate:"启动",
            serverstate:"正常",gateway:"10.1.22.254",subnet:"255.255.255.0"}
    ];*/
jQuery(function($) {
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";

    jQuery(grid_selector).jqGrid({
        //   data: grid_data,
        //   datatype: "local",
        url:baseURL+"/getMachines?",
        height: 200,
        datatype:'json',
        mtype:'GET',
        colNames:['IP','主机名','用户名','CPU型号', '内核个数','内存大小','硬盘大小','带宽',
            '操作系统','容器个数','docker端口','服务器状态','网关','子网掩码'],
        colModel:[
            {name:'ip',index:'ip', width:110, fixed:true, sortable:false, resize:false},
            {name:'name',index:'name', width:120, sorttype:"int", editable: true},
            {name:'user',index:'user',width:120, sorttype:"date"},
            {name:'cpuModel',index:'cpuModel', width:200},
            {name:'cpuCount',index:'cpuCount', width:160},
            {name:'ramSize',index:'ramSize', width:160},
            {name:'diskSize',index:'diskSize', width:170},
            {name:'bandwidth',index:'bandwidth', width:105},
            {name:'system',index:'system', width:170, sortable:false},
            {name:'containerCount',index:'containerCount', width:150, sortable:false},
            {name:'docker',index:'docker', width:150, sortable:false},
            {name:'status',index:'status', width:150, sortable:false},
            {name:'gateway',index:'gateway', width:150, sortable:false},
            {name:'mask',index:'mask', width:150, sortable:false}
        ],
        viewrecords : true,
        rowNum:10,
        rowList:[10,20,30],
        pager : pager_selector,
        altRows: true,
        //toppager: true,

        multiselect: true,
        //multikey: "ctrlKey",
        multiboxonly: true,

        loadComplete : function() {
            var table = this;
            setTimeout(function(){
                updatePagerIcons(table);
                enableTooltips(table);
            }, 0);
        },
        caption: "服务器信息表格",
        autowidth: true

    });

    //replace icons with FontAwesome icons like above
    function updatePagerIcons(table) {
        var replacement =
            {
                'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
                'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
                'ui-icon-seek-next' : 'icon-angle-right bigger-140',
                'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
            };
        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
        })
    }

    function enableTooltips(table) {
        $('.navtable .ui-pg-button').tooltip({container:'body'});
        $(table).find('.ui-pg-div').tooltip({container:'body'});
    }
});