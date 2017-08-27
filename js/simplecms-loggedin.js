var editElement = null;
var selectableMode = true

function editMode(){
	$("#main div[id], #topBanner, #topBannerFeature, #menu").hover(function(){
		$(this).addClass("selectable")
	}, function(){
		$(this).removeClass("selectable")
	}).click(function(){
		if (selectableMode) {
			selectableMode = false;
			$("#main div[id]").unbind('mouseenter mouseleave click');
			var selectables = $(".selectable");
			edit($(selectables[selectables.length - 1]).attr("id"));
		}
	});
	$("input[value='Edit']").hide();
	selectableMode = true;
}

edit = function(elementId){
	
	if (elementId == "") {
		alert("The element you selected has no ID.");
	}
	else {
		editElement = elementId;
		tinyMCE.init({
			// General options
			mode: "exact",
			elements: elementId,
			theme: "advanced",
			plugins: "safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount",
			
			// Theme options
			theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
			theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
			theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
			theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
			theme_advanced_toolbar_location: "top",
			theme_advanced_toolbar_align: "left",
			theme_advanced_statusbar_location: "bottom",
			theme_advanced_resizing: true,
		
		});
		$("input[value='Save']").show();
	}
}

save = function(){
	var ed = tinyMCE.get(editElement);
	var content = ed.getContent();
	var pageName = getPageName();
	
	if (editElement == "menu") {
		pageName = "menu";
	}
	
	$.ajax({
		async: true,
		url: "save",
		type: "POST",
		data: {
			"page": pageName,
			"elementId": editElement,
			"content": content
		},
		dataType: "text",
		success: function(returnObject){
			alert("Saved");
			window.location.reload();
		},
		error: function(){
			alert("Error");
		}
	});
}

function getPageName() {
	var page = "index";
	var string = new String(document.URL.match("[^/]*\.html"));
	if (string != "null") {
		page = string.substring(0, string.indexOf(".html"))
	}
	return page;
}
