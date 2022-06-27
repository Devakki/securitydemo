$(function () {
    GVSubmitActor = {name: 'none', value: 'none'};

    //Loads the correct sidebar on window load,
    //collapses the sidebar on window resize.
    // Sets the min-height of #page-wrapper to window size
    $(function () {
        var url = window.location;
        var element = $('ul.nav a').filter(function () {
            return this.href == url;
        })/*.addClass('active')*/.parent();

        while (true) {
            if (element.is('li')) {
                //element = element.parent().addClass('active').parent();
                element = element.parent().addClass('show').parent();
            } else {
                break;
            }
        }
    });


    /**
     * single row remove functionality
     */
    $("body").on('click', '.fnConfirmRemove', function () {
        $(".cls-sgDatatable .start_checkboxes :checkbox").attr("checked", false);
        $('.cls-sgDatatable tr').removeClass('selected');
        $(this).closest("tr").trigger('click');
        $("#btn-bulk-delete").trigger('click');
    });

    /**
     * Allow numeric with decimal only.
     */
    $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    /**
     * confirm functionality for remove
     */
    $("body").on('click', '.fnUpdateStatus', function (e) {
        var jRemoveHref = $(this).attr('x-path');
        var jTitle = $(this).attr('title');
        e.preventDefault();

        jTitle = (jTitle == 'Make Active') ? 'Are you sure you want to active clicked item ?' : 'Are you sure you want to inactive clicked item ?';
        BootstrapDialog.confirm({
            title: 'Please confirm',
            message: jTitle,
            type: BootstrapDialog.TYPE_DANGER,
            btnCancelClass: 'btn-default',
            btnOKClass: 'btn-danger',
            btnCancelLabel: 'No',
            btnOKLabel: 'Yes',
            callback: function (result) {
                if (result) {
                    $.ajax({
                        type: 'GET',
                        url: jRemoveHref
                    }).done(function (data) {
                        location.reload();
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        $(".loading").hide();
                        BootstrapDialog.alert({
                            title: 'Error',
                            message: errorThrown,
                            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                            callback: function (result) {
                                // result will be true if button was click, while it will be false if users close the dialog directly.
                            }
                        });
                    }); // .ajax
                }
            } // .callback
        }); // .BootstrapDialog.confirm

    });

    // show Product dvd option

    $(".showIdProductOfDvd").change(function () {
        var productType = $(this).find(":selected").text();
        if (productType === 'DVD') {
            $(".showIdProductOfDvdSelect").removeClass('hide');
            $(".showIdProductOfDvdLabel").removeClass('hide');
        } else {
            $(".showIdProductOfDvdSelect").addClass('hide');
            $(".showIdProductOfDvdLabel").addClass('hide');
        }
    });
    $("#product_launch_addDvdProduct").change(function () {
        if ($(this).is(':checked')) {
            $("#product_launch_dvdProduct").removeClass('hide');
            $(".showIdProductOfDvdLabel").removeClass('hide');
        } else {
            $("#product_launch_dvdProduct").addClass('hide');
            $(".showIdProductOfDvdLabel").addClass('hide');
        }
    });

    if ($('#product_launch_addDvdProduct').is(':checked')) {
        $("#product_launch_dvdProduct").removeClass('hide');
        $(".showIdProductOfDvdLabel").removeClass('hide');
    }

    if ($('#product_launch_bannerType').find('option:selected').val() == '0') {
        $('#product_launch_videoId').parent('.form-group').hide();
        $('#product_launch_imageUrlFile_file').closest('.form-group').show();
    } else {
        $('#product_launch_imageUrlFile_file').closest('.form-group').hide();
        $('#product_launch_videoId').parent('.form-group').show();
    }

    $('#product_launch_bannerType').change(function () {
        if ($(this).find('option:selected').val() == '0') {
            $('#product_launch_videoId').parent('.form-group').hide();
            $('#product_launch_imageUrlFile_file').closest('.form-group').show();
        } else {
            $('#product_launch_imageUrlFile_file').closest('.form-group').hide();
            $('#product_launch_videoId').parent('.form-group').show();
        }
    });

    $('#product_launch_discountEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_discountPrice').closest('.form-group').show();
            $('#product_launch_discountText').closest('.form-group').show();
            $('#product_launch_discount').closest('.form-group').show();
        } else {
            $('#product_launch_discountPrice').closest('.form-group').hide();
            $('#product_launch_discount').closest('.form-group').hide();
            $('#product_launch_discountText').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_discountEnable').is(':checked')) {
        $('#product_launch_discountPrice').closest('.form-group').show();
        $('#product_launch_discountText').closest('.form-group').show();
        $('#product_launch_discount').closest('.form-group').show();
    } else {
        $('#product_launch_discountPrice').closest('.form-group').hide();
        $('#product_launch_discount').closest('.form-group').hide();
        $('#product_launch_discountText').closest('.form-group').hide();
    }
    $('#product_launch_firstJoinNowEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_joinNowButtonText1').closest('.form-group').show();
        } else {
            $('#product_launch_joinNowButtonText1').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_firstJoinNowEnable').is(':checked')) {
        $('#product_launch_joinNowButtonText1').closest('.form-group').show();
    } else {
        $('#product_launch_joinNowButtonText1').closest('.form-group').hide();
    }
    $('#product_launch_secondJoinNowEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_joinNowButtonText2').closest('.form-group').show();
        } else {
            $('#product_launch_joinNowButtonText2').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_secondJoinNowEnable').is(':checked')) {
        $('#product_launch_joinNowButtonText2').closest('.form-group').show();
    } else {
        $('#product_launch_joinNowButtonText2').closest('.form-group').hide();
    }
    $('#product_launch_needSubscription').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_subscriptionCheckboxText').closest('.form-group').show();
        } else {
            $('#product_launch_subscriptionCheckboxText').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_needSubscription').is(':checked')) {
        $('#product_launch_subscriptionCheckboxText').closest('.form-group').show();
    } else {
        $('#product_launch_subscriptionCheckboxText').closest('.form-group').hide();
    }
    $('#product_launch_productDescriptionEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_productDescription').closest('.form-group').show();
        } else {
            $('#product_launch_productDescription').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_productDescriptionEnable').is(':checked')) {
        $('#product_launch_productDescription').closest('.form-group').show();
    } else {
        $('#product_launch_productDescription').closest('.form-group').hide();
    }
    $('#product_launch_headlineEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_headlineTitle').closest('.form-group').show();
        } else {
            $('#product_launch_headlineTitle').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_headlineEnable').is(':checked')) {
        $('#product_launch_headlineTitle').closest('.form-group').show();
    } else {
        $('#product_launch_headlineTitle').closest('.form-group').hide();
    }
    $('#product_launch_isCounterEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_counterScriptUrl').closest('.form-group').show();
            $('#product_launch_counterScriptSmall').closest('.form-group').show();
            $('#product_launch_counterTitle').closest('.form-group').show();
        } else {
            $('#product_launch_counterScriptUrl').closest('.form-group').hide();
            $('#product_launch_counterScriptSmall').closest('.form-group').hide();
            $('#product_launch_counterTitle').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_isCounterEnable').is(':checked')) {
        $('#product_launch_counterScriptUrl').closest('.form-group').show();
        $('#product_launch_counterScriptSmall').closest('.form-group').show();
        $('#product_launch_counterTitle').closest('.form-group').show();
    } else {
        $('#product_launch_counterScriptUrl').closest('.form-group').hide();
        $('#product_launch_counterScriptSmall').closest('.form-group').hide();
        $('#product_launch_counterTitle').closest('.form-group').hide();
    }
    $('#product_launch_testimonialEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_testimonialTitle1').closest('.form-group').show();
            $('#product_launch_testimonialImage1File_file').closest('.form-group').show();
            $('#product_launch_testimonialDescription1').closest('.form-group').show();
            $('#product_launch_testimonialTitle2').closest('.form-group').show();
            $('#product_launch_testimonialImage2File_file').closest('.form-group').show();
            $('#product_launch_testimonialDescription2').closest('.form-group').show();
            $('#product_launch_testimonialTitle3').closest('.form-group').show();
            $('#product_launch_testimonialImage3File_file').closest('.form-group').show();
            $('#product_launch_testimonialDescription3').closest('.form-group').show();
        } else {
            $('#product_launch_testimonialTitle1').closest('.form-group').hide();
            $('#product_launch_testimonialImage1File_file').closest('.form-group').hide();
            $('#product_launch_testimonialDescription1').closest('.form-group').hide();
            $('#product_launch_testimonialTitle2').closest('.form-group').hide();
            $('#product_launch_testimonialImage2File_file').closest('.form-group').hide();
            $('#product_launch_testimonialDescription2').closest('.form-group').hide();
            $('#product_launch_testimonialTitle3').closest('.form-group').hide();
            $('#product_launch_testimonialImage3File_file').closest('.form-group').hide();
            $('#product_launch_testimonialDescription3').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_testimonialEnable').is(':checked')) {
        $('#product_launch_testimonialTitle1').closest('.form-group').show();
        $('#product_launch_testimonialImage1File_file').closest('.form-group').show();
        $('#product_launch_testimonialDescription1').closest('.form-group').show();
        $('#product_launch_testimonialTitle2').closest('.form-group').show();
        $('#product_launch_testimonialImage2File_file').closest('.form-group').show();
        $('#product_launch_testimonialDescription2').closest('.form-group').show();
        $('#product_launch_testimonialTitle3').closest('.form-group').show();
        $('#product_launch_testimonialImage3File_file').closest('.form-group').show();
        $('#product_launch_testimonialDescription3').closest('.form-group').show();
    } else {
        $('#product_launch_testimonialTitle1').closest('.form-group').hide();
        $('#product_launch_testimonialImage1File_file').closest('.form-group').hide();
        $('#product_launch_testimonialDescription1').closest('.form-group').hide();
        $('#product_launch_testimonialTitle2').closest('.form-group').hide();
        $('#product_launch_testimonialImage2File_file').closest('.form-group').hide();
        $('#product_launch_testimonialDescription2').closest('.form-group').hide();
        $('#product_launch_testimonialTitle3').closest('.form-group').hide();
        $('#product_launch_testimonialImage3File_file').closest('.form-group').hide();
        $('#product_launch_testimonialDescription3').closest('.form-group').hide();
    }
    $('#product_launch_afterTestimonialEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_afterTestimonialTitle').closest('.form-group').show();
            $('#product_launch_afterTestimonialDescription').closest('.form-group').show();
        } else {
            $('#product_launch_afterTestimonialTitle').closest('.form-group').hide();
            $('#product_launch_afterTestimonialDescription').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_afterTestimonialEnable').is(':checked')) {
        $('#product_launch_afterTestimonialTitle').closest('.form-group').show();
        $('#product_launch_afterTestimonialDescription').closest('.form-group').show();
    } else {
        $('#product_launch_afterTestimonialTitle').closest('.form-group').hide();
        $('#product_launch_afterTestimonialDescription').closest('.form-group').hide();
    }
    $('#product_launch_firstBoxEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_firstBoxTitle').closest('.form-group').show();
            $('#product_launch_firstBoxDescription').closest('.form-group').show();
        } else {
            $('#product_launch_firstBoxTitle').closest('.form-group').hide();
            $('#product_launch_firstBoxDescription').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_firstBoxEnable').is(':checked')) {
        $('#product_launch_firstBoxTitle').closest('.form-group').show();
        $('#product_launch_firstBoxDescription').closest('.form-group').show();
    } else {
        $('#product_launch_firstBoxTitle').closest('.form-group').hide();
        $('#product_launch_firstBoxDescription').closest('.form-group').hide();
    }
    $('#product_launch_secondBoxEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_secondBoxTitle').closest('.form-group').show();
            $('#product_launch_secondBoxDescription').closest('.form-group').show();
        } else {
            $('#product_launch_secondBoxTitle').closest('.form-group').hide();
            $('#product_launch_secondBoxDescription').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_secondBoxEnable').is(':checked')) {
        $('#product_launch_secondBoxTitle').closest('.form-group').show();
        $('#product_launch_secondBoxDescription').closest('.form-group').show();
    } else {
        $('#product_launch_secondBoxTitle').closest('.form-group').hide();
        $('#product_launch_secondBoxDescription').closest('.form-group').hide();
    }
    $('#product_launch_featureboxImageEnable').change(function () {
        if ($(this).is(':checked')) {
            $('#product_launch_featureboxTitle').closest('.form-group').show();
            $('#product_launch_featureboxImage1File_file').closest('.form-group').show();
            $('#product_launch_featureboxImage2File_file').closest('.form-group').show();
            $('#product_launch_featureboxImage3File_file').closest('.form-group').show();
            $('#product_launch_featureboxImage4File_file').closest('.form-group').show();
            $('#product_launch_featureboxImage5File_file').closest('.form-group').show();
        } else {
            $('#product_launch_featureboxTitle').closest('.form-group').hide();
            $('#product_launch_featureboxImage1File_file').closest('.form-group').hide();
            $('#product_launch_featureboxImage2File_file').closest('.form-group').hide();
            $('#product_launch_featureboxImage3File_file').closest('.form-group').hide();
            $('#product_launch_featureboxImage4File_file').closest('.form-group').hide();
            $('#product_launch_featureboxImage5File_file').closest('.form-group').hide();
        }
    });
    if ($('#product_launch_featureboxImageEnable').is(':checked')) {
        $('#product_launch_featureboxTitle').closest('.form-group').show();
        $('#product_launch_featureboxImage1File_file').closest('.form-group').show();
        $('#product_launch_featureboxImage2File_file').closest('.form-group').show();
        $('#product_launch_featureboxImage3File_file').closest('.form-group').show();
        $('#product_launch_featureboxImage4File_file').closest('.form-group').show();
        $('#product_launch_featureboxImage5File_file').closest('.form-group').show();
    } else {
        $('#product_launch_featureboxTitle').closest('.form-group').hide();
        $('#product_launch_featureboxImage1File_file').closest('.form-group').hide();
        $('#product_launch_featureboxImage2File_file').closest('.form-group').hide();
        $('#product_launch_featureboxImage3File_file').closest('.form-group').hide();
        $('#product_launch_featureboxImage4File_file').closest('.form-group').hide();
        $('#product_launch_featureboxImage5File_file').closest('.form-group').hide();
    }
    /*$('.js-datetimepicker').datetimepickerByGiro({
        style: 'popup',
        autoclose: true,
        uiTarget: false,
        firstDay: 1,
        minView: 'times',
        maxView: 'years',
        startView: 'days',
        min: null,
        max: null,
        today: 'now',
        showDaysNotInMonth: false,
        showDisabledTimes: false,
        calendars: 1,
        format: 'Y-m-d H:i:s',
        uiFormat: 'Y-m-d H:i:s',
        separator: ' | ',
        timeFormat: 24,
        minuteStep: 15,
    });*/

    //Common Date Picker
    $('.js-datePicker').datepicker({
        dateFormat: 'mm-dd-yy',
    });
    $('.js-datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        minDate: new Date(),
        defaultDate: new Date()
    });
    //Common Start Date end Date picker DatePicker
    $('.js-startDate').datepicker({
        dateFormat: 'mm-dd-yy',
        minDate: 0,
        onSelect: function (selected) {
            var dt = new Date(selected);
            dt.setDate(dt.getDate() + 1);
            $(".js-endDate").datepicker("option", "minDate", dt);
        }
    });

    $('.js-endDate').datepicker({
        dateFormat: 'mm-dd-yy',
        minDate: 0,
        onSelect: function (selected) {
            var dt = new Date(selected);
            dt.setDate(dt.getDate() - 1);
            $(".js-startDate").datepicker("option", "maxDate", dt);
        }
    });

    // only number validation
    $('.numbersOnly').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });

    initModalForms();

    if ($('#product_launch_idProduct').length > 0) {
        $('#product_launch_idProduct').select2({
            placeholder: '-- Select Related Product --'
        });
    }
    if ($('#product_recProducts').length > 0) {
        $('#product_recProducts').select2({
            placeholder: '-- Select Recommended Products --',
            allowClear: true
        });
    }
    if ($('#product_streamingPages').length > 0) {
        $('#product_streamingPages').select2({
            placeholder: '-- Select Free Streaming Codes --',
            allowClear: true
        });
    }
    if ($('#product_categories').length > 0) {
        $('#product_categories').select2({
            placeholder: '-- Select Cart Category --',
            allowClear: true
        });
    }
    if ($('#streaming_pages_product').length > 0) {
        $('#streaming_pages_product').select2({
            placeholder: '-- Select Products of Streaming Product --'
        });
    }
    if ($('#cloth_recProducts').length > 0) {
        $('#cloth_recProducts').select2({
            placeholder: '-- Select Recommended Products --',
            allowClear: true
        });
    }
    if ($('#cloth_idProductSize').length > 0) {
        $('#cloth_idProductSize').select2({
            placeholder: '-- Select Recommended Products --',
            allowClear: true
        });
    }
    if ($('#streaming_workout_idStreamingPage').length > 0) {
        $('#streaming_workout_idStreamingPage').select2({
            placeholder: '-- Select Streaming Page --'
        });
    }
    if ($('#subscription_plan_idStreamingPage').length > 0) {
        $('#subscription_plan_idStreamingPage').select2({
            placeholder: '-- Select Streaming Page CC-Code --',
            allowClear: true
        });
    }
    if ($('#settings_section').length > 0) {
        $('#settings_section').select2({
            tags: true,
        });
    }

    if ($('#subscription_package_packageName').length > 0) {
        $('#subscription_package_packageName').change(function () {
            $('#subscription_package_slug').val(ucWordRemoveSpaces($(this).val()));
        });
    }
}); // .function

function ucWordRemoveSpaces(originalText) {
    return originalText.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    }).split(" ").join("");
}

// ajax Quick Post
function quickAjax($url, $data, $func) {
    $.ajax({
        type: "POST",
        url: $url,
        data: $data,
        dataType: "json",
        success: function (data) {
            $func(data);
        },
        error: function () {
            alert('error handing here');
        }
    });
}

function initModalForms()
{
    $('[data-toggle="ajaxModal"]').on('click', function (e) {
        e.preventDefault();
        $("#ajaxModal").remove();
        $(".modal-backdrop").remove();

        var $this = $(this);
        $remote = $this.data('remote') || $this.attr('href');
        $modal = $('<div  class="modal" tabindex="-1" role="dialog" id="ajaxModal"><div class="modal-body"></div></div>');
        $('body').append($modal);
        $modal.modal({backdrop: 'static'});
        $modal.load($remote, function (result) {
            modal_form_submit_handler();
        });
        return false;
    });
    $.fn.modal.Constructor.prototype.enforceFocus = function () {
    };
}

function loadModalURLSendMail(obj)
{
    var $this = $(obj);
    $remote = $this.data('href') || $this.attr('href');
    swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#26a65b",
            confirmButtonText: "Yes, send mail!",
            closeOnConfirm: false
        },
        function () {
            swal({
                title: 'Sending Email!',
                text: 'Please wait...',
                //timer: 2000,
                imageUrl: '/admin/img/loading.gif',
                showCancelButton: false,
                showConfirmButton: false
            });
            $.ajax({
                url: $remote,
                type: "POST",
                success: function (result) {
                    swal("Sent!", "Notification successfully sent.", "success");
                },
                error: function (err) {
                    swal.close();
                    toastr["error"](err.statusText, "Error");
                }
            });
        }
    );
    return false;
}

function loadModalURL(obj) {
    $("#ajaxModal").remove();
    $(".modal-backdrop").remove();

    var $this = $(obj);
    $remote = $this.data('href') || $this.attr('href');
    $modal = $('<div  class="modal" tabindex="-1" role="dialog" id="ajaxModal"><div class="modal-body"></div></div>');
    $('body').append($modal);
    $modal.modal({backdrop: 'static'});
    $modal.load($remote, function (result) {
        modal_form_submit_handler();
    });
    return false;
}

function modalURL($url) {
    $("#ajaxModal").remove();
    $(".modal-backdrop").remove();

    $remote = $url;
    $modal = $('<div  class="modal" tabindex="-1" role="dialog" id="ajaxModal"><div class="modal-body"></div></div>');
    $('body').append($modal);
    $modal.modal({backdrop: 'static'});
    $modal.load($remote, function (result) {
        modal_form_submit_handler();
    });
    return false;
}

function modal_form_submit_handler() {

    $('[data-ride="ajaxModalForm"]').on("submit", function (event) {

        event.preventDefault();
        event.stopPropagation();

        $url = $(this).attr('action');
        $method = $(this).attr('method');
        //$data = $(this).serialize();
        $data = new FormData(this);
        $data.append(GVSubmitActor.name, GVSubmitActor.value);
        $(this).prop('disabled', 'disabled');
        //showLoader();
        $.ajax({
            type: $method, url: $url,
            data: $data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                //hideLoader();
                if (response.js != undefined) {
                    $('[data-dismiss="modal"]').click();
                    if (response.js != "") {
                        eval(response.js);
                    } else {
                        toastr["success"]("operation successful", "");
                    }
                }
                if (response.redirect) {
                    $('[data-dismiss="modal"]').click();
                    toastr["success"]("Redirecting..", "");
                    setTimeout(function () {
                        window.location.reload();
                    }, 250);


                }
                if (response.toast) {
                    $('[data-dismiss="modal"]').click();
                    toastr["success"](response.toast, "");
                    if (response.toastjs != "") {
                        eval(response.toastjs);
                    } else {
                        setTimeout(function () {
                            window.location = response.redirect;
                        }, 400);
                    }


                }
                if (response == "") {
                    $('[data-dismiss="modal"]').click();
                    toastr["success"]("operation successful .. refreshing", "");
                    setTimeout(function () {
                        window.location.reload();
                    }, 250);

                } else {
                    $("#ajaxModal").html(response);
                    modal_form_submit_handler();
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

                $(".modal-body").html(textStatus);
                $('[data-ride="ajaxModalForm"] .modal-footer').hide();
            }
        });

        return false;

    });

    $('[data-ride="ajaxModalForm"] [type="submit"]').click(function () {
        GVSubmitActor.name = this.name;
        GVSubmitActor.value = this.value;
//        $(this).text("Please Wait..");
//        $(this).prop('disabled', 'disabled');
//        $(this).parents('form').submit();
//
    });

    // ReMap Events Controls
    //uiManager(".modal ");

}
