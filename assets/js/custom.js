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
        nameOnCardField = $('.name-on-card'),
        cvvField = $('.cvv-field'),
        zipCodeField = $('.zipcode-field'),
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
        let self = $(this);
        self.parent().parent().find('button').removeClass('active');
        self.addClass('active');
    });

    //======= OTHER AMOUNT FIELD ACTION
    otherInputWrapperField.on('focus',function () {
        let self = $(this);
        self.closest('.other-input-wrapper').prev().find('.amount-btn').removeClass('active');
        self.parent().find('.input-field-group-prepend').addClass('focused');
    });

    otherInputWrapperField.on('blur',function () {
        let self = $(this);
        if(self.val()===''){
            self.parent().find('.input-field-group-prepend').removeClass('focused');
        }

    });

    //======= BUTTON NEXT ACTION
    btnNext.on('click',function () {
        clearTimeout(scheduleRedirect);
        timerFunction();
        let self = $(this);
        
        $('.loader-div').addClass('active');
        self.closest('.main-body').addClass('popup-active');
        setTimeout(function () {
            $('.loader-div').removeClass('active');
            self.closest('.main-body').removeClass('popup-active');
            self.closest('.main-body-main-wrapper').hide();
            self.closest('.main-body-main-wrapper').next().show();
            // self.closest('.main-body').addClass('popup-active');
            // $('.popup-wrapper').addClass('active');
        },1000);

        if(self.closest('.main-body-main-wrapper').hasClass('donation-details')){
            self.closest('.main-body').addClass('popup-active');
            if(!$('.popup-wrapper').hasClass('active')){
                let cardFieldValue = $('.cc-card-field').val(),
                    cvvFieldValue = $('.cvv-field').val(),
                    expMonth = $('.exp-month-field').val(),
                    expYear = $('.exp-year-field').val();
                if(cardFieldValue == '' && cvvFieldValue == '' && expMonth == 0 && expYear == 0){
                    $('.popup-wrapper').addClass('active');
                }

            }
        }

    });

    //======= BUTTON PREVIOUS ACTION
    btnBack.on('click',function (event) {
        event.preventDefault();
        let self = $(this);
        if(self.hasClass('btn-prev-page')){
            prevPage();
        }else{
            self.closest('.main-body-main-wrapper').hide();
            self.closest('.main-body-main-wrapper').prev().show();
            clearTimeout(scheduleRedirect);
            timerFunction();
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

    //======= SWIPER CARD IMAGE CLICK ACTION
    swipeCardImage.click(function(){
        // swipePopupClose($(this));

        let cardNumber = '4026000000000002',
            cardHolderName = 'Jhon Doe',
            expMonth = '03',
            expYear = '2024';

        creditCardField.val(cardNumber);
        creditCardValueHolder.attr('data-value',cardNumber);
        expiryMonthField.val(expMonth);
        expYearField.val(expYear);
        nameOnCardField.val(cardHolderName);
        creditCardField.trigger('focus');
        swiper_popup_close();
    });

    //======= SWIPER MODAL CLOSE BUTTON CLICK ACTION
    popupCloseBtn.on('click',function () {
        clearTimeout(scheduleRedirect);
        timerFunction();
        popupClose($(this));
    });


    //********* CARD VALIDATION FUNCTION CALL *********
    //======= ON CREDIT CARD FIELD FOCUS
    $(document).on('focus','.cc-card-field',function (e) {
        card_validation();
    });
    if(creditCardDetails.css('style')==='block'){
        card_validation();
    }

    //======= CONFIRMATION MODAL FOR DONATION
    confirmModalYes.on("click", function(){
        clearTimeout(scheduleRedirect);
        timerFunction();
        confirmModalSelector.modal('hide');
        creditCardDetails.hide();
        thankWrapper.show();
    });

    confirmModalNo.on("click", function(){
        clearTimeout(scheduleRedirect);
        timerFunction();
        confirmModalSelector.modal('hide');
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
            },800);

            setTimeout(function () {
                $('.popup-wrapper').removeClass('active');
                $('.cvv-field').trigger('focus');
            },2000);
        }

    }

    //======= CLOSING SWIPER MODAL WHEN CANCEL BUTTON CLICKED
    function popupClose(elementToHide){
        let self = $(elementToHide);
        self.closest('.popup-wrapper').removeClass('active');
        creditCardField.trigger('focus');
    }
    //======= CREDIT CARD DATA VALIDATION
    let J = Payment.J;
    function card_validation(){
        let number = document.querySelector('.cc-card-field');
        Payment.formatCardNumber(number);
        btnExecuteDonation.on('click',function (e) {
            e.preventDefault();
            clearTimeout(scheduleRedirect);
            timerFunction();
            J.toggleClass(document.querySelectorAll('input'), 'invalid');
            let cardType = Payment.fns.cardType(J.val(number));
            J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
            console.log(cardType);
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
                confirmModalSelector.modal('show');
            }
        });
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

});