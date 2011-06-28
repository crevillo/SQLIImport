<div class="context-block">    
    <div class="block">
        <label for="rssImportDest">{"Destination path"|i18n( 'extension/sqliimport' )}:</label>
        <div id="DefaultParentNodeID">
        <input class="halfbox" type="text" id="DefaultParentNodeID-text" name="DefaultParentNodeID_text" readonly="readonly" size="45" value="{cond( fetch( 'content', 'node', hash( 'node_id', $importoptions_array.DefaultParentNodeID )).path_identification_string|ne(''), fetch( 'content', 'node', hash( 'node_id', $importoptions_array.DefaultParentNodeID )).path_identification_string, '/' )}" />
        <input class="button browse content" type="submit" name="DefaultParentNodeID_button" id="DefaultParentNodeID-button" value="{'Browse'|i18n( 'extension/sqliimport' )}" title="{'Click this button to select the destination node where objects created by the import will be allocated.'|i18n( 'extension/sqliimport' )}" />
        <span id="DefaultParentNodeID-loading" class="loading">Loading...</span>
        <input type="hidden" name="DefaultParentNodeID_value" id="DefaultParentNodeID-value" value="{$importoptions_array.DefaultParentNodeID}" />
        </div>
    </div>
    <div id="sqliimport-browse-window"></div>

</div>
