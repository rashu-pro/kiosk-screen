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
        //---- VARIABLE FOR KEYBOARD
        numpadWrapper = $('.numpad-wrapper'),
        numpadNumberSelector = $('.numpad-number'),
        numpadOk = $('.numpad-ok'),
        numpadCancel = $('.numpad-cancel'),
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
        headFootHeightPx = (headFootHeight + 120)+'px';
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
        timerFunction();
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
                //self.parent().next().find('.form-control').val('');
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
                        $('#email-validation-message').html('');
                    }
                    else {
                        $('#email-validation-message').html('Email is not valid. Please enter a valid email address.');
                        return;
                    }
                }
                else {
                    showLoader(self);
                    $('#email-validation-message').html('');
                }
            } else {
                showLoader(self);
            }
        }

        //=== AMOUNT FIELD VALIDATION ON NEXT BUTTON CLICK
        if (self.closest('.donation-details').css('display') == 'block') {
            let amount = $('#txtAmount').val();
            //console.log(amount);

            if (amount == '') {
                $('#amount-validation-message').html('Please select or enter an Amount');
                $('#other-amount-btn').focus();
                return;
            } else if (amount == 'NaN') {
                $('#amount-validation-message').html('Please select or enter an Amount');
                $('#other-amount-btn').focus();
                return;
            } else {
                if (parseInt(amount) <= 0) {
                    $('#amount-validation-message').html('Amount cannot be 0, please select or enter an Amount');
                    $('#other-amount-btn').focus();
                    return;
                } else {
                    $('#amount-validation-message').hide();

                    var updatedAmount = $('#txtAmount').val();
                    // $('.amount-in-modal').text($('#txtAmount').val());


                    $('#amount-in-modal').html('$' + updatedAmount);
                    $('.row-value').html('$' + updatedAmount);
                    showLoader(self);
                }

            }
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
            if ($('.cc-details').css('display') == 'block') {
                creditCardField.val('');
                expYearField.val(0);
                expiryMonthField.val(0);
                zipCodeField.val('');
                nameOnCardField.val('');
            }
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
        clearTimeout(scheduleRedirect);
        timerFunction();
        showMailField();
    });


    //********* CARD VALIDATION FUNCTION CALL *********
    //======= ON CREDIT CARD FIELD FOCUS
    $(document).on('focus','.cc-value-holder',function (e) {
         card_validation();
    });

    creditCardField.on('keypress',function (e) {
        // card_validation();
    });

    creditCardField.on('blur',function (e) {
        // card_validation();
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
        if(!nameOnCardValidation(nameOnCardField.val())){
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
            wrapperPaddingLeft = '25px';
            mainWrapperPaddingTop = '35px';
            mainWrapperPaddingLeft = '30px';
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
            mainWrapperPaddingLeft = '30px';
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

        //==== 'main-body-wrapper' DIV
        mainBodyWrapper.css({
            'padding-top': wrapperPaddingTop,
            'padding-left': wrapperPaddingLeft,
            'padding-right': wrapperPaddingLeft,
            'padding-bottom': wrapperPaddingTop
        });

        //==== 'main-body-main' DIV
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

    //======= CLOSING SWIPER MODAL WHEN CANCEL BUTTON CLICKED
    function popupClose(elementToHide){
        let self = $(elementToHide);
        self.closest('.popup-wrapper').removeClass('active');
        // creditCardField.trigger('focus');
    }
    //======= CREDIT CARD DATA VALIDATION
    let J = Payment.J;
    function card_validation(){
        let number = document.querySelector('.cc-value-holder');
        Payment.formatCardNumber(number);
        J.toggleClass(document.querySelectorAll('input'), 'invalid');
        let cardType = Payment.fns.cardType(J.val(number));
        // J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
        if(cardType){
            creditCardField.addClass(cardType);
        }
        if(Payment.fns.validateCardNumber(J.val(number))){
            creditCardField.removeClass('invalid');
            creditCardField.addClass('valid');
            creditCardField.closest('.input-wrap').find('.warning-message').hide();
        }else{
            creditCardField.addClass('invaliddd');
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
                $('.swipe-card-image').css('display', 'block');
                $('.circle-loader').removeClass('active load-complete');
                $('.checkmark').css('display', 'none');
            }

        }, 500);
    }
    //======= ZIP CODE VALIDATION
    function zipCodeValidation(code) {
        let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
        return isValidZip;
    }
    //======= NAME ON CARD VALIDATION
    function nameOnCardValidation(name) {
        let isValidName = /[-a-zA-Z' ]{6,26}/g.test(name);
        return isValidName;
    }



    //======== VIRTUAL KEYBOARD (28/03/2022)

    //======== KEYBOARD PLUGIN CALL
    $('.vr-keyboard').keyboard({
        // *** choose layout ***
        layout       : 'custom',
        customLayout: {
            'normal': ['1 2 3 4 5 6 7 8 9 0',
                'q w e r t y u i o p',
                '{shift} a s d f g h j k l {shift}',
                'z x c v b n m {b} {clear:clear}',
                '{c} @ {space} . .gmail .com {a}'
            ],
            'shift': ['1 2 3 4 5 6 7 8 9 0',
                'Q W E R T Y U I O P',
                '{shift} A S D F G H J K L {shift}',
                'Z X C V B N M {b} {clear:clear}',
                '{c} @ {space} . .gmail .com {a}'
            ]
        },


        // allow jQuery position utility to reposition the keyboard on window resize
        reposition : true,

        // preview added above keyboard if true, original input/textarea used if false
        // always disabled for contenteditable elements
        usePreview : true,

        // if true, the keyboard will always be visible
        alwaysOpen : false,

        // give the preview initial focus when the keyboard becomes visible
        initialFocus : true,
        // Avoid focusing the input the keyboard is attached to
        noFocus : false,

        // if true, keyboard will remain open even if the input loses focus.
        stayOpen : false,

        // Prevents the keyboard from closing when the user clicks or
        // presses outside the keyboard. The `autoAccept` option must
        // also be set to true when this option is true or changes are lost
        userClosed : false,

        // if true, keyboard will not close if you press escape.
        ignoreEsc : false,

        // if true, keyboard will only closed on click event instead of mousedown or
        // touchstart. The user can scroll the page without closing the keyboard.
        closeByClickEvent : false,

        // *** change keyboard language & look ***
        display : {
            // \u2714 = check mark - same action as accept
            'a'      : '\u2714:Accept (Shift-Enter)',
            'accept' : 'Accept:Accept (Shift-Enter)',
            'alt'    : 'AltGr:Alternate Graphemes',
            // \u232b = outlined left arrow with x inside
            'b'      : '\u232b:Backspace',
            'bksp'   : 'Bksp:Backspace',
            // \u2716 = big X, close - same action as cancel
            'c'      : '\u2716:Cancel (Esc)',
            'cancel' : 'Cancel:Cancel (Esc)',
            // clear num pad
            'clear'  : 'C:Clear',
            'combo'  : '\u00f6:Toggle Combo Keys',
            // decimal point for num pad (optional);
            // change '.' to ',' for European format
            'dec'    : '.:Decimal',
            // down, then left arrow - enter symbol
            'e'      : '\u21b5:Enter',
            'empty'  : '\u00a0', // &nbsp;
            'enter'  : 'Enter:Enter',
            // \u2190 = left arrow (move caret)
            'left'   : '\u2190',
            // caps lock
            'lock'   : '\u21ea Lock:Caps Lock',
            'next'   : 'Next',
            'prev'   : 'Prev',
            // \u2192 = right arrow (move caret)
            'right'  : '\u2192',
            // \u21e7 = thick hollow up arrow
            's'      : '\u21e7:Shift',
            'shift'  : 'Shift:Shift',
            // \u00b1 = +/- sign for num pad
            'sign'   : '\u00b1:Change Sign',
            'space'  : '&nbsp;:Space',

            // \u21e5 = right arrow to bar; used since this virtual
            // keyboard works with one directional tabs
            't'      : '\u21e5:Tab',
            // \u21b9 is the true tab symbol (left & right arrows)
            'tab'    : '\u21e5 Tab:Tab',
            // replaced by an image
            'toggle' : ' ',

            // added to titles of keys
            // accept key status when acceptValid:true
            'valid': 'valid',
            'invalid': 'invalid',
            // combo key states
            'active': 'active',
            'disabled': 'disabled'
        },

        // Message added to the key title while hovering, if the mousewheel plugin exists
        wheelMessage : 'Use mousewheel to see other keys',

        css : {
            // input & preview
            input          : 'ui-widget-content ui-corner-all',
            // keyboard container
            container      : 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix',
            // keyboard container extra class (same as container, but separate)
            popup: '',
            // default state
            buttonDefault  : 'ui-state-default ui-corner-all',
            // hovered button
            buttonHover    : 'ui-state-hover',
            // Action keys (e.g. Accept, Cancel, Tab, etc); this replaces the "actionClass" option
            buttonAction   : 'ui-state-active',
            // Active keys (e.g. shift down, meta keyset active, combo keys active)
            buttonActive   : 'ui-state-active',
            // used when disabling the decimal button {dec}
            buttonDisabled : 'ui-state-disabled',
            // empty button class name {empty}
            buttonEmpty    : 'ui-keyboard-empty'
        },

        // *** Useability ***
        // Auto-accept content when clicking outside the keyboard (popup will close)
        autoAccept : true,
        // Auto-accept content even if the user presses escape
        // (only works if `autoAccept` is `true`)
        autoAcceptOnEsc : false,

        // Prevents direct input in the preview window when true
        lockInput : false,

        // Prevent keys not in the displayed keyboard from being typed in
        restrictInput : false,
        // Additional allowed characters while restrictInput is true
        restrictInclude : '', // e.g. 'a b foo \ud83d\ude38'

        // Check input against validate function, if valid the accept button
        // is clickable; if invalid, the accept button is disabled.
        acceptValid : true,
        // Auto-accept when input is valid; requires `acceptValid`
        // set `true` & validate callback
        autoAcceptOnValid : false,

        // if acceptValid is true & the validate function returns a false, this option
        // will cancel a keyboard close only after the accept button is pressed
        cancelClose : true,

        // Use tab to navigate between input fields
        tabNavigation : false,

        // press enter (shift-enter in textarea) to go to the next input field
        enterNavigation : true,
        // mod key options: 'ctrlKey', 'shiftKey', 'altKey', 'metaKey' (MAC only)
        // alt-enter to go to previous; shift-alt-enter to accept & go to previous
        enterMod : 'altKey',

        // if true, the next button will stop on the last keyboard input/textarea;
        // prev button stops at first
        // if false, the next button will wrap to target the first input/textarea;
        // prev will go to the last
        stopAtEnd : true,

        // Set this to append the keyboard immediately after the input/textarea it
        // is attached to. This option works best when the input container doesn't
        // have a set width and when the "tabNavigation" option is true
        appendLocally : false,

        // Append the keyboard to a desired element. This can be a jQuery selector
        // string or object
        appendTo : 'body',

        // If false, the shift key will remain active until the next key is (mouse)
        // clicked on; if true it will stay active until pressed again
        stickyShift : true,

        // caret placed at the end of any text when keyboard becomes visible
        caretToEnd : false,

        // Prevent pasting content into the area
        preventPaste : false,

        // caret stays this many pixels from the edge of the input
        // while scrolling left/right; use "c" or "center" to center
        // the caret while scrolling
        scrollAdjustment : 10,

        // Set the max number of characters allowed in the input, setting it to
        // false disables this option
        maxLength : false,

        // allow inserting characters @ caret when maxLength is set
        maxInsert : true,

        // Mouse repeat delay - when clicking/touching a virtual keyboard key, after
        // this delay the key will start repeating
        repeatDelay : 500,

        // Mouse repeat rate - after the repeatDelay, this is the rate (characters
        // per second) at which the key is repeated. Added to simulate holding down
        // a real keyboard key and having it repeat. I haven't calculated the upper
        // limit of this rate, but it is limited to how fast the javascript can
        // process the keys. And for me, in Firefox, it's around 20.
        repeatRate : 20,

        // resets the keyboard to the default keyset when visible
        resetDefault : false,

        // Event (namespaced) on the input to reveal the keyboard. To disable it,
        // just set it to an empty string ''.
        openOn : 'focus',

        // When the character is added to the input
        keyBinding : 'mousedown touchstart',

        // enable/disable mousewheel functionality
        // enabling still depends on the mousewheel plugin
        useWheel : true,

        // combos (emulate dead keys)
        // http://en.wikipedia.org/wiki/Keyboard_layout#US-International
        // if user inputs `a the script converts it to à, ^o becomes ô, etc.
        useCombos : true,

        // *** Methods ***
        // Callbacks - add code inside any of these callback functions as desired
        initialized   : function(e, keyboard, el) {},
        beforeVisible : function(e, keyboard, el) {
            $('body').addClass('vk-attached');
        },
        visible       : function(e, keyboard, el) {},
        beforeInsert  : function(e, keyboard, el, textToAdd) { return textToAdd; },
        change        : function(e, keyboard, el) {},
        beforeClose   : function(e, keyboard, el, accepted) {},
        accepted      : function(e, keyboard, el) {},
        canceled      : function(e, keyboard, el) {},
        restricted    : function(e, keyboard, el) {},
        hidden        : function(e, keyboard, el) {
            $('body').removeClass('vk-attached');
        },

        // called instead of base.switchInput
        switchInput : function(keyboard, goToNext, isAccepted) {},

        // used if you want to create a custom layout or modify the built-in keyboard
        // create : function(keyboard) { return keyboard.buildKeyboard(); },

        // build key callback (individual keys)
        buildKey : function( keyboard, data ) {
            return data;
        },

        // this callback is called just before the "beforeClose" to check the value
        // if the value is valid, return true and the keyboard will continue as it
        // should (close if not always open, etc)
        // if the value is not value, return false and the clear the keyboard value
        // ( like this "keyboard.$preview.val('');" ), if desired
        // The validate function is called after each input, the "isClosing" value
        // will be false; when the accept button is clicked, "isClosing" is true
        validate : function(keyboard, value, isClosing) {
            return true;
        }

    });


    $('.vr-keyboard-num').keyboard({
        // *** choose layout ***
        layout       : 'custom',
        customLayout : { 'normal'  : ['7 8 9 {b}', '4 5 6 {clear}', '0 1 2 3', '{c} {a}']},

        // allow jQuery position utility to reposition the keyboard on window resize
        reposition : true,

        // preview added above keyboard if true, original input/textarea used if false
        // always disabled for contenteditable elements
        usePreview : true,

        // if true, the keyboard will always be visible
        alwaysOpen : false,

        // give the preview initial focus when the keyboard becomes visible
        initialFocus : true,
        // Avoid focusing the input the keyboard is attached to
        noFocus : false,

        // if true, keyboard will remain open even if the input loses focus.
        stayOpen : false,

        // Prevents the keyboard from closing when the user clicks or
        // presses outside the keyboard. The `autoAccept` option must
        // also be set to true when this option is true or changes are lost
        userClosed : false,

        // if true, keyboard will not close if you press escape.
        ignoreEsc : false,

        // if true, keyboard will only closed on click event instead of mousedown or
        // touchstart. The user can scroll the page without closing the keyboard.
        closeByClickEvent : false,

        // *** change keyboard language & look ***
        display : {
            // \u2714 = check mark - same action as accept
            'a'      : '\u2714:Accept (Shift-Enter)',
            'accept' : 'Accept:Accept (Shift-Enter)',
            'alt'    : 'AltGr:Alternate Graphemes',
            // \u232b = outlined left arrow with x inside
            'b'      : '\u232b:Backspace',
            'bksp'   : 'Bksp:Backspace',
            // \u2716 = big X, close - same action as cancel
            'c'      : '\u2716:Cancel (Esc)',
            'cancel' : 'Cancel:Cancel (Esc)',
            // clear num pad
            'clear'  : 'C:Clear',
            'combo'  : '\u00f6:Toggle Combo Keys',
            // decimal point for num pad (optional);
            // change '.' to ',' for European format
            'dec'    : '.:Decimal',
            // down, then left arrow - enter symbol
            'e'      : '\u21b5:Enter',
            'empty'  : '\u00a0', // &nbsp;
            'enter'  : 'Enter:Enter',
            // \u2190 = left arrow (move caret)
            'left'   : '\u2190',
            // caps lock
            'lock'   : '\u21ea Lock:Caps Lock',
            'next'   : 'Next',
            'prev'   : 'Prev',
            // \u2192 = right arrow (move caret)
            'right'  : '\u2192',
            // \u21e7 = thick hollow up arrow
            's'      : '\u21e7:Shift',
            'shift'  : 'Shift:Shift',
            // \u00b1 = +/- sign for num pad
            'sign'   : '\u00b1:Change Sign',
            'space'  : '&nbsp;:Space',

            // \u21e5 = right arrow to bar; used since this virtual
            // keyboard works with one directional tabs
            't'      : '\u21e5:Tab',
            // \u21b9 is the true tab symbol (left & right arrows)
            'tab'    : '\u21e5 Tab:Tab',
            // replaced by an image
            'toggle' : ' ',

            // added to titles of keys
            // accept key status when acceptValid:true
            'valid': 'valid',
            'invalid': 'invalid',
            // combo key states
            'active': 'active',
            'disabled': 'disabled'
        },

        // Message added to the key title while hovering, if the mousewheel plugin exists
        wheelMessage : 'Use mousewheel to see other keys',

        css : {
            // input & preview
            input          : 'ui-widget-content ui-corner-all',
            // keyboard container
            container      : 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix',
            // keyboard container extra class (same as container, but separate)
            popup: '',
            // default state
            buttonDefault  : 'ui-state-default ui-corner-all',
            // hovered button
            buttonHover    : 'ui-state-hover',
            // Action keys (e.g. Accept, Cancel, Tab, etc); this replaces the "actionClass" option
            buttonAction   : 'ui-state-active',
            // Active keys (e.g. shift down, meta keyset active, combo keys active)
            buttonActive   : 'ui-state-active',
            // used when disabling the decimal button {dec}
            buttonDisabled : 'ui-state-disabled',
            // empty button class name {empty}
            buttonEmpty    : 'ui-keyboard-empty'
        },

        // *** Useability ***
        // Auto-accept content when clicking outside the keyboard (popup will close)
        autoAccept: true,
        // Auto-accept content even if the user presses escape
        // (only works if `autoAccept` is `true`)
        autoAcceptOnEsc : false,

        // Prevents direct input in the preview window when true
        lockInput : false,

        // Prevent keys not in the displayed keyboard from being typed in
        restrictInput : false,
        // Additional allowed characters while restrictInput is true
        restrictInclude : '', // e.g. 'a b foo \ud83d\ude38'

        // Check input against validate function, if valid the accept button
        // is clickable; if invalid, the accept button is disabled.
        acceptValid : true,
        // Auto-accept when input is valid; requires `acceptValid`
        // set `true` & validate callback
        autoAcceptOnValid : false,

        // if acceptValid is true & the validate function returns a false, this option
        // will cancel a keyboard close only after the accept button is pressed
        cancelClose : true,

        // Use tab to navigate between input fields
        tabNavigation : false,

        // press enter (shift-enter in textarea) to go to the next input field
        enterNavigation : true,
        // mod key options: 'ctrlKey', 'shiftKey', 'altKey', 'metaKey' (MAC only)
        // alt-enter to go to previous; shift-alt-enter to accept & go to previous
        enterMod : 'altKey',

        // if true, the next button will stop on the last keyboard input/textarea;
        // prev button stops at first
        // if false, the next button will wrap to target the first input/textarea;
        // prev will go to the last
        stopAtEnd : true,

        // Set this to append the keyboard immediately after the input/textarea it
        // is attached to. This option works best when the input container doesn't
        // have a set width and when the "tabNavigation" option is true
        appendLocally : false,

        // Append the keyboard to a desired element. This can be a jQuery selector
        // string or object
        appendTo : 'body',

        // If false, the shift key will remain active until the next key is (mouse)
        // clicked on; if true it will stay active until pressed again
        stickyShift : true,

        // caret placed at the end of any text when keyboard becomes visible
        caretToEnd : false,

        // Prevent pasting content into the area
        preventPaste : false,

        // caret stays this many pixels from the edge of the input
        // while scrolling left/right; use "c" or "center" to center
        // the caret while scrolling
        scrollAdjustment : 10,

        // Set the max number of characters allowed in the input, setting it to
        // false disables this option
        maxLength : 16,

        // allow inserting characters @ caret when maxLength is set
        maxInsert : true,

        // Mouse repeat delay - when clicking/touching a virtual keyboard key, after
        // this delay the key will start repeating
        repeatDelay : 500,

        // Mouse repeat rate - after the repeatDelay, this is the rate (characters
        // per second) at which the key is repeated. Added to simulate holding down
        // a real keyboard key and having it repeat. I haven't calculated the upper
        // limit of this rate, but it is limited to how fast the javascript can
        // process the keys. And for me, in Firefox, it's around 20.
        repeatRate : 20,

        // resets the keyboard to the default keyset when visible
        resetDefault : false,

        // Event (namespaced) on the input to reveal the keyboard. To disable it,
        // just set it to an empty string ''.
        openOn : 'focus',

        // When the character is added to the input
        keyBinding : 'mousedown touchstart',

        // enable/disable mousewheel functionality
        // enabling still depends on the mousewheel plugin
        useWheel : true,

        // combos (emulate dead keys)
        // http://en.wikipedia.org/wiki/Keyboard_layout#US-International
        // if user inputs `a the script converts it to à, ^o becomes ô, etc.
        useCombos : true,

        // *** Methods ***
        // Callbacks - add code inside any of these callback functions as desired
        initialized   : function(e, keyboard, el) {},
        beforeVisible : function(e, keyboard, el) {
            $('body').addClass('vk-attached');
        },
        visible       : function(e, keyboard, el) {},
        beforeInsert  : function(e, keyboard, el, textToAdd) { return textToAdd; },
        change        : function(e, keyboard, el) {},
        beforeClose: function (e, keyboard, el, accepted) {
            if ($('.donation-details').css('display') == 'block') {
                let otherAmount = $('#other-amount-btn').val();
                $('#txtAmount').val(otherAmount);
            }
            el.focus();
        },
        accepted: function (e, keyboard, el) {},
        canceled: function (e, keyboard, el) {

        },
        restricted    : function(e, keyboard, el) {},
        hidden        : function(e, keyboard, el) {
            $('body').removeClass('vk-attached');
            if ($('.donation-details').css('display') == 'block') {
                var otherAmount =  $('#other-amount-btn').val();
                $('#txtAmount').val(otherAmount);
            }
        },

        // called instead of base.switchInput
        switchInput : function(keyboard, goToNext, isAccepted) {},

        // used if you want to create a custom layout or modify the built-in keyboard
        // create : function(keyboard) { return keyboard.buildKeyboard(); },

        // build key callback (individual keys)
        buildKey : function( keyboard, data ) {
            return data;
        },

        // this callback is called just before the "beforeClose" to check the value
        // if the value is valid, return true and the keyboard will continue as it
        // should (close if not always open, etc)
        // if the value is not value, return false and the clear the keyboard value
        // ( like this "keyboard.$preview.val('');" ), if desired
        // The validate function is called after each input, the "isClosing" value
        // will be false; when the accept button is clicked, "isClosing" is true
        validate: function (keyboard, value, isClosing) {
            if ($('.donation-details').css('display') == 'block') {
                let otherAmount = $('#other-amount-btn').val();
                $('#txtAmount').val(otherAmount);
            }
            return true;
        }

    });


});