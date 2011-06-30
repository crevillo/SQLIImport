<div class="context-block">
    {* DefaultParentNodeID *}  
    <div class="block">
        <label for="DefaultParentNodeID-text">{"Destination path"|i18n( 'extension/sqliimport' )}:</label>
        <div id="DefaultParentNodeID">
        <input class="halfbox" type="text" id="DefaultParentNodeID-text" name="DefaultParentNodeID_text" readonly="readonly" size="45" value="{cond( fetch( 'content', 'node', hash( 'node_id', $importoptions_array.DefaultParentNodeID )).path_identification_string|ne(''), fetch( 'content', 'node', hash( 'node_id', $importoptions_array.DefaultParentNodeID )).path_identification_string, '/' )}" />
        <input class="button browse content" type="submit" name="DefaultParentNodeID_button" id="DefaultParentNodeID-button" value="{'Browse'|i18n( 'extension/sqliimport' )}" title="{'Click this button to select the destination node where objects created by the import will be allocated.'|i18n( 'extension/sqliimport' )}" />
        <span id="DefaultParentNodeID-loading" class="loading">Loading...</span>
        <input type="hidden" name="DefaultParentNodeID_value" id="DefaultParentNodeID-value" value="{$importoptions_array.DefaultParentNodeID}" class="browse-hidden-value" />
        </div>
    </div>

    {* DefaultUserCreatorID *}
    <div class="block">
        <label for="DefaultUserCreatorID-text">{"Imported objects will be owned by:"|i18n( 'extension/sqliimport' )}:</label>
        <div id="DefaultUserCreatorID">
        <input class="halfbox" type="text" id="DefaultUserCreatorID-text" name="DefaultUserCreatorID_text" readonly="readonly" size="45" value="{fetch( 'content', 'object', hash( 'object_id', $importoptions_array.DefaultUserCreatorID )).name}" />
        <input class="button browse content" type="submit" name="DefaultUserCreatorID_button" id="DefaultUserCreatorID-button" value="{'Change user'|i18n( 'extension/sqliimport' )}" title="{'Click this button to select the user who should own the objects created by the import.'|i18n( 'extension/sqliimport' )}" />
        <span id="DefaultUserCreatorID-loading" class="loading">Loading...</span>
        <input type="hidden" name="DefaultUserCreatorID_value" id="DefaultUserCreatorID-value" value="{$importoptions_array.DefaultUserCreatorID}" class="browse-hidden-value" />
        </div>
    </div>

    <div id="sqliimport-browse-window"></div>

</div>
