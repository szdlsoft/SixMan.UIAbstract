// 将AbpEasyuiSimpleCrud 封装为可重用的对象！
// 依赖：easyui ,
// 依赖：apbproxy 后台服务
// 

// 使用举例：
//window.crud = new AbpEasyuiSimpleCrud({
//    appService: abp.services.app.foodMaterialCategory,//ABP后台服务代理
//    entityName: "食材分类",//实体名
//    listGrid: $("#listGrid"),
//    editDialog: $("#dlg"),
//    editForm: $("#fm")
//});
function AbpEasyuiSimpleCrud(option) {
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
    this.currentEntity = null;

    this.editDialog.dialog('open').dialog('center').dialog('setTitle', _S('添加'));
    this.editForm.form('clear');
}

AbpEasyuiSimpleCrud.prototype.edit = function () {
    var row = this.listGrid.datagrid('getSelected');
    if (row) {
        this.currentEntity = row;
        this.editDialog.dialog('open').dialog('center').dialog('setTitle', this._S('编辑'));
        this.editForm.form('load', row);
    }
}

AbpEasyuiSimpleCrud.prototype.save = function () {
    var self = this;
    var _$form = $('form[name=editForm]');

    if (!_$form.valid()) {
        return;
    }

    var entity = _$form.serializeFormToObject(); //serializeFormToObject is defined in main.js

    if ( this.currentEntity ) {
        entity = $.extend(true, this.currentEntity, entity);
    }

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
    abp.ui.setBusy(this.listGrid);
    this.appService.delete(row).done(function () {
        reload();
    }).always(function () {
        abp.ui.clearBusy(this.listGrid);
    });
}

AbpEasyuiSimpleCrud.prototype.del = function() {
    var row = this.listGrid.datagrid('getSelected');

    if (row) {
        abp.message.confirm(
            _S('删除'),
            '请确认?',
            function (isConfirmed) {
                if (isConfirmed) {
                    doDelete(row);
                }
            }
        );
    }
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

function initForm() {
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

AbpEasyuiSimpleCrud.prototype.initListDataGrid = function (options) {
    var self = this; //在事件中使用
    //var appService = this.appService;
    //var edit = this.edit;
    //var create = this.create;
    //var del = this.del;

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
                    self.edit();
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






