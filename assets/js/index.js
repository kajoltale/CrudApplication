const { request } = require("express");

$("#add_user").submit(function(event) {
    alert("Data inserted successfully!");
});

$("#update_user").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    //console.log(unindexed_array);

    var data = {};

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value'];
    });

    var reuest = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response) {
        alert("Data updated successfully!!");
    })
});

if(window.location.pathname == "/") {
    debugger
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id");

        var reuest = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data deleted succesfully!");
                location.reload();
            })
        }
    });
}
