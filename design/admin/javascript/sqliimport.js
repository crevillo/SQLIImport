(function( $ )
{
    $(document).ready( function()
    {

        $('#ImportHandler').change( function(){
            _showhandler( $(this) )
        });

        _showhandler( $('#ImportHandler') );
    });

    function _showhandler( obj )
    {
        jQuery.ez( 'SQLIImportajax::settings::' + obj.val(), {}, _callBack );        
    }

    function _callBack( data )
    {
        if ( data && data.content && data.content.html !== '' )
        {
            s = new sqliimport();
            s.init( data.content );              
        }
        else
        {
            // posible errors
        }
    }
   
})(jQuery);

var utils = function() {

    this.setProperty = function( key, val, obj ) {
        obj[key] = val;
    }
    this.tostring = function( obj ) {
        var text = '';
        for( var key in obj ) {
            text += key + '=' + obj[key] + "\n";                        
        } 
        return text;               
    };         
};

var browse = function( property, currentValue ){
    this.container = $( '<div id="sqliimport-browse-dialog"></div>' ).appendTo( 'body' );
    this.table = null;
    var oTable = null;
    this.container.dialog({
        width: 400,
        height: 440,
        autoOpen: false,
        modal: true,
        title: 'jau',
        open: function( event, ui ){
            // actual value for the param we want to change
            // so we can check the related input radio on table callback
            $( "#sqliimport-browse-current-value" ).val( currentValue );
            $( "#sqliimport-browse-new-value" ).val( currentValue );
            $( "#sqliimport-browse-property" ).val( property );
            
        },
        close: function( event, ui ){
           oTable.fnDestroy();
           browseDialog.container.remove();
        },      
        buttons: {
            ok: {
                text: 'Ok',
                className: 'defaultbutton',
                click: function() {
                    // set de new value
                    u.setProperty( $( "#sqliimport-browse-property" ).val(), $( "#sqliimport-browse-new-value" ).val(), settings );
                    // also set the value in the hidden related field
                    // this will trigger the ajax call to show the seletected path
                    $( $( "#sqliimport-browse-property" ).val() + '-value' ).val( $( "#sqliimport-browse-new-value" ).val() );
                    $( '#' + $("#sqliimport-browse-property" ).val() + '-value' ).val( $( "#sqliimport-browse-new-value" ).val() );
                    $( '#' + $("#sqliimport-browse-property" ).val() + '-value' ).change();
                    // update the textarea
                    s.updateSettings( u.tostring( settings ) );
                    $(this).dialog( 'close' );
                }
            },
            cancel: {
                text: 'Cancel',
                className: 'button',
                click: function() {
                    $(this).dialog( 'close' );
                }
            }
        }                                   
    });

    this.open = function() {
        this.container.dialog( 'open' );
        this.initializeTable();           
    }

    this.initializeTable = function() {
        var currentNodeID = $("#CurrentNodeID");
        var backHeader = $( "#sqliimport-back-button" );
        oTable = $( 'table.sqlimport-content-table' ).dataTable({
            "bInfo": false,
            "bFilter": false,
            "iDisplayLength": 10,
            "aLengthMenu": [10, 25, 50],
            "asStripClasses": ['bglight', 'bgdark'],
            "bProcessing": true,
    		"bServerSide": true,
            "sPaginationType": "full_numbers",
            "sAjaxSource": queryURL,
            "fnServerData": function ( sSource, aoData, fnCallback ) {
                // get the interesting parts from aoData
                params = $.grep( aoData, function( el, i ){
                    return el.name === 'sEcho' ||
                        el.name === 'iDisplayStart' ||
                        el.name === 'iDisplayLength'
                });
                for ( var i in params ) {
                    sSource += '::' + params[i].value;
                }
                jQuery.ez( sSource, false, function ( data ) { 
                    backHeader.html( data.content.backContent );
    			    fnCallback( data.content.tableData );
			    });
		    },
            "fnDrawCallback": function( oSettings ){
                $( 'a', oTable ).bind( 'click', function( e ){
                    e.preventDefault();
                    oSettings.sAjaxSource = $(this).attr( 'href' );
                    oTable.fnDraw();
                });
                $('input[type=radio]', oTable).bind( 'click', function( e ) {
                    // when clicked, change the selected node id field so we can return it to the 'main' template
                    $( "#sqliimport-browse-new-value" ).val( $(this).val() );
                });
                $('input[type=radio][value=' + currentValue + ']' ).attr( 'checked', 'checked' );
            }
        });

        $( "#sqliimport-top-menu a").bind( 'click', function( e ) {
            e.preventDefault();
            oTable.fnSettings().sAjaxSource = $(this).attr( 'href' );
            oTable.fnDraw();
        });   
    }
};

var sqliimport = function(){
    
    var handlerConfig = $( "#handlerconfig" );
    var importOptionsField = $( "#ImportOptions" );
    
    browseDialog = null;

    this.opendialog = function(){
        this.browse.container.dialog( 'open' );
    };
    
    this.init = function( data ) {
        handlerConfig.html( data.html );
        importOptionsField.val( u.tostring( data.importoptions ) );
        // initalize the settings with the json representation of them 
        settings = data.importoptions;
        this.bind( handlerConfig, browse );
    };
    
    this.updateSettings = function( data ) {
        importOptionsField.val( data );
    }

    this.bind = function( obj ) {
        $('.browse', obj).bind( 'click', function(e) {
            e.preventDefault();
            var loading = $( '#' + $(this).attr( 'id' ).split('-')[0] + '-loading' );
            loading.show();
            browseDialog = new browse( $(this).attr( 'id' ).split('-')[0], $( '#' + $(this).attr( 'id' ).split('-')[0] + '-value' ).val() );
            browseDialog.container.load( destinationBrowseURL, function() {  
                browseDialog.open();
                loading.hide();
            });        
        });

        $('.browse-hidden-value' ).change( function() {
            var id = $(this).attr( 'id' );
            jQuery.ez( 'SQLIImportajax::getnodepath::' + $(this).val(), false, function( data ) {
                $( '#' + id.split('-')[0] + '-text' ).val( data.content );
            });
        });
    };       
    
}

var settings = null; // this var will track the changes made by user. 
var u = new utils();

