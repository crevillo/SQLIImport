<?php /* #?ini charset="utf-8"?

[eZJSCore]
ExternalScripts[jqueryui]=http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js
LocalScripts[jqueryui]=jquery-ui-1.8.6.min.js
Packer=disabled

[ezjscServer]
FunctionList[]=SQLIImportajax_settings
FunctionList[]=SQLIImportajax_dialog
FunctionList[]=SQLIImportajax_query

[ezjscServer_SQLIImportajax]
Class=SQLIImportServerFunctions
Functions[]=SQLIImportajax
PermissionPrFunction=enabled
File=extension/sqliimport/classes/sqliimportserverfunctions.php

[ezjscServer_SQLIImport]
Class=SQLIImportFunctions
File=extension/sqliimport/classes/sqliimportfunctions.php

*/ ?>
