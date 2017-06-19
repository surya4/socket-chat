$(document).ready(function(){
var socket = io();
$("#chat").hide();
		$("#name").focus();
		$("form").submit(function(event){
    		event.preventDefault();
		});

  $("#join").click(function(){
			var name = $("#name").val();
			if (name != "") {
				socket.emit("join", name);
				$("#login").detach();
				$("#chat").show();
				$("#msg").focus();
				ready = true;
			}
		});

      socket.on("update", function(msg) {
      			if(ready)
      				$("#message-area").append("<li><em>" + msg + "</em></li>");
      		})
      		socket.on("update-people", function(people){
      			if(ready) {
      				$("#people-area").empty();
      				$.each(people, function(clientid, name) {
      					$('#people-area').append("<li>" + name + "</li>");
      				});
      			}
      		});
      		socket.on("chat", function(who, msg){
      			if(ready) {
      				$("#message-area").append("<li><strong><span class='text-success'><em>" + who + "</em></span></strong> : " + msg + "</li>");
      			}
      		});
      		socket.on("disconnect", function(){
      			$("#message-area").append("<li><strong><span class='text-warning'>Chat server is not available</span></strong></li>");
      			$("#msg").attr("disabled", "disabled");
      			$("#send").attr("disabled", "disabled");
      		});

      		$("#msg").keypress(function(e){
      			if(e.which == 13) {
      				var msg = $("#msg").val();
      				socket.emit("send", msg);
      				$("#msg").val("");
      			}
      		});

		});
