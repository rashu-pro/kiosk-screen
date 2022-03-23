/**
 * Created by Rashu on 22-02-22.
 */

$(function () {
    let mainBody = $('.main-body'),
        mainBodyMain = $('.main-body-main'),
        mainBodyWrapper = $('.main-body-wrapper'),
        body = $('body'),
        boxBig = $('.box-height-big'),
        header = $('.header'),
        footer = $('.footer'),
        otherInputWrapperField = $('.other-input-wrapper .form-control'),
        otherInputWrapper = $('.other-input-wrapper'),
        productWrapperBtn = $('.product-options-wrapper button'),
        formSection = $('.form-section'),
        donationDetails_FormSection = $('.donation-details .form-section'),
        inputWrapFormControl = $('.input-wrap .form-control'),
        btnNext = $('.btn-next-js'),
        btnBack = $('.btn-back-js'),
        btnEdit = $('.btn-edit'),
        creditCardDetails = $('.cc-details'),
        donationDetails = $('.donation-details'),
        productDetails = $('.product-selection'),
        swipeCardImage = $('.swipe-card-image'),
        creditCardField = $('.cc-card-field'),
        creditCardValueHolder = $('.cc-value-holder'),
        expiryMonthField = $('.exp-month-field'),
        expYearField = $('.exp-year-field'),
        zipCodeField = $('.zipcode-field'),
        nameOnCardField = $('.name-on-card'),
        cvvField = $('.cvv-field'),
        thankWrapper = $('.thank-wrapper'),
        btnExecuteDonation = $('.btn-donate-flow-complete-js'),
        confirmModalSelector = $("#confirm-modal"),
        confirmModalYes = $("#modal-btn-yes"),
        confirmModalNo = $("#modal-btn-no"),
        popupCloseBtn = $('.popup-close-js'),
        //----VARIABLE FOR MAIN BODY HEIGHT CALCULATION
        headerHeight = header.height(),
        footerHeight = footer.height(),
        headFootHeight = headerHeight + footerHeight,
        headFootHeightPx = (headFootHeight + 60)+'px',
        viewPortHeight = $(window).outerHeight() - headFootHeight,
        contentHeight = mainBodyWrapper.outerHeight(),
        windowHeight = $(window).height(),
        windowWidth = $(window).width(),
        reloadTime = 120000,
        scheduleRedirect = false;
    if(parseInt(windowHeight)>899){
        headFootHeightPx = (headFootHeight + 160)+'px';
    }else if(parseInt(windowHeight)>590){
        headFootHeightPx = (headFootHeight + 80)+'px';
    }
    let mainWrapperHeight = "auto";
    if(parseInt(windowWidth)>576 && parseInt(windowHeight)>520){
        console.log(headFootHeightPx);
        mainWrapperHeight = "calc(100vh - "+headFootHeightPx+")";
    }

    //*********** VARIABLE DECLERATION END ************

    //======= MAIN BODY HEIGHT CALCULATION FUNCTION  CALL
    wrapperHeight();
    //======= AFTER FULL CONTENT LOAD
    $(window).on('load',function () {
        fitSize();
        // timerFunction();
    });

    //======= ON WINDOW RESIZE
    $(window).on('resize',function () {
        fitSize();
        wrapperHeight();
    });


    $('.donation-frequency button, .donation-amount-options-wrapper button').on('click',function () {
        clearTimeout(scheduleRedirect);
        timerFunction();

        let self = $(this);
        self.parent().find('button').removeClass('active');
        self.addClass('active');

        if(self.parent().hasClass('donation-amount-options-wrapper')){
            if(self.parent().next().find('.input-field-group-prepend').hasClass('focused')){
                self.parent().next().find('.input-field-group-prepend').removeClass('focused');
                self.parent().next().find('.form-control').val('');
            }
        }
    });

    productWrapperBtn.on('click',function () {
        clearTimeout(scheduleRedirect);
        timerFunction();

        let self = $(this);
        self.parent().parent().find('button').removeClass('active');
        self.addClass('active');
    });

    //======= OTHER AMOUNT FIELD ACTION
    otherInputWrapperField.on('focus',function () {
        clearTimeout(scheduleRedirect);
        timerFunction();

        let self = $(this);
        self.closest('.other-input-wrapper').prev().find('.amount-btn').removeClass('active');
        self.parent().find('.input-field-group-prepend').addClass('focused');
    });

    otherInputWrapperField.on('blur',function () {
        clearTimeout(scheduleRedirect);
        timerFunction();

        let self = $(this);
        if(self.val()===''){
            self.parent().find('.input-field-group-prepend').removeClass('focused');
        }

    });

    //======= BUTTON NEXT ACTION
    btnNext.on('click',function (e) {
        e.preventDefault();
        clearTimeout(scheduleRedirect);
        timerFunction();
        let self = $(this);

        //=== AMOUNT FIELD VALIDATION ON NEXT BUTTON CLICK
        if (self.closest('.donation-details').css('display') == 'block') {
            let amount = $('#txtAmount').val();
            console.log(amount);
            if (amount == '') {
                $('#amount-validation-message').html('Please select or enter an Amount');
                $('#other-amount-btn').focus();
                return;
            } else if (amount == 'NaN') {
                $('#amount-validation-message').html('Please select or enter an Amount');
                $('#other-amount-btn').focus();
                return;
            } else if (parseInt(amount) <= 0) {
                $('#amount-validation-message').html('Amount cannot be 0, please select or enter an Amount');
                $('#other-amount-btn').focus();
                return;
            } else {
                $('#amount-validation-message').hide();
                showLoader(self);
            }
        }

        //==EMAIL VALIDATION ON NEXT BUTTON CLICK
        if (self.closest('.product-selection').css('display') == 'block') {
            if ($('#show-email').prop("checked") === true) {
                let mail = $('#txtEmailAddress').val();
                if (mail == '') {
                    $('#txtEmailAddress').focus();
                    $('#email-validation-message').html('Please enter a valid email address.');
                    return;
                } else if (mail != '') {
                    let isValid = validateMail(mail);
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
            } else {
                showLoader(self);
            }
        } else {
            showLoader(self);
        }

    });

    //======= BUTTON PREVIOUS ACTION
    btnBack.on('click',function (event) {
        event.preventDefault();
        clearTimeout(scheduleRedirect);
        timerFunction();
        let self = $(this);
        if(self.hasClass('btn-prev-page')){
            prevPage();
        }else{
            self.closest('.main-body-main-wrapper').hide();
            self.closest('.main-body-main-wrapper').prev().show();
        }
    });

    //======= EDIT BUTTON ACTION
    btnEdit.click(function (e) {
        e.preventDefault();
        clearTimeout(scheduleRedirect);
        timerFunction();
        popupClose($(this));
        creditCardDetails.hide();
        productDetails.show();
    });

    //======= SWIPER MODAL CLOSE BUTTON CLICK ACTION
    popupCloseBtn.on('click',function () {
        clearTimeout(scheduleRedirect);
        timerFunction();
        popupClose($(this));
    });

    //======= SHOW EMAIL FIELD ON CHECKBOX CHANGE
    $('#show-email').on('change', function () {
        showMailField();
    });


    //********* CARD VALIDATION FUNCTION CALL *********
    //======= ON CREDIT CARD FIELD FOCUS
    $(document).on('focus','.cc-card-field',function (e) {
        card_validation();
    });

    creditCardField.on('keypress',function (e) {
        card_validation();
    });

    creditCardField.on('blur',function (e) {
        card_validation();
    });

    //======= ZIP CODE VALIDATION
    zipCodeField.on('keypress',function (e) {
        let self = $(this);
        if(zipCodeValidation(self.val()) && self.val().length>4 ){
            zipCodeField.removeClass('invalid');
            self.closest('.input-wrap').find('.warning-message').hide();
            return e.preventDefault();
        }
    });

    zipCodeField.on('blur',function (e) {
        let self = $(this);
        if(!zipCodeValidation(self.val())){
            zipCodeField.addClass('invalid');
            self.closest('.input-wrap').find('.warning-message').show();
        }else{
            zipCodeField.removeClass('invalid');
            self.closest('.input-wrap').find('.warning-message').hide();
        }
    });

    //======= NAME ON CARD VALIDATION
    nameOnCardField.on('keypress',function (e) {
        let self = $(this);
        if(nameOnCardValidation(self.val())){
            nameOnCardField.removeClass('invalid');
            self.closest('.input-wrap').find('.warning-message').hide();
        }
    });

    nameOnCardField.on('blur',function (e) {
        let self = $(this);
        if(!nameOnCardValidation(self.val())){
            self.addClass('invalid');
            self.closest('.input-wrap').find('.warning-message').show();
        }else{
            self.removeClass('invalid');
            self.closest('.input-wrap').find('.warning-message').hide();
        }
    });

    //======= EXPIRY MONTH VALIDATION
    expiryMonthField.on('change',function (e) {
        let self = $(this);
        if(self.val()==0){
            self.addClass('invalid');
            self.closest('.input-wrap').find('.warning-message').show();
        }else{
            self.removeClass('invalid');
            self.closest('.input-wrap').find('.warning-message').hide();
        }
    });

    //======= EXPIRY YEAR VALIDATION
    expYearField.on('change',function (e) {
        let self = $(this);
        if(self.val()==0){
            self.addClass('invalid');
            self.closest('.input-wrap').find('.warning-message').show();
        }else{
            self.removeClass('invalid');
            self.closest('.input-wrap').find('.warning-message').hide();
        }
    });


    if(creditCardDetails.css('style')==='block'){
        card_validation();
    }


    //=========== DONATE BUTTON CLICK ACTION
    btnExecuteDonation.on('click',function (e) {
        e.preventDefault();
        clearTimeout(scheduleRedirect);
        timerFunction();
        card_validation();
        if(expiryMonthField.val()==0){
            expiryMonthField.addClass('invalid');
            expiryMonthField.closest('.input-wrap').find('.warning-message').show();
        }else{
            expiryMonthField.removeClass('invalid');
            expiryMonthField.closest('.input-wrap').find('.warning-message').hide();
        }
        if(expYearField.val()==0){
            expYearField.addClass('invalid');
            expYearField.closest('.input-wrap').find('.warning-message').show();
        }else{
            expYearField.removeClass('invalid');
            expYearField.closest('.input-wrap').find('.warning-message').hide();
        }
        if(nameOnCardField.val()==''){
            nameOnCardField.addClass('invalid');
            nameOnCardField.closest('.input-wrap').find('.warning-message').show();
        }else{
            nameOnCardField.removeClass('invalid');
            nameOnCardField.closest('.input-wrap').find('.warning-message').hide();
        }
        if(!zipCodeValidation(zipCodeField.val())){
            zipCodeField.addClass('invalid');
            zipCodeField.closest('.input-wrap').find('.warning-message').show();
        }else{
            zipCodeField.removeClass('invalid');
            zipCodeField.closest('.input-wrap').find('.warning-message').hide();
        }
        if (document.querySelectorAll('.invalid').length) {
            // J.addClass(validation, 'failed');
        } else {
            confirmModalSelector.modal('show');
        }
    });

    //************** ALL CUSTOM FUNCTIONS ****************

    //======= REDIRECT TO HOMESCREEN AFTER EACH 2 MINUTES
    function timerFunction(){
        scheduleRedirect = setTimeout(function () {
            history.back();
        },reloadTime);
    }
    //======= MAIN BODY HEIGHT CALCULATION
    function wrapperHeight(){
        console.log('content height:'+contentHeight);
        console.log('viewport:'+(viewPortHeight - 110));
        console.log('window height: ' + $(window).height());
        mainBodyMain.height(mainWrapperHeight);
        if(contentHeight<viewPortHeight){
            mainBodyMain.height(mainWrapperHeight);
        }
    }
    //======= CONTENT FITTING IN SPECIFIC DISPLAY
    function fitSize(){
        let mainBodyCard = mainBodyMain;
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
        }else if(parseInt(windowHeight)>900 && parseInt(windowWidth)>1024){
            fontSize = '26px';
            boxHeightBig = '80px';
            wrapperPaddingTop = '0px';
            wrapperPaddingLeft = '60px';
            mainWrapperPaddingTop = '35px';
            mainWrapperPaddingLeft = '60px';
            otherInputWrapperPaddingTop = '35px';
            donationDetils_FormSectionPaddingBottom = '50px';
            inputWrapFormControlHeight = '65';
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
    //======= PREVIOUS PAGE
    function prevPage(){
        history.back();
    }
    //======= CLOSING SWIPER POPUP
    function swiper_popup_close(){

        if($('.popup-wrapper').hasClass('active')){
            $('.swipe-card-image').hide();
            $('.circle-loader').addClass('active');
            setTimeout(function () {
                $('.circle-loader').toggleClass('load-complete');
                $('.checkmark').toggle();

                if(creditCardField.val()==''){
                    creditCardField.addClass('invalid');
                    creditCardField.closest('.input-wrap').find('.warning-message').show();
                }else{
                    creditCardField.removeClass('invalid');
                    creditCardField.closest('.input-wrap').find('.warning-message').hide();
                }

                if(expiryMonthField.val()==0){
                    expiryMonthField.addClass('invalid');
                    expiryMonthField.closest('.input-wrap').find('.warning-message').show();
                }else{
                    expiryMonthField.removeClass('invalid');
                    expiryMonthField.closest('.input-wrap').find('.warning-message').hide();
                }
                if(expYearField.val()==0){
                    expYearField.addClass('invalid');
                    expYearField.closest('.input-wrap').find('.warning-message').show();
                }else{
                    expYearField.removeClass('invalid');
                    expYearField.closest('.input-wrap').find('.warning-message').hide();
                }
                if(nameOnCardField.val()==''){
                    nameOnCardField.addClass('invalid');
                    nameOnCardField.closest('.input-wrap').find('.warning-message').show();
                }else{
                    nameOnCardField.removeClass('invalid');
                    nameOnCardField.closest('.input-wrap').find('.warning-message').hide();
                }
                if(!zipCodeValidation(zipCodeField.val())){
                    zipCodeField.addClass('invalid');
                    zipCodeField.closest('.input-wrap').find('.warning-message').show();
                }else{
                    zipCodeField.removeClass('invalid');
                    zipCodeField.closest('.input-wrap').find('.warning-message').hide();
                }
            },800);

            setTimeout(function () {
                $('.popup-wrapper').removeClass('active');
                console.log('before-focus');
                btnExecuteDonation.trigger('focus');
            },2000);
        }

    }
    //======= CLOSING SWIPER MODAL WHEN CANCEL BUTTON CLICKED
    function popupClose(elementToHide){
        let self = $(elementToHide);
        self.closest('.popup-wrapper').removeClass('active');
        // creditCardField.trigger('focus');
    }
    //======= CREDIT CARD DATA VALIDATION
    let J = Payment.J;
    function card_validation(){
        let number = document.querySelector('.cc-card-field');
        Payment.formatCardNumber(number);
        J.toggleClass(document.querySelectorAll('input'), 'invalid');
        let cardType = Payment.fns.cardType(J.val(number));
        // J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
        if(Payment.fns.validateCardNumber(J.val(number))){
            creditCardField.removeClass('invalid');
            creditCardField.addClass('valid');
            creditCardField.closest('.input-wrap').find('.warning-message').hide();
        }else{
            creditCardField.addClass('invalid');
            creditCardField.removeClass('valid');
            creditCardField.closest('.input-wrap').find('.warning-message').show();
        }
    }
    //======= SHOW MAIL FIELD ON CHECKED
    function showMailField() {

        if ($('#show-email').prop("checked") == true) {
            $('.email-address').show();
        }

        if ($('#show-email').prop("checked") == false) {
            $('.email-address').hide();
        }

    }
    //======= EMAIL VALIDATION
    function validateMail(email) {
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        if (!pattern.test(email)) {
            $('#email-validation-message').html('Email is not valid. Please enter a valid email address.');
            return false;
        } else {
            return true;
        }
    }
    //======= SHOW LOADER
    function showLoader(self) {
        $('.loader-div').addClass('active');
        self.closest('.main-body').addClass('popup-active');
        setTimeout(function () {
            $('.loader-div').removeClass('active');
            self.closest('.main-body').removeClass('popup-active');
            self.closest('.main-body-main-wrapper').hide();
            self.closest('.main-body-main-wrapper').next().show();
            if(self.closest('.main-body-main-wrapper').next().hasClass('cc-details') && creditCardField.val()==='' && expiryMonthField.val()==='0' && expYearField.val()==='0'){
                self.closest('.main-body').removeClass('popup-active');
                $('.popup-wrapper').addClass('active');
            }

        }, 500);
    }
    //======= ZIP CODE VALIDATION
    function zipCodeValidation(code) {
        let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
        return isValidZip;
    }

    function nameOnCardValidation(name) {
        let isValidName = /[-a-zA-Z' ]{6,26}/g.test(name);
        return isValidName;
    }


    //======= SWIPER CARD IMAGE CLICK ACTION
    swipeCardImage.click(function(){
        // swipePopupClose($(this));

        let cardNumber = '4026000000000002',
            cardHolderName = 'Jhon Doe',
            expMonth = '03',
            expYear = '2024',
            zipCode = '54822';

        creditCardField.val(cardNumber);
        expiryMonthField.val(expMonth);
        expYearField.val(expYear);
        zipCodeField.val(zipCode);
        nameOnCardField.val(cardHolderName);
        swiper_popup_close();
        $('.cc-card-field').trigger('focus');
    });

});