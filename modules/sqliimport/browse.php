<?php
/**
 * SQLi Import add immediate import view
 * @copyright Copyright (C) 2010 - SQLi Agency. All rights reserved
 * @licence http://www.gnu.org/licenses/gpl-2.0.txt GNU GPLv2
 * @author Jerome Vieilledent
 * @version @@@VERSION@@@
 * @package sqliimport
 */

$Module = $Params['Module'];
$Result = array();
$tpl = SQLIImportUtils::templateInit();
$Result['content'] = $tpl->fetch( 'design:sqliimport/browse.tpl' );
$Result['pagelayout'] = false;
?>
