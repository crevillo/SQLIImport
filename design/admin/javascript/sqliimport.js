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
            var s = new sqliimport();
            s.init( data.content );              
        }
        else
        {
            // posible errors
        }
    }
   
})(jQuery);

var utils = function() {
    this.tostring = function( obj ) {
        var text = '';
        for( var key in obj ) {
            text += key + '=' + obj[key] + "\n";                        
        } 
        return text;               
    };         
};

var browse = function(){
    this.container = $( '<div id="sqliimport-browse-dialog"></div>' ).appendTo( 'body' );
    this.table = null;
    var oTable = null;
    this.container.dialog({
        width: 400,
        height: 440,
        autoOpen: false,
        modal: true,
        title: 'jau',
        close: function( event, ui ){
           oTable.fnDestroy();
        },      
        buttons: {
            ok: {
                text: 'Ok',
                className: 'defaultbutton',
                click: function() {                    
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
    
    this.oTable = null;

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
                    
                });
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
    
    var handlerConfig = $("#handlerconfig");
    var importOptionsField = $("#ImportOptions");
    this.utils = new utils();
    browseDialog = new browse();

    this.opendialog = function(){
        this.browse.container.dialog( 'open' );
    };
    
    this.init = function( data ) {
        handlerConfig.html( data.html );
        importOptionsField.val( this.utils.tostring( data.importoptions ) );
        this.bind( handlerConfig, browse );
    };

    this.bind = function( obj ) {
        $('.browse', obj).bind( 'click', function(e) {
            e.preventDefault();
            var loading = $( $(this).attr( 'id' ).split('-')[0] + '-loading' );
            loading.show();
            browseDialog.container.load( destinationBrowseURL, function() {  
                browseDialog.open();
                loading.hide();
            });        
        });
    };       
    
}

