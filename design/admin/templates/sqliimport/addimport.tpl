{ezscript_require( array( 'sqliimport.js', 'jquery.plugin-0810.02-min.js', 'jquery.dataTables.min.js', 'sqlimport::jqueryui' ) )}
{ezcss_require( 'sqliimport.css' )}
{literal}
<script type="text/javascript">
var destinationBrowseURL = {/literal}{'sqliimport/browse'|ezurl}{literal}; 
var queryURL = {/literal}{'SQLIImportajax::query::1'|ezurl}{literal};
</script>
{/literal}
{if is_set( $error_message )}
<div class="message-error">
    <h2>{'Input did not validate'|i18n( 'design/admin/settings' )}</h2>
    <p>{$error_message}</p>
</div>
{/if}
<form action={'/sqliimport/addimport'|ezurl} method="post">
    <div class="box-header">
        <div class="box-tc">
            <div class="box-ml">
                <div class="box-mr">
                    <div class="box-tl">
                        <div class="box-tr">
                            <h1 class="context-title">{'Request a new immediate import'|i18n( 'extension/sqliimport' )}</h1>
                            {* DESIGN: Mainline *}<div class="header-mainline"></div>
                            {* DESIGN: Header END *}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    {* DESIGN: Content START *}
    <div class="box-ml">
        <div class="box-mr">
            <div class="box-content">
                <div class="block">
                            <select name="ImportHandler" id="ImportHandler">
                            {foreach $importHandlers as $handlerName => $handler}
                               <option value="{$handler}">{$handlerName}</option>
                            {/foreach}
                            </select>
                </div>
                <div id="handlerconfig"></div>
                <div class="box-header">
                    <div class="box-ml">
                        <h2 class="context-title">{'Options (facultative)'|i18n( 'extension/sqliimport' )}</h2>
                    </div>
                </div>
                <div>
                <div class="block">
                    <textarea name="ImportOptions" id="ImportOptions" rows="7" cols="70" readonly="yes">{$importoptions}</textarea>      
                </div>
                {* DESIGN: Content END *}
            </div>
        </div>
    </div>
    
                            
    {* Buttons. *}
    <div class="controlbar">
    {* DESIGN: Control bar START *}
        <div class="box-bc">
            <div class="box-ml">
                <div class="box-mr">
                    <div class="box-tc">
                        <div class="box-bl">
                            <div class="box-br">
                                <div class="block">
                                    <input class="button" type="submit" id="RequestImportButton" name="RequestImportButton" value="{'Request a new immediate import'|i18n( 'extension/sqliimport' )}" />
                                </div>
                            {* DESIGN: Control bar END *}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
