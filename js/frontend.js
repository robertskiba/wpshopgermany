
	/**
	 * Funktion für das Modul basketteaser
	 * Fügt die Produkte im Warenkorb ein
	 */
	function wpsg_mod_basketteaser_add(produkt_id)
	{
		
		var menge = jQuery('.wpsg_mod_basketteaser_row_' + produkt_id + ' input').val();
		
		if (menge <= 0) menge = 1;
		
		location.href = wpsg_ajax.ajaxurl + '?wpsg[menge]=' + menge + '&wpsg[produkt_id]=' + produkt_id + '&wpsg[submit]=1';
		
		return false;
		
	} // wpsg_mod_basketteaser_add(produkt_id)

	/**
	 * Aktualisiert ein eventuell eingebundenes Warenkorbwidget
	 */
	function wpsg_refreshBasketWidget()
	{
		
		if (jQuery('.wpsg_basket_widget').length <= 0) return;
		
		jQuery('.wpsg_basket_widget').html('<img class="loading" src="' + wpsg_ajax.img_ajaxloading + '" alt="' + wpsg_ajax.label_pleasewait + '" />');
		
		jQuery.ajax( {
			url: wpsg_ajax.url_basket,
			data: {
				'wpsg[ajax]': 1,
				'wpsg[action]': 'widget'
			},
			success: function(data) {
			
				jQuery('.wpsg_basket_widget').html(data);
				
			}
		} );
		
	} // function wpsg_refreshBasketWidget()
	
	function wpsg_customerquestion(url_redirect)
	{
	
		jQuery('body,html').addClass('wpsg_noscroll');
		jQuery('body').append('<div id="wpsg_calc_layer"><div class="content"><img class="loading" src="' + wpsg_ajax.img_ajaxloading + '" alt="' + wpsg_ajax.label_pleasewait + '" /></div></div>');
		jQuery.ajax( {
			url: wpsg_ajax.url_basket,
			data: {
				'wpsg[ajax]': 1,
				'wpsg[action]': 'customerquestion',
				'wpsg[url]': url_redirect
			},
			success: function(data) {
				
				jQuery('#wpsg_calc_layer .content').html(data);
				
			}
		} ); 
		
		return false;
	
	}
	
	wpsg_numberformat = function (number, decimals, dec_point, thousands_sep) 
	{
    
		var n = !isFinite(+number) ? 0 : +number, 
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        
        toFixedFix = function (n, prec) 
        {
        	
            	var k = Math.pow(10, prec);
            	return '' + Math.round(n * k) / k;        
        };
        
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    
        if (s[0].length > 3) 
        {
        	s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);    
        }
        if ((s[1] || '').length < prec) 
        {
        	
        	s[1] = s[1] || '';
        	s[1] += new Array(prec - s[1].length + 1).join('0');
    
        }    
        
        return s.join(dec);
	 
	};

	wpsg_tf = function(value)
	{
	 
		if (value == null) return;
		if (typeof value == "number") return parseFloat(value);
	  	  
		if (value.lastIndexOf(".") == -1)
		{

			// 1500,50		  
			return parseFloat(value.replace(/,/, "."));		  
	  
		}
		else
		{
		
			if (value.lastIndexOf(",") == -1)
			{	
				 
				// 1500.50
				return parseFloat(value);
		  
			}		  
			else 
			{
			
				if (value.lastIndexOf(",") > value.lastIndexOf("."))
				{  
				
					// 1.500,50				  
					return parseFloat(value.replace(/\./, "").replace(/,/, "."));
			  
				}
				else
				{
					
					// 1,500.50
					return parseFloat(value.replace(/,/, ""));
			  
				}
		  
			}
			
		}
	  
	};
	