<?php
/**
 * upload script. will only receive a file
 */

$fileHandler = eZClusterFileHandler::instance();
$errors = array();

foreach( $_FILES as $key => $httpfile )
{
    $file = eZHTTPFile::fetch( $key );
    $filePath = eZINI::instance()->variable( 'FileSettings', 'VarDir' ) . '/sqliimport/' . md5( $file->attribute( "original_filename" ) . time() ) . '.xml';
    if ( !is_dir( dirname( $filePath ) ) )
    {
        eZDir::mkdir( dirname( $filePath ), false, true );
    }

    $fileHandler->fileCopy( $file->attribute( 'filename' ), $filePath );
          
    echo json_encode( array( 'filename' => $filePath ) );
}
eZExecution::cleanExit();
?>

