/* 
 * Application : Global
 * ClassName   : sys_script_include
 * Created On  : 2019-10-10 06:03:45
 * Created By  : admin
 * Updated On  : 2019-10-10 06:21:13
 * Updated By  : admin
 * URL         : /sys_script_include.do?sys_id=6168dd5f1b10c8509614ff37dc4bcb21
 */
var SnDevTools = Class.create();
SnDevTools.prototype = {
    initialize: function() {
    },

/**
    * Description
    * 
    * @param {any} current
    * @returns {undefined}
    */
    sys_metadata_Display: function (current) {
		gs.log("Script Include is called");
        var self = this;
        if (gs.nil(current))
            return;

        if (!(current.canWrite() || current.canDelete()) || !gs.isInteractive() || !gs.hasRole('admin')) // no need to display a message as user can not change the record or the record is new
            return;

        var activeUpdateSet = self._getActiveUpdateSetOfRecord(current);
        if (activeUpdateSet) {
            gs.addErrorMessage(['This record is already in another update set: ', '<a href="', activeUpdateSet.update_set.getRefRecord().getLink(true), '">', activeUpdateSet.getElement('update_set').getDisplayValue(), ' [', activeUpdateSet.getElement('application').getDisplayValue(), ']', '</a>!'].join(''));

            // in case of display, make the record read only
            current.setValue('sys_policy', 'read');

            // hide all UI actions
            current.canCreate = function () {
                return false;
            };
            current.canRead = function () {
                return false;
            };
            current.canWrite = function () {
                return false;
            };
            current.canDelete = function () {
                return false;
            };

        }
    },

    /**
     * check if a record (sys_metadata) is already in another update set than the
     * currently active one. search for the same file in other update sets which are 'in progress'.
     * 
     * @param {glideRecord} current a sys_metadata glideRecord
     * @returns {glideRecord} the sys_update_xml glideRecord
     */
    _getActiveUpdateSetOfRecord: function (current) {
        var self = this;
        var out = null;

        if (gs.nil(current))
            return out;

        var currentUpdateSetID = gs.getPreference('sys_update_set'),
            updateSetXML = new GlideRecord('sys_update_xml'),
            query = ['name=', current.sys_update_name,
                '^update_set!=', currentUpdateSetID,
                '^update_set.state=in progress'
            ].join('');

        updateSetXML.addEncodedQuery([query, '^update_set.application=Global^update_set.is_default=false'].join(''));

        updateSetXML.orderByDesc('sys_updated_on');
        updateSetXML.setLimit(1);
        updateSetXML._query();
        if (updateSetXML._next()) {
            out = updateSetXML;
        }
        return out;
    },	

    type: 'SnDevTools'
};
