
const uri = "api/teachers";

let teachers = null;

function getCount(data) {
    const el = jQuery("#counter");
    let name = "Teacher";

    if (data) {
        if (data > 1) {
            name = "Teachers";
        }

        el.text(data + " " + name);

    } else {
        el.text("No " + name);
    }
}

jQuery(document).ready(function () {
    getData();
});

function getData() {
    jQuery.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {

            const tBody = jQuery("#teachers");

            jQuery(tBody).empty();

            getCount(data.length);

            jQuery.each(data, function (_key, item) {

                console.log(JSON.stringify(item));

                const tr = jQuery("<tr></tr>")
                    .append(jQuery("<td></td>").text(item.firstname))
                    .append(jQuery("<td></td>").text(item.lastname))
                    .append(jQuery("<td></td>").text(item.email))
                    .append(
                        jQuery("<td></td>").append(
                            jQuery("<button>Edit</button>").on("click", function () {
                                editItem(item.id);
                            })
                        )
                    )
                    .append(
                        jQuery("<td></td>").append(
                            jQuery("<button>Delete</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );
                tr.appendTo(tBody);
            });

            teachers = data;
        }
    });
}

function addItem() {
    const item = {
        firstname: jQuery("#add-firstname").val(),
        lastname: jQuery("#add-lastname").val(),
        email: jQuery("#add-email").val()
    };

    jQuery.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            jQuery("#add-firstname").val("");
            jQuery("#add-lastname").val("");
            jQuery("#add-email").val("");
        }
    });

}

function deleteItem(id) {
    jQuery.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    jQuery.each(teachers, function (_key, item) {
        if (item.id === id) {
            jQuery("#edit-id").val(item.id);
            jQuery("#edit-firstname").val(item.firstname);
            jQuery("#edit-lastname").val(item.lastname);
            jQuery("#edit-email").val(item.email);
        }
    });

    jQuery("#spoiler").css({ display: "block" });
}

jQuery(".my-form").on("submit", function () {
    const item = {
        id: jQuery("#edit-id").val(),
        firstname: jQuery("#edit-firstname").val(),
        lastname: jQuery("#edit-lastname").val(),
        email: jQuery("#edit-email").val()
    };

    jQuery.ajax({
        url: uri + "/" + jQuery("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (_result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    jQuery("#spoiler").css({ display: "none" });
}











