
function Cargar(url, capa)
{
	var contenido = document.getElementById(capa);
	var conexion = nuevaConexion();

	conexion.open("GET", url,true);
	conexion.onreadystatechange=function()
	{ 
		if((conexion.readyState == 4) && (conexion.status == 200))
		{
			contenido.innerHTML = conexion.responseText;
			invokeScript(document.getElementById(capa));
		}
	} 
	conexion.send(null);
} 

function invokeScript(divid)
{
	var scriptObj = divid.getElementsByTagName("SCRIPT");
	var len = scriptObj.length;

	for(var i=0; i<len; i++)
	{
		var scriptText = scriptObj[i].text;
		var scriptFile = scriptObj[i].src
		var scriptTag = document.createElement("SCRIPT");
		
		if ((scriptFile != null) && (scriptFile != "")){
			scriptTag.src = scriptFile;
		}
		scriptTag.text = scriptText;
		if (!document.getElementsByTagName("HEAD")[0]) {
			document.createElement("HEAD").appendChild(scriptTag)
		}
		else {
			document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
		}
	}
}

function nuevaConexion()
{
	var xmlhttp=false;

	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e)
	{
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (E)
		{ 
			xmlhttp = false;
		}
	}

	if (!xmlhttp && typeof XMLHttpRequest!='undefined')
	{ 
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp; 
}

function showSideBar(){
    const sidebar=document.querySelector('.sidebar');
    sidebar.style.display='flex';
    sidebar.classList.remove('hide');
    sidebar.classList.add('show');
}
function hideSideBar(){
    const sidebar=document.querySelector('.sidebar');
    sidebar.classList.remove('show');
    sidebar.classList.add('hide');
    sidebar.addEventListener('animationend', function() {
        if (sidebar.classList.contains('hide')) {
            sidebar.style.display='none';
        }
    });
}
function scrollToElement(id) {
    var element = document.getElementById(id);
    if (element) {
        var position = element.offsetTop - 50; // Ajusta este valor según tus necesidades
        window.scrollTo({top: position, behavior: "smooth"});
    }
}

window.addEventListener('scroll', function() {
    var nav = document.getElementById('navbar');
    if (window.scrollY > 450) {
        nav.classList.add('opaque');
    } else {
        nav.classList.remove('opaque');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    Cargar('./html/about-me.html', 'about-me');
    Cargar('./html/videocases.html', 'videocases');
    Cargar('./html/other-projects.html', 'other-projects');
});