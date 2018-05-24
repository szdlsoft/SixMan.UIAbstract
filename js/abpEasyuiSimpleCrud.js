// 将AbpEasyuiSimpleCrud 封装为可重用的对象！
// 依赖：easyui ,
// 依赖：apbproxy 后台服务
// 

// 使用举例：
//window.crud = new AbpEasyuiSimpleCrud({
//    appService: abp.services.app.foodMaterialCategory,//ABP后台服务代理
//    entityName: "实体名",//实体名
//    listGrid: $("#listGrid"),
//    editDialog: $("#dlg"),
//    editForm: $("#fm")
//});
function AbpEasyuiSimpleCrud(option) {
    initCrudCommon();

    this.currentEntity = {};
    $.extend(true, this, option);
}

AbpEasyuiSimpleCrud.prototype._S = function ( action ){
    return action + this.entityName;
}

AbpEasyuiSimpleCrud.prototype.reload =function () {
    this.listGrid.datagrid('reload');
}


AbpEasyuiSimpleCrud.prototype.create = function () {
    var self = this;
    abp.ui.setBusy(self.listGrid);
    self.appService.initCreate().done(function (data) {
        self.currentEntity = data;
        self.editDialog.dialog('open').dialog('center').dialog('setTitle', self._S('添加'));
        self.editForm.form('load', self.currentEntity);
    }).always(function () {
        abp.ui.clearBusy(self.listGrid);
    });
}

AbpEasyuiSimpleCrud.prototype.edit = function (row) {
    //var row = this.listGrid.datagrid('getSelected');
    if (row) {
        this.currentEntity = row;
        this.editDialog.dialog('open').dialog('center').dialog('setTitle', this._S('编辑'));
        this.editForm.form('load', row);
    }
}

AbpEasyuiSimpleCrud.prototype.save = function () {
    var self = this;
    //var _$form = $('form[name=editForm]');
    var _$form = self.editForm;

    if (!_$form.valid()) {
        return;
    }

    var entity = _$form.serializeFormToObject(); //serializeFormToObject is defined in main.js
    if ( self.onSerialized ) {
        self.onSerialized( entity );
    }

    if ( this.currentEntity ) {
        entity = $.extend(true, this.currentEntity, entity);
    }

    console.log( entity );

    abp.ui.setBusy(_$form);

    var saveAction = entity.id == 0 ? this.appService.create : this.appService.update;

    saveAction(entity).done(function () {
        self.editDialog.dialog('close');      // close the dialog
        self.reload();  // reload the user data
    }).always(function () {
        abp.ui.clearBusy(_$form);
    });
}

AbpEasyuiSimpleCrud.prototype.doDelete = function (row) {
    var self = this;
    abp.ui.setBusy(this.listGrid);
    this.appService.delete(row).done(function () {
        self.reload();
    }).always(function () {
        abp.ui.clearBusy(this.listGrid);
    });
}

AbpEasyuiSimpleCrud.prototype.del = function () {
    var self = this;

    var row = this.listGrid.datagrid('getSelected');
    if (row) {
        abp.message.confirm(
            self._S('删除'),
            '请确认?',
            function (isConfirmed) {
                if (isConfirmed) {
                    self.doDelete(row);
                }
            }
        );
    }
}


AbpEasyuiSimpleCrud.prototype.initListDataGrid = function (options) {
    var self = this; //在事件中使用
    this.listGrid.datagrid(
     $.extend(true,{
        singleSelect: true,
        loadFilter: function (data) {
            console.log(data);
            if (data.result) {
                if (data.result.items) {
                    var pageData = {};
                    pageData.total = data.result.totalCount;
                    pageData.rows = data.result.items;
                    return pageData;
                }
            }
            else
                if (data.items) {
                    var pageData = {};
                    pageData.total = data.totalCount;
                    pageData.rows = data.items;
                    return pageData;
                } else {
                    return data;
                }
        },
        pagination: true,
        
        loader: function (param, success, error) {
            //console.log(param);
            param.skipCount = (param.page - 1) * param.rows;
            param.maxResultCount = param.rows;

            var data = self.appService.getAll(param)
                .done(function (data) {
                    success(data);
                });
        },
        onClickRow: function (index, row) {
            self.edit(row);
        },

        toolbar: [
            {
                iconCls: 'icon-add',
                text: '添加',
                handler: function () {
                    self.create();
                }
            },
            {
                iconCls: 'icon-edit',
                text: '编辑',
                handler: function () {
                    var row = self.listGrid.datagrid('getSelected');
                    self.edit(row);
                }
            },
            {
                iconCls: 'icon-remove',
                text: '删除',
                handler: function () {
                    self.del();
                }
            },
            '-',
            {
                iconCls: 'icon-reload',
                text: '刷新',
                handler: function () {
                    self.reload();
                }
            }
        ],
    }, options));
}

//公共使用函数

function initCombobox( inputElementName, lookupService ) {
    $(inputElementName).combobox({
        valueField: 'id',
        textField: 'text',
        editable: false,
        loadFilter: filterData,
        loader: function (param, success, error) {
            //console.log(param);
            lookupService.getLookUp()
                .done(function (data) {
                    success(data);
                });
        },

    });
}


function filterData(data) {
    if (data.result) {
        return data.result;
    }
    else
        if (data.items) {
            return data.items;
        }
        else {
            return data;
        }
}

function imgFormater(imgFile) {
    return "<img style='width:24px;height:24px;' border='1' src='" + imgFile + "'/>";
}

function initCrudCommon() {
    if ( Date.prototype.Format ) {
        return; // 不重复
    }

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    //serializeFormToObject plugin for jQuery
    $.fn.serializeFormToObject = function () {
        //serialize to array
        var data = $(this).serializeArray();
        //add also disabled items
        $(':disabled[name]', this).each(function () {
            data.push({ name: this.name, value: $(this).val() });
        });

        //map to object
        var obj = {};
        data.map(function (x) { obj[x.name] = mergeSameKey(obj, x.name, x.value); });

        return obj;
    };

    initFormDatebox();
}

//相同key 转数组
function mergeSameKey(obj, name, value) {
    var item = obj[name];
    if (item) {
        if (item instanceof Array) {
        }
        else {
            var lastValue = item;
            item = [];
            item.push(lastValue);
        }
        item.push(value);
        return item;
    }
    else {
        return value;
    }
}


function initFormDatebox() {
    $('.easyui-datebox').datebox({
        formatter: function (date) {
            if (date) {
                return new Date(date).Format("yyyy-MM-dd");
            }
            return date;
        },
        parser: function (s) {
            var t = Date.parse(s);
            if (!isNaN(t)) {
                return new Date(t);
            } else {
                return new Date();
            }
        }
    });
}

function dateFormater(value) {
    if (value) {
        return new Date(value).Format("yyyy-MM-dd");
    }
    return value;
}





