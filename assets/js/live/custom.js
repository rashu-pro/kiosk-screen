/**
 * Created by Rashu on 22-02-22.
 */

$(function () {

    $('.btn-edit').click(function (e) {
        e.preventDefault();
        popupClose($(this));
        $('.cc-details').hide();
        $('.product-selection').show();
    });

    $('.donation-frequency button, .donation-amount-options-wrapper button').on('click', function () {
        var self = $(this);
        self.parent().find('button').removeClass('active');
        self.addClass('active');

        if (self.parent().hasClass('donation-amount-options-wrapper')) {
            if (self.parent().next().find('.input-field-group-prepend').hasClass('focused')) {
                self.parent().next().find('.input-field-group-prepend').removeClass('focused');
                self.parent().next().find('.form-control').val('');
            }
        }
    });

    $('.product-options-wrapper button').on('click', function () {
        var self = $(this);
        self.parent().parent().find('button').removeClass('active');
        self.addClass('active');
    });

    $('.other-input-wrapper .form-control').on('focus', function () {
        var self = $(this);
        self.closest('.other-input-wrapper').prev().find('.amount-btn').removeClass('active');
        self.parent().find('.input-field-group-prepend').addClass('focused');
    });

    $('.other-input-wrapper .form-control').on('blur', function () {
        var self = $(this);
        if (self.val() == '') {
            self.parent().find('.input-field-group-prepend').removeClass('focused');
        }

    });


    $('.btn-next-js').on('click', function (e) {
        var self = $(this);
        clearTimeout(scheduleRedirect);
        timerFunction();

        //donation-details
        if (self.closest('.donation-details').css('display') == 'block') {
            e.preventDefault();
            var amount = $('#txtAmount').val();
            console.log(amount);
            if (amount == '') {
                $('#amount-validation-message').html('Please select or enter an Amount');
                $('#other-amount-btn').focus();
                return;
            } else if (amount == 'NaN') {
                $('#amount-validation-message').html('Please select or enter an Amount');
                $('#other-amount-btn').focus();
                return;
            }
            else if (parseInt(amount) <= 0) {
                $('#amount-validation-message').html('Amount cannot be 0, please select or enter an Amount');
                $('#other-amount-btn').focus();
                return;
            }
            else {
                showLoader(self);
                $('#amount-validation-message').hide();
            }
        }

        if (self.closest('.product-selection').css('display') == 'block') {
            e.preventDefault();
            if ($('#show-email').prop("checked") == true) {
                console.log('enterd');
                var mail = $('#txtEmailAddress').val();
                if (mail == '') {
                    $('#txtEmailAddress').focus();
                    return;
                } else if (mail != '') {
                    var isValid = validateMail(mail);
                    if (isValid) {
                        showLoader(self);
                    }
                    else {
                        $('#email-validation-message').html('Email is not valid. Please enter a valid email address.');
                        return;
                    }
                }
                else {
                    showLoader(self);
                    $('#email-validation-message').hide();
                }
            }
            else {
                showLoader(self);
            }
        } else {
            showLoader(self);
        }
    });

    function validateMail(email) {
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        if (!pattern.test(email)) {
            $('#email-validation-message').html('Email is not valid. Please enter a valid email address.');
            return false;
        } else {
            return true;
        }
    }


    function showLoader(self) {
        $('.loader-div').addClass('active');
        self.closest('.main-body').addClass('popup-active');
        setTimeout(function () {
            $('.loader-div').removeClass('active');
            self.closest('.main-body').removeClass('popup-active');
            self.closest('.main-body-main-wrapper').hide();
            self.closest('.main-body-main-wrapper').next().show();
            // self.closest('.main-body').addClass('popup-active');
            // $('.popup-wrapper').addClass('active');
        }, 500);



        if (self.closest('.main-body-main-wrapper').hasClass('donation-details')) {
            self.closest('.main-body').addClass('popup-active');
            if (!$('.popup-wrapper').hasClass('active')) {
                var cardFieldValue = $('.cc-card-field').val(),
                    expMonth = $('.exp-month-field').val(),
                    expYear = $('.exp-year-field').val();
                if (cardFieldValue == '' && expMonth == 0 && expYear == 0) {
                    $('.popup-wrapper').addClass('active');
                }

            }
        }
    }

    // wrapper height
    var headerHeight = $('.header').height(),
        footerHeight = $('.footer').height(),
        headFootHeight = headerHeight + footerHeight,
        headFootHeightPx = (headFootHeight + 60) + 'px',
        viewPortHeight = $(window).outerHeight() - headFootHeight,
        contentHeight = $('.main-body-wrapper').outerHeight(),
        windowHeight = $(window).height();
    if (parseInt(windowHeight) > 590) {
        headFootHeightPx = (headFootHeight + 80) + 'px';
    }

    mainWrapperHeight = "calc(100vh - " + headFootHeightPx + ")";

    function wrapperHeight() {
        console.log('content height:' + contentHeight);
        console.log('viewport:' + (viewPortHeight - 110));
        console.log('window height: ' + $(window).height());
        $('.main-body-main').height(mainWrapperHeight);
        if (contentHeight < viewPortHeight) {
            $('.main-body-main').height(mainWrapperHeight);
        }
    }
    wrapperHeight();
    $(document).focus(function () {
        wrapperHeight();
    });

    let windowWidth = $(window).width();
    if(parseInt(windowHeight)>899){
        headFootHeightPx = (headFootHeight + 160)+'px';
    }else if(parseInt(windowHeight)>590){
        headFootHeightPx = (headFootHeight + 80)+'px';
    }
    let mainWrapperHeight = "auto",
        formSection = $('.form-section');

    if(parseInt(windowWidth)>576 && parseInt(windowHeight)>520){
        console.log(headFootHeightPx);
        mainWrapperHeight = "calc(100vh - "+headFootHeightPx+")";
    }

    // content fitting in specific display
    function fitSize() {
        var body = $('body'),
            boxBig = $('.box-height-big'),
            mainBodyWrapper = $('.main-body-wrapper'),
            otherInputWrapper = $('.other-input-wrapper'),
            mainBodyCard = $('.main-body-main'),
            donationDetails_FormSection = $('.donation-details .form-section'),
            inputWrapFormControl = $('.input-wrap .form-control');
        // let mainBodyCard = mainBodyMain;
        let fontSize = '20px',
            boxHeightBig = '60px',
            wrapperPaddingTop = '0px',
            wrapperPaddingLeft = '15px',
            mainWrapperPaddingTop = '15px',
            mainWrapperPaddingLeft = '30px',
            otherInputWrapperPaddingTop = '30px',
            donationDetils_FormSectionPaddingBottom = '30px',
            inputWrapFormControlHeight = '50px';

        if(parseInt(windowHeight)>750 && parseInt(windowWidth)<576){
            boxHeightBig = '60px';
            mainWrapperPaddingTop = '20px';
            donationDetils_FormSectionPaddingBottom = '30px';
            mainWrapperPaddingLeft = '15px';
            otherInputWrapperPaddingTop = '15px';
            inputWrapFormControlHeight = '50';
            inputWrapFormControl.parent().addClass('big-cc-field');
        }else if(parseInt(windowHeight)>900 && parseInt(windowWidth)>576){
            fontSize = '26px';
            boxHeightBig = '80px';
            wrapperPaddingTop = '0px';
            wrapperPaddingLeft = '40px';
            mainWrapperPaddingTop = '35px';
            mainWrapperPaddingLeft = '40px';
            otherInputWrapperPaddingTop = '35px';
            donationDetils_FormSectionPaddingBottom = '40px';
            inputWrapFormControlHeight = '65';
            inputWrapFormControl.parent().addClass('big-cc-field');
        }else if(parseInt(windowHeight)>750 && parseInt(windowWidth)>576){
            fontSize = '26px';
            boxHeightBig = '80px';
            wrapperPaddingTop = '0px';
            wrapperPaddingLeft = '15px';
            mainWrapperPaddingTop = '20px';
            mainWrapperPaddingLeft = '20px';
            otherInputWrapperPaddingTop = '25px';
            donationDetils_FormSectionPaddingBottom = '30px';
            inputWrapFormControlHeight = '60px';
            inputWrapFormControl.parent().addClass('big-cc-field');
        }else if(parseInt(windowHeight)>590 && parseInt(windowWidth)>576){
            fontSize = '20px';
            boxHeightBig = '60px';
            wrapperPaddingTop = '0px';
            wrapperPaddingLeft = '15px';
            mainWrapperPaddingTop = '15px';
            mainWrapperPaddingLeft = '20px';
            otherInputWrapperPaddingTop = '20px';
            donationDetils_FormSectionPaddingBottom = '20px';
            inputWrapFormControlHeight = '50px';
        }else if(windowHeight>499){
            fontSize = '16px';
            boxHeightBig = '50px';
            wrapperPaddingTop = '0px';
            wrapperPaddingLeft = '15px';
            mainWrapperPaddingTop = '12px';
            mainWrapperPaddingLeft = '20px';
            otherInputWrapperPaddingTop = '15px';
            donationDetils_FormSectionPaddingBottom = '15px';
            inputWrapFormControlHeight = '45px';

        }else{

        }
        body.css('font-size',fontSize);
        boxBig.css('height',boxHeightBig);
        mainBodyWrapper.css({
            'padding-top': wrapperPaddingTop,
            'padding-left': wrapperPaddingLeft,
            'padding-right': wrapperPaddingLeft,
            'padding-bottom': wrapperPaddingTop
        });

        mainBodyCard.css({
            'padding-top': mainWrapperPaddingTop,
            'padding-left': mainWrapperPaddingLeft,
            'padding-right': mainWrapperPaddingLeft
        });

        otherInputWrapper.css('padding-top', otherInputWrapperPaddingTop);

        donationDetails_FormSection.css('padding-bottom', donationDetils_FormSectionPaddingBottom);
        formSection.css('padding-bottom', donationDetils_FormSectionPaddingBottom);

        inputWrapFormControl.css('height', inputWrapFormControlHeight);
    }

    fitSize();

    $(window).on('resize', function () {
        fitSize();
    });
});

function swiper_popup_close() {

    if ($('.popup-wrapper').hasClass('active')) {
        $('.swipe-card-image').hide();
        $('.circle-loader').addClass('active');
        setTimeout(function () {
            $('.circle-loader').toggleClass('load-complete');
            $('.checkmark').toggle();
        }, 800);

        setTimeout(function () {
            $('.popup-wrapper').removeClass('active');
            $('.cvv-field').trigger('focus');
        }, 2000);
    }

}


function popupClose(elementToHide) {
    var self = $(elementToHide);
    self.closest('.popup-wrapper').removeClass('active');
    $('.cc-card-field').trigger('focus');
}

$('.popup-close-js').on('click', function () {
    popupClose($(this));
});

//======= REDIRECT TO HOMESCREEN AFTER EACH 2 MINUTES
var reloadTime = 120000,
    scheduleRedirect = false;
function timerFunction(){
    scheduleRedirect = setTimeout(function () {
        history.back();
    },reloadTime);
}

// credit card validation new
var expiryMonthField = $('.exp-month-field'),
    expYearField = $('.exp-year-field'),
    nameOnCardField = $('.name-on-card'),
    zipCodeField = $('#zipCodeField');
var J = Payment.J;
function card_validation() {
    // numeric = document.querySelector('[data-numeric]'),
    var number = document.querySelector('.cc-card-field');
        // exp = document.querySelector('.cc-exp'),
        // cvc = document.querySelector('.cvv-field');
    // validation = document.querySelector('.validation');
    // Payment.restrictNumeric(numeric);
    Payment.formatCardNumber(number);
    // Payment.formatCardExpiry(exp);
    // Payment.formatCardCVC(cvc);
    $('.btn-donate-flow-complete-js').on('click', function (e) {
        e.preventDefault();
        clearTimeout(scheduleRedirect);
        timerFunction();
        J.toggleClass(document.querySelectorAll('input'), 'invalid');
        // J.removeClass(validation, 'passed failed');
        var cardType = Payment.fns.cardType(J.val(number));
        J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
        // J.toggleClass(exp, 'invalid', !Payment.fns.validateCardExpiry(Payment.cardExpiryVal(exp)));
        // J.toggleClass(cvc, 'invalid', !Payment.fns.validateCardCVC(J.val(cvc), cardType));
        if(expiryMonthField.val()==0){
            expiryMonthField.addClass('invalid');
        }else{
            expiryMonthField.removeClass('invalid');
        }
        if(expYearField.val()==0){
            expYearField.addClass('invalid');
        }else{
            expYearField.removeClass('invalid');
        }
        if(nameOnCardField.val()==''){
            nameOnCardField.addClass('invalid');
        }else{
            nameOnCardField.removeClass('invalid');
        }
        if(zipCodeField.val()=='' || zipCodeField.val().length<4){
            zipCodeField.addClass('invalid');
        }else{
            zipCodeField.removeClass('invalid');
        }
        if (document.querySelectorAll('.invalid').length) {
            // J.addClass(validation, 'failed');
        } else {
            $("#confirm-modal").modal('show');
        }
    });
}

$("#modal-btn-yes").on("click", function (e) {
    e.preventDefault();
    clearTimeout(scheduleRedirect);
    timerFunction();
    $("#confirm-modal").modal('hide');
});

$("#modal-btn-no").on("click", function (e) {
    e.preventDefault();
    clearTimeout(scheduleRedirect);
    timerFunction();
    $("#confirm-modal").modal('hide');
});

if ($('.cc-details').css('style') == 'block') {
    card_validation();
}


$(document).on('focus', '.cc-card-field', function (e) {
    card_validation();
});

$(document).on('change', '.cc-card-field', function (e) {
    card_validation();
});
//$('.cc-card-field').on('change', function () {
//    popupClose('.popup-wrapper');
//})



//======= BUTTON PREVIOUS ACTION
$('.btn-back-js').on('click', function (event) {
    event.preventDefault();
    clearTimeout(scheduleRedirect);
    timerFunction();
    let self = $(this);
    if (self.hasClass('btn-prev-page')) {
        prevPage();
    } else {
        self.closest('.main-body-main-wrapper').hide();
        self.closest('.main-body-main-wrapper').prev().show();
    }
});

function prevPage() {
    history.back();
}

$('#show-email').on('change', function () {
    showMailField();
});

function showMailField() {

    if ($('#show-email').prop("checked") == true) {
        $('.email-address').show();
    }

    if ($('#show-email').prop("checked") == false) {
        $('.email-address').hide();
    }

}