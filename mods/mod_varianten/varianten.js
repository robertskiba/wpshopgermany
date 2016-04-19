
	var wpsg_vp_vari = new Array();	
		  
	function wpsg_vp_switch(product_id, product_index)
	{
			 
		var var_key = 'vp_' + product_id + "/";
				
		for (var i = 0; i < wpsg_vp_vari[product_id].length; i ++)
		{
			
			var_key += i + "_";
			
			if (wpsg_vp_vari[product_id][i] == "select")
			{				
				var_key += jQuery('#wpsg_produktform_' + product_index + ' .wpsg_produkt_' + product_id + " #wpsg_vpfield_" + product_id + "_" + i).val();				
			}
			else if (wpsg_vp_vari[product_id][i] == "radio")
			{
				var_key += jQuery('#wpsg_produktform_' + product_index + ' .wpsg_produkt_' + product_id + ' input[name="wpsg_vp[' + i + ']"]:checked').val();
			}
			else if (wpsg_vp_vari[product_id][i] == "checkbox")
			{
				var_key += jQuery('#wpsg_produktform_' + product_index + ' .wpsg_produkt_' + product_id + ' input[name="wpsg_vp[' + i + ']"]:checked').length;
			} 
			else if (wpsg_vp_vari[product_id][i] == "image")
			{
				var_key += jQuery('#wpsg_produktform_' + product_index + ' .wpsg_produkt_' + product_id + ' .wpsg_mod_varianten_imageselect_' + i + ' .akt').attr("data-wpsg-id");
			}
			
			if (i < (wpsg_vp_vari[product_id].length - 1)) var_key += ":";
			
		}
		 
		jQuery('#wpsg_produktform_' + product_index).append('<div class="wpsg_product_layer"><img src="' + wpsg_ajax.img_ajaxloading + '" alt="' + wpsg_ajax.label_pleasewait + '" /></div>');
 
		jQuery.ajax( {
			'url': wpsg_ajax.ajaxurl,
			'method': 'get',
			'data': {
				'action': 'wpsg_varianten_switch',
				'wpsg_post_id': jQuery('#wpsg_produktform_' + product_index + ' input[name="wpsg_post_id"]').val(),
				'quantity': jQuery('#wpsg_menge_' + product_index).val(),
				'template': jQuery('#wpsg_produktform_' + product_index + ' input[name="wpsg[template]"]').val(),
				'referer': jQuery('#wpsg_produktform_' + product_index + ' input[name="myReferer"]').val(),
				'form_data': jQuery('#wpsg_produktform_' + product_index).serialize(),
				'product_key': var_key,
				'product_index': product_index
			},
			'success': function(data) {
		 
				jQuery('#wpsg_produktform_' + product_index).replaceWith(data);
				
			}
		} );
		
	} // function wpsg_vp_switch(produkt_id)
	