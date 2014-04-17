function sendFileToServer(formData,status){
    var uploadURL ="upload.php"; //Upload URL
    var extraData ={}; //Extra Data.
    var jqXHR=$.ajax({
            xhr: function() {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        //Set progress
                        status.setProgress(percent);
                    }, false);
                }
            return xhrobj;
        },
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
        cache: false,
        data: formData,
        success: function(data){
            status.setProgress(100);

            $(".progressBar").css({"background-color":"transparent"});
            $(".progressBar").html('');
        }
    }); 
    status.setAbort(jqXHR);
}
 
function createStatusbar(obj){

    $('#dndArea').css({
        'padding-top':10,
        'padding-bottom':10
    });
    //$('#dndArea').html('');

     this.statusbar = $("<div class='statusbar'></div>");
     this.filename = $('<img src="img/cloud.png" class="sbImage">').appendTo(this.statusbar);
     this.size = $().appendTo(this.statusbar);
     //this.td = $("<td class='tdProgress'></td>").appendTo(this.statusbar);
     this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
     this.abort = $("<a class='delete' href='#' title='Delete'><img src='img/icons/close.png'>Delete</a>").appendTo(this.statusbar);
     
     $('#dndArea').append(this.statusbar);
 
    this.setFileNameSize = function(name,size){
        var sizeStr="";
        var sizeKB = size/1024;
        if(parseInt(sizeKB) > 1024){
            var sizeMB = sizeKB/1024;
            sizeStr = sizeMB.toFixed(2)+" MB";
        }else{
            sizeStr = sizeKB.toFixed(2)+" KB";
        }
 
        //this.filename.attr('src','uploads/'+name);
        this.tmb = name;
        this.size.html(sizeStr);
    }
    this.setProgress = function(progress){
        var progressBarWidth =progress*this.progressBar.width()/ 100;
        this.progressBar.find('div').animate({ width: progressBarWidth }, 100);
    }
    this.setAbort = function(jqxhr){
        var sb = this.statusbar;
        this.abort.click(function(){
            jqxhr.abort();
            sb.hide();
        });
    }
}
function handleFileUpload(files,obj){
   for (var i = 0; i < files.length; i++){
        var fd = new FormData();
        fd.append('file', files[i]);
 
        var status = new createStatusbar(obj); //Using this we can set progress.
        status.setFileNameSize(files[i].name,files[i].size);
        sendFileToServer(fd,status);

        function setThumbnail(){
            status.filename.attr('src','uploads/' + status.tmb);
        }

        setTimeout(setThumbnail, 1500);
   }
}
$(document).ready(function(){
var obj = $("#dndArea");
obj.on('dragenter', function (e){
    e.stopPropagation();
    e.preventDefault();
    $(this).css('border', '2px solid #c8cace');
});
obj.on('dragover', function (e){
     e.stopPropagation();
     e.preventDefault();
});
obj.on('drop', function (e){
 
     $(this).css('border', '2px solid transparent');
     e.preventDefault();
     var files = e.originalEvent.dataTransfer.files;
 
     //We need to send dropped files to Server
     handleFileUpload(files,obj);
});

$(document).on('dragenter', function (e){
    e.stopPropagation();
    e.preventDefault();
});
$(document).on('dragover', function (e){
  e.stopPropagation();
  e.preventDefault();
  obj.css('border', '2px dotted #c8cace');
});
$(document).on('drop', function (e){
    e.stopPropagation();
    e.preventDefault();
});
 
});