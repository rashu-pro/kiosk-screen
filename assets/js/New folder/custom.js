/**
 * Created by Rashu on 22-02-22.
 */

$(function () {
    $('.donation-frequency button, .donation-amount-options-wrapper button').on('click',function () {
        var self = $(this);
        self.parent().find('button').removeClass('active');
        self.addClass('active');

        if(self.parent().hasClass('donation-amount-options-wrapper')){
            if(self.parent().next().find('.input-field-group-prepend').hasClass('focused')){
                self.parent().next().find('.input-field-group-prepend').removeClass('focused');
                self.parent().next().find('.form-control').val('');
            }
        }
    });

    $('.product-options-wrapper button').on('click',function () {
        var self = $(this);
        self.parent().parent().find('button').removeClass('active');
        self.addClass('active');
    });

    $('.other-input-wrapper .form-control').on('focus',function () {
        var self = $(this);
        self.closest('.other-input-wrapper').prev().find('.amount-btn').removeClass('active');
        self.parent().find('.input-field-group-prepend').addClass('focused');
    });

    $('.other-input-wrapper .form-control').on('blur',function () {
        var self = $(this);
        if(self.val()==''){
            self.parent().find('.input-field-group-prepend').removeClass('focused');
        }

    });

    $('.btn-next-js').on('click',function () {
        var self = $(this);
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

    });

    function back(){
        history.back();
    }
    $('.btn-back-js').on('click',function () {
        back();
    });

    $('.swipe-card-image').on('click',function () {
        var self = $(this);
        var cardNumber = '4026 0000 0000 0002',
            cardHolderName = 'Jhon Doe',
            expMonth = '03',
            expYear = '2024';
        self.hide();
        $('.circle-loader').addClass('active');
        setTimeout(function () {
            $('.circle-loader').toggleClass('load-complete');
            $('.checkmark').toggle();
        },800);
        setTimeout(function () {
            self.closest('.popup-wrapper').removeClass('active');
            $('.main-body').removeClass('popup-active');
            $('.cc-card-field').val(cardNumber);
            $('.cc-card-field').trigger('focus');
            $('.exp-month-field').val(expMonth);
            $('.exp-year-field').val(expYear);
            $('.name-on-card').val(cardHolderName);
            $('.cvv-field').trigger('focus');
        },2000);



    });

    // wrapper height
    var headerHeight = $('.header').height(),
        footerHeight = $('.footer').height(),
        headFootHeight = headerHeight + footerHeight,
        headFootHeightPx = (headFootHeight + 110)+'px',
        viewPortHeight = $(window).outerHeight() - headFootHeight,
        contentHeight = $('.main-body-wrapper').outerHeight(),
        windowHeight = $(window).height(),

        mainWrapperHeight = "calc(100vh - "+headFootHeightPx+")";

    function wrapperHeight(){
        console.log('content height:'+contentHeight);
        console.log('viewport:'+(viewPortHeight - 110));
        console.log('window height: ' + $(window).height());
        $('.main-body-main').height(mainWrapperHeight);
        if(contentHeight<viewPortHeight){
            $('.main-body-main').height(mainWrapperHeight);
        }
    }
    wrapperHeight();
    $(document).focus(function () {
        wrapperHeight();
    });

    // content fitting in specific display

    function fitSize(){
        var body = $('body'),
            boxBig = $('.box-height-big'),
            mainBodyWrapper = $('.main-body-wrapper'),
            otherInputWrapper = $('.other-input-wrapper'),
            mainBodyCard = $('.main-body-main'),
            donationDetails_FormSection = $('.donation-details .form-section'),
            inputWrapFormControl = $('.input-wrap .form-control');
        var fontSize = '20px',
            boxHeightBig = '60px',
            wrapperPaddingTop = '15px',
            wrapperPaddingLeft = '20px',
            mainWrapperPaddingTop = '20px',
            mainWrapperPaddingLeft = '30px',
            otherInputWrapperPaddingTop = '30px',
            donationDetils_FormSectionPaddingBottom = '30px',
            inputWrapFormControlHeight = '50px';
        if(parseInt(windowHeight)>750){
            fontSize = '26px';
            boxHeightBig = '85px';
            wrapperPaddingTop = '25px';
            wrapperPaddingLeft = '25px';
            mainWrapperPaddingTop = '30px';
            mainWrapperPaddingLeft = '30px';
            otherInputWrapperPaddingTop = '40px';
            donationDetils_FormSectionPaddingBottom = '50px';
            inputWrapFormControlHeight = '65px';
            inputWrapFormControl.parent().addClass('big-cc-field');
        }else if(parseInt(windowHeight)>590){
            console.log('greater than 690');
            fontSize = '20px';
            boxHeightBig = '60px';
            wrapperPaddingTop = '15px';
            wrapperPaddingLeft = '20px';
            mainWrapperPaddingTop = '20px';
            mainWrapperPaddingLeft = '30px';
            otherInputWrapperPaddingTop = '30px';
            donationDetils_FormSectionPaddingBottom = '30px';
            inputWrapFormControlHeight = '50px';
        }else if(windowHeight>500){

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
            'padding-left': wrapperPaddingLeft,
            'padding-right': wrapperPaddingLeft
        });

        otherInputWrapper.css('padding-top', otherInputWrapperPaddingTop);

        donationDetails_FormSection.css('padding-bottom', donationDetils_FormSectionPaddingBottom);

        inputWrapFormControl.css('height', inputWrapFormControlHeight);
    }

    fitSize();

    $(window).on('resize',function () {
        fitSize();
    });


    // credit card validator
    $(document).on('focus','.cc-card-field',function () {
        var self = $(this);
        $(self).validateCreditCard(function(result) {
            // if(result.card_type!=null && self.val()!=''){
            //     result.card_type.length = 16;
            // }

            if (result.valid) {
                $(this).parent().addClass('valid');
                $(this).parent().addClass(result.card_type.name);
            } else {
                console.log(result.length_valid);
                $(this).parent().removeClass('valid');
                if(result.card_type!=null){
                    $(this).parent().removeClass(result.card_type.name);
                }

            }
        });

    });


});

