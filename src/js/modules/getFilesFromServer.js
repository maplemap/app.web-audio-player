


$('.upload-files').on('click', function () {
    $.ajax({
        type: "GET",
        url: "http://php-file-server.local/index.php",
        cache: false,
        success: function(result){
            console.log(result)
        }
    });
})