{default box_embed_mode         = true()
         box_class_filter_array = array()
         box_root_nodes         = array(
            fetch('content', 'node', hash( 'node_id', ezini( 'NodeSettings', 'RootNode', 'content.ini' ) )),
            fetch('content', 'node', hash( 'node_id', ezini( 'NodeSettings', 'MediaRootNode', 'content.ini' ) )),
            fetch('content', 'node', hash( 'node_id', ezini( 'NodeSettings', 'UserRootNode', 'content.ini' ) )) )
         box_has_access         = fetch( 'user', 'has_access_to', hash( 'module', 'sqliimport',
                                                                    'function', 'manageimports' ) )}
<form action={"sqliimport/browse"|ezurl} method="post" >
<div id="sqlimport-browse-content" class="sqlimport-content">
{if $box_has_access}
    <div id="header-design" class="float-break">
        <div id="header-topmenu">
            <ul class="tabs" id="sqliimport-top-menu">
            {foreach $box_root_nodes as $n}
                <li><a href={concat( "SQLIImportajax::query::" , $n.node_id)|ezurl}>{$n.name}</a></li>
            {/foreach}
            </ul>
        </div>
    </div>
{/if}
<table class="list sqlimport-content-table" cellpadding="0" cellspacing="0" border="0" id="sqliimport-content-table">
    <colgroup>
        <col width="10%" />
        <col width="80%" />
    </colgroup>
    <thead>
        <tr>
            <th id="sqliimport-back-button"></th>
            <th>Name</th>
        </tr>
    </thead>
    <tfoot>
    </tfoot>
    <tbody>    
    </tbody>
</table>
</div>
<input type="hidden" name="CurrentNodeID" id="CurrentNodeID" value="{$node_id}" />
<input type="hidden" name="SelectedNodeID" id="SelectedNodeID" value="" />
</form>
{/default}
