<?php
/**
 * SQLIimport Server Functions
 * will show the template for chosen handler
 * @copyright Copyright (C) 2010 - SQLi Agency. All rights reserved
 * @licence http://www.gnu.org/licenses/gpl-2.0.txt GNU GPLv2
 * @author Jerome Vieilledent
 * @version @@@VERSION@@@
 * @package sqliimport
 */

class SQLIImportServerFunctions extends ezjscServerFunctions
{
    /**
     * Show config template related to the choosen handler
     * 
     * @param array $args ( 0 => choosen handler )
     * @return array
     */
    public static function settings( $args )
    {
        $tpl = eZTemplate::factory();
        $plugin = substr( $args[0], 0, strlen( $args[0] ) - 13 ); // 13 is lenght of importhandler
        $template = 'design:sqliimport/handlers/' . $plugin . '.tpl';
        $jsfile = eZURLOperator::eZDesign( $tpl, 'javascript/handlers/' . $plugin . '.js', '' );
        $ini = eZINI::instance( 'sqliimport.ini' );
        if ( in_array( $args[0], $ini->variable( 'ImportSettings', 'AvailableSourceHandlers' ) ) )
        {
            $group = $ini->group( $args[0] . '-HandlerSettings' );
            $options = array();
            foreach( $group as $key => $val )
            {
                if ( !in_array( $key, array( 'Enabled', 'Name', 'ClassName', 'Debug' ) ) )
                {
                    $options[$key] = $val;
                }
            }
            $tpl->setVariable( 'importoptions_array', $options );
            $SQLIImportOptions = new SQLIImportHandlerOptions( $options );

            return array( 
                'html' => $tpl->fetch( $template ),
                'importoptions' => $options
            );
        }
    }
    
    /**
     * Fills the content for model dialog
     * 
     * @param array $args ( 0 => dialog type, 1 => a node to start, 
     *                      for example to start browsing users instead of content. )
     * @return array
     */
    public static function dialog( $args )
    {
        $tpl = eZTemplate::factory();
        $nodeid = isset( $args[1] ) ? (int)$args[1] : 1;
        $tpl->setvariable( 'start_node_id', $nodeid );
        return eZTemplate::factory()->fetch( 'design:sqliimport/' . $args[0] . '.tpl' );
    }

    /**
     * Returns data to the tables
     * 
     * @param array $args ( 0 => node_id, 1 => sEcho )
     * @return array
     */
    public static function query( $args )
    {

        $node_id = isset( $args[0] ) ? (int)$args[0] : 1;
        $sEcho = isset( $args[1] ) ? (int) $args[1] : 1;  // we need to start from 2. first one is added by datables. 
                                                         // we need different sEcho for each call
        $offset = isset( $args[2] ) ? (int) $args[2] : 0;
        $limit = isset( $args[3] ) ? (int) $args[3] : 10;
        $aaData = array();
        $node = eZContentObjectTreeNode::fetch( $node_id );

        $nodes = eZContentObjectTreeNode::subTreeByNodeID( 
            array( 
                'Depth' => 1, 
                'Offset' => $offset,
                'Limit' => $limit,
                'SortBy' => $node->sortArray() 
            ), 
        $node_id );
        //print_r( $nodes );
        // fill rows
        foreach( $nodes as $item )
        {
            if  ( $item->attribute( 'is_container' ) )
            {
                $link = "SQLIImportajax::query::{$item->attribute( 'node_id' )}";
                eZURI::transformURI( $link );
                $aaData[] = array( 
                    '<input type="radio" value="' . $item->attribute( 'node_id' ) . '" name="SelectedNode" />', 
                    $item->childrenCount() ? '<a href="'. $link . '">' . $item->attribute( 'name' ) . '</a>' : $item->attribute( 'name' )
                );
            }
            else
                $aaData[] = array( '', $item->attribute( 'name' ) );
        }
        
        // get parent content
        $backContentIcon = self::getPath( 'up-16x16-grey.png' );
        $backContentLink = "SQLIImportajax::query::{$node->attribute( 'parent_node_id' )}";
        if( $node_id > 1 )
            $backContent = '<a href="' . $backContentLink .'"><img src="' . $backContentIcon . '" width="16" height="16" alt="" /></a>';
        else
            $backContent = '<img src="' . $backContentIcon . '" width="16" height="16" alt="" />';

        return array(
            'tableData' => array( 
                'sEcho' => $sEcho,
                'iTotalRecords' => $node->childrenCount(),
                'iTotalDisplayRecords' => eZContentObjectTreeNode::subTreeCountByNodeID( array( 'Depth' => 1 ), $node_id ),
                'aaData' => $aaData
            ),
            'node_id' => $node_id,
            'backContent' => $backContent
        );
    }

    private static function getPath( $img )
    {
        $operator = new eZURLOperator();
        $tpl = eZTemplate::instance();

        $operatorValue = $img;
        $operatorParameters = array();
        $namedParameters = array( 'quote_val' => 'no' );

        $operatorName = 'ezimage';

        $operator->modify( $tpl, $operatorName, $operatorParameters, '', '', $operatorValue, $namedParameters );
        return $operatorValue;
    }
    
    /**
     * get path identification string for the given node
     *
     * @param $args array ( 0 => node_id )
     * @return string
     */
    public static function getnodepath( $args )
    {
        return eZContentObjectTreeNode::fetch( (int) $args[0] )->attribute( 'path_identification_string' );
    }
  
}

?>

