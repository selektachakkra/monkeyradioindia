$(document).ready(function(){
	

	var a = 'http://api.mixcloud.com/monkeyradioindia/cloudcasts/';
	var hostList = {
			'tune inn': '<a href="#"> Dakta Dub </a>',
			'dub vibration': '<a href="#">Dakta Dub </a>',
			'hyderabad hi fi': '<a href="#">Dakta Dub </a>',
			'musical journey with balu':'<a href="#">Balasubramaniam </a>',
			'roots unwired':'<a href="#">Mr Nobody </a>',
			'funk assassin':'<a href="#">Funk Assassin </a>',
			'souls of sound':'<a href="#">Dj Psylenz </a>',
			'swatantram':'<a href="#">Velugu </a>',
			'music manthan':'<a href="#">Selekta Chakkra </a>',
			'puri juggernaut':'<a href="#">Shivacult </a>'
			}
	
	/* Main AJAX call */
	$.getJSON(a,function(data){
		console.log(data);
		var mixArray = [];
		
		/* Install mix on Monkey floating player */
		/* Puts the latest mix that has been uploaded on to the player */
		var src='//www.mixcloud.com/widget/iframe/?feed='+data.data[0].url+'&amp;embed_uuid=2fa6d3fd-bf4f-4c21-83ba-bdb4771c437a&amp;replace=0&amp;hide_cover=1&amp;embed_type=widget_standard&amp;hide_tracklist=1';
		$('#monkeyPlayer iframe').attr('src',src);
		
		for (var i = 0, len = data.data.length; i < len; i++) {
			
			/* Create a basic p tag */
			var mix = '<p class="mix"> </p>';	
			
			/* To get images */
			var image = data.data[i].pictures.medium;
			var imageURL = '<img class="mixImage" src="'+image+'">';
			
			/* To get mix iFrame */
			var mix = data.data[i].url;
			var mixURL = '<iframe src="//www.mixcloud.com/widget/iframe/?feed='+mix+'&amp;embed_uuid=2fa6d3fd-bf4f-4c21-83ba-bdb4771c437a&amp;replace=0&amp;hide_cover=1&amp;embed_type=widget_standard&amp;hide_tracklist=1;autoplay=1" frameborder="0"></iframe>';
			
			/* To get mix name */
			var name = data.data[i].name;
			
			/* To get mix plays */
			var plays = data.data[i].play_count;
			
			/* To get mix favs */
			var favs = data.data[i].favorite_count;
			
			/* To get name of Radio Host */
			var host='';
			
			$.each(hostList,function(key,value){
				if(!name.toLowerCase().search(key))
				{
					host = value;
				}
			});
			if(host == '')
			{host = 'a special guest'}
			
			/* Top get mix description */
			var mixAPIURL = mix.replace('www','api');
			$.getJSON(mixAPIURL, function(description){
					var mixDescription = description.description;
			});
			
			var individualMix = '<p class="mix">'+imageURL+'<span class="mixName" href="'+mix+'">'+name+'</span><span class="mixDetailsSection">Plays: '+plays+' | Favorites: '+favs+'</span>'+ 
			'<span class="mixDetailsSection">Hosted by '+host+' </span> <span class="clearSpan"></span> </p>';
			
			$(individualMix).appendTo('.mixWrapper');
			
		}
		
		$('.mix').on('click',function(){
			
			var src='//www.mixcloud.com/widget/iframe/?feed='+$(this).children('span').attr('href')+'&amp;embed_uuid=2fa6d3fd-bf4f-4c21-83ba-bdb4771c437a&amp;replace=0&amp;hide_cover=1&amp;embed_type=widget_standard&amp;hide_tracklist=1;autoplay=1';

			$('#monkeyPlayer iframe').attr('src',src);
		
		});
		
		
		
	
		
		
	}); 
	
});