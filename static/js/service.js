/**
 * Created by 98259 on 2017/4/7 0007.
 */
/*
* 展示模态框
* */
/*
 * 展示模态框
 * */
function showMadol() {
    $("#machineadd")[0].reset();
    $("#serverip").removeAttr("readonly");
    $("#addmechine").modal('show');
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
* 添加服务
* */
function addService() {
    formData = new FormData(document.getElementById("service"));
    fetch(baseURL+"/insertServer",{
        method:"POST",
        body:formData
    }).then(
        function (e) {
            return e.text();
        }
    ).then(
        function (text) {
            if(text == "1"){
                alert("添加服务成功~~");
                $("#addservice").modal('hide');
                reload();
            }else if(text == "-1"){
                alert("服务编号已经存在~~");
            }
        }
    );
}
/*
* 查询多个服务
* */
function getServices() {
    var form = $("#FService").serializeArray();
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

var grid_data =
    [
        {colony:"dwtest",servicenumber:"34534",servicename:"spark sql服务",servicetype:"HivSql服务",description:"自定义服务",version:"1.0",creater:"zs"
            ,createtime:"2014-08-08",valid:"是"}
    ];


jQuery(function($) {
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";

    jQuery(grid_selector).jqGrid({
        //direction: "rtl",
        // data: grid_data,
        url:baseURL+"/getServers?",
        datatype: "json",
        mtype:"GET",
        height: 200,
        padding: 0,
        colNames:['所属集群','服务编号','服务名称', '服务类型', '描述','版本','创建人','创建时间','是否有效'],
        colModel:[
            {name:'cluster',index:'cluster', width:110, fixed:true, sortable:false, resize:false},
            {name:'id',index:'id', width:120, sorttype:"int", editable: true},
            {name:'name',index:'name',width:170, sorttype:"date"},
            {name:'type',index:'type', width:200},
            {name:'description',index:'description', width:160},
            {name:'version',index:'version', width:100},
            {name:'maker',index:'maker', width:100},
            {name:'date',index:'date', width:170},
            {name:'valid',index:'valid', width:100, sortable:false},
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
        caption: "服务管理表格信息",

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