
$(function () {
    console.log('started');
    //Donate Amount Button

    $('.donate-amount-btn').click(function (e) {
        e.preventDefault();
        var item = $(this);
        var donateAmount = item.attr("data-value");
        $('#txtAmount').val(donateAmount);
        $('#other-amount-btn').val('');
        loadDonateAmount();
    })

    $('#other-amount-btn').focus(function (e) {
        $('#txtAmount').val($('#other-amount-btn').val());       
        loadDonateAmount();
    })

    $('#other-amount-btn').keyup(function (e) {
        $('#txtAmount').val($('#other-amount-btn').val());
        loadDonateAmount();
    });

    //Monthly give option
    $('.dnt-monthly-btn').click(function (e) {
        e.preventDefault();
        var item = $(this);
        var monthly = item.attr("data-value");
        $('#chkIsMonthlyGiveTrue').val(monthly);
    });

    $('.product-btn').click(function (e) {
        e.preventDefault();
        var item = $(this);
        var productId = item.attr("data-value");
        var productText = item.attr("data-text");
        $('#txtPaymentDescription').val(productId);
        $('#donate-cat').html(productText);
    });

    $('.product-btn').keyup(function (e) {
        e.preventDefault();
        var item = $(this);
        var productId = item.attr("data-value");
        var productText = item.attr("data-text");
        $('#txtPaymentDescription').val(productId);
        $('#donate-cat').html(productText);
    });

    $('.product-btn').focus(function (e) {
        e.preventDefault();
        var item = $(this);
        var productId = item.attr("data-value");
        var productText = item.attr("data-text");
        $('#txtPaymentDescription').val(productId);
        $('#donate-cat').html(productText);
    });

    var productText = $('.product-btn.active').attr('data-text');
    var productValue = $('.product-btn.active').attr('data-value');
    $('#txtPaymentDescription').val(productValue);
    $('#donate-cat').html(productText);


    var amountBtn = $('.donate-amount-btn.active').attr('data-value');
    $('#txtAmount').val(amountBtn);
    $('#amount-in-modal').html('$' + amountBtn);
    $('.row-value').html('$' + amountBtn);

});

$('#donate-fee-cover').click(function () {
    loadDonateAmount();
});

function loadDonateAmount() {
    var updatedAmount = 0;

    if ($('#donate-fee-cover').prop("checked") == true) {
        var amount = $('#txtAmount').val();
        $('#amountProcessingFee').val(0);
        //Modal
        //  var coverFee = $('#coverFee').val();
        var fee = amount * 0.025;
        $('#amountProcessingFee').val(fee);
        updatedAmount = parseFloat(amount) + parseFloat(fee);
        updatedAmount = updatedAmount.toFixed(2);
        $('#txtAmount').val(updatedAmount);
        $('#final-amount').html('$' + updatedAmount);
        $('.row-value').html('$' + updatedAmount);
    }
    else if ($('#donate-fee-cover').prop("checked") == false) {
        var processingFee = $('#amountProcessingFee').val();
        var amount = $('#txtAmount').val();

        updatedAmount = parseFloat(amount) - parseFloat(processingFee);

        $('#txtAmount').val(updatedAmount);
        $('#amountProcessingFee').val(0);
        $('#final-amount').html('$' + updatedAmount);
        $('.row-value').html('$' + updatedAmount);
    }
    else {
    //    updatedAmount = $('#txtAmount').val();


        //$('#amount-in-modal').html('$' + updatedAmount);
        //$('.row-value').html('$' + updatedAmount);
    }
}



