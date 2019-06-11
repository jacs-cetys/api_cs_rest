
const uri = "api/subjects";

let subjects = null;

function getCount(data) {
    const el = jQuery("#counter");
    let name = "Subject";

    if (data) {
        if (data > 1) {
            name = "Subjects";
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

            const tBody = jQuery("#subjects");

            jQuery(tBody).empty();

            getCount(data.length);

            jQuery.each(data, function (key, item) {

                console.log(JSON.stringify(item));

                const tr = jQuery("<tr></tr>")
                    .append(jQuery("<td></td>").text(item.name))
                    .append(jQuery("<td></td>").text(item.keycode))
                    .append(jQuery("<td></td>").text(item.classroom))
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

            subjects = data;
        }
    });
}

function addItem() {
    const item = {
        name: jQuery("#add-name").val(),
        keycode: jQuery("#add-keycode").val(),
        classroom: jQuery("#add-classroom").val()
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
            jQuery("#add-name").val("");
            jQuery("#add-keycode").val("");
            jQuery("#add-classroom").val("");
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
    jQuery.each(subjects, function (key, item) {
        if (item.id === id) {
            jQuery("#edit-id").val(item.id);
            jQuery("#edit-name").val(item.name);
            jQuery("#edit-keycode").val(item.keycode);
            jQuery("#edit-classroom").val(item.classroom);
        }
    });

    jQuery("#spoiler").css({ display: "block" });
}

jQuery(".my-form").on("submit", function () {
    const item = {
        id: jQuery("#edit-id").val(),
        name: jQuery("#edit-name").val(),
        keycode: jQuery("#edit-keycode").val(),
        classroom: jQuery("#edit-classroom").val()
    };

    jQuery.ajax({
        url: uri + "/" + jQuery("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    jQuery("#spoiler").css({ display: "none" });
}











