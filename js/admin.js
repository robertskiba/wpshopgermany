wpsg_number_format = function (number, decimals, dec_point, thousands_sep) {

	var n = !isFinite(+number) ? 0 : + number, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }    return s.join(dec);
  };

	var wpsg_Tablefix = function(e, ui) {
		
		ui.children().each(function() {
			
			jQuery(this).width(jQuery(this).width());
			
		} );
		
		return ui;
		
	};
  
jQuery.fn.tipTip = function() {
  
	if (jQuery(this).hasClass('tipTip')) return;
	jQuery(this).addClass('tipTip');
		
	jQuery(this).cluetip( { 
		width: '400px',
		height: '400px', 
		activation: 'click',
		sticky: true,
		/*mouseOutClose: 'both',*/
		closePosition: 'title', 
		arrows: true,
		closeText: 'Schließen',
		onActivate: function() {

			jQuery('#cluetip').hide();
		
		},
		onShow: function() {
		
			jQuery('.cluetip-title').prepend(jQuery('.cluetip-inner h1').first().text());
			jQuery('.cluetip-inner h1').first().remove();
			
			jQuery('.cluetip-inner').css('overflow-y', 'show');
			jQuery('.cluetip-inner').css('height', 'auto');
			
			var height_content = jQuery('.cluetip-inner').outerHeight();
			var height_title = jQuery('.cluetip-title').outerHeight();
						
			if (height_content < 400)
			{
				
				jQuery('.cluetip-outer').height((height_content + height_title) + "px");
				
			}
			else
			{
				
				jQuery('.cluetip-outer').height("400px");
				
				jQuery('.cluetip-inner').css('overflow-y', 'scroll');
				jQuery('.cluetip-inner').css('height', '332px');
				
			} 
						
		}
	} );
	 
};
  
jQuery.fn.wpsg_adminbox = function(options) {
		
	return this.each(function() {
				
		var adminbox_id = jQuery(this).attr("id");
		
		jQuery(this).find('.title').bind('click', function() {
		 
			var content = jQuery(this).next();
						
			if (content.is(':visible'))
			{
			
				content.hide();
				jQuery(this).css('border-bottom', '1px solid #AAAAAA');
				jQuery.cookie(adminbox_id, '0', { expires: 14000 } );
				
			}
			else
			{
				
				content.show();
				jQuery(this).css('border-bottom', '0px');
				jQuery.cookie(adminbox_id, '1', { expires: 14000 } );
								
			}
			
		} );
		
		if (jQuery.cookie(adminbox_id) == null || jQuery.cookie(adminbox_id) == 0)
		{
			
			jQuery(this).find('.title').click();
			
		}
		
	} );
	
}

jQuery.fn.wpsg_tab = function(options) {
		
	return this.each(function() {
		
		var tab_obj = jQuery(this);
	
		// Init
		tab_obj.find('.tabcontent').hide();
		tab_obj.find('.tab').removeClass('akttab');
		
		var aktTab = 1;
		
		if (jQuery.cookie(options['cookiename']) != null && jQuery.cookie(options['cookiename']) > 0)
		{
			aktTab = jQuery.cookie(options['cookiename']);
		}
		
		jQuery('#tab' + aktTab).addClass('akttab');
		jQuery('#tabcontent' + aktTab).show();
		
		if (typeof options['tab' + aktTab] == 'function')
		{
			options['tab' + aktTab]();
		}
		
		tab_obj.find('.tab').bind('click', function() {
			
			tab_obj.find('.tab').removeClass('akttab');
			tab_obj.find('.tabcontent').hide();
			
			jQuery(this).addClass('akttab');
			
			var strID = jQuery(this).attr("id").replace(/tab/, '');
			jQuery.cookie(options['cookiename'], strID, { expires: 14000 } );
			
			jQuery('#tabcontent' + strID).show();
			
			if (typeof options['tab' + strID] == 'function')
			{
				options['tab' + strID]();
			}
			
		} );
		
	} );

};

/**
 * jPlot - Custom Formatter functions
 */
wpsg_statistics_number_format = function (formatString, value) {
	return wpsg_number_format(value, 2, ',', '.');
} 

wpsg_statistics_integer_format = function (formatString, value) {
	return wpsg_number_format(value, 0, ',', '.');
} 

function wpsg_in_array(needle, haystack) 
{
	
    var length = haystack.length;
    
    for(var i = 0; i < length; i++) {
    	
        if (haystack[i] == needle) return true;
        
    }
    
    return false;
    
}
