
const BizUrl = "http://localhost";
const BizPort = ":6002";

$(document).ready(function() {

    $("#createCertificate").on('click', function(event) {

        input_data = {};

        input_data.from = $("#createCertificate_addressFrom").val();
        input_data.privateKey = $("#createCertificate_privateKey").val();

        input_data.bID = $("#createCertificate_bID").val();
        input_data.evID = $("#createCertificate_evID").val();
        input_data.soh = $("#createCertificate_soh").val();
        input_data.grade = $("#createCertificate_grade").val();
        input_data.expirationDate = $("#createCertificate_expirationDate").val();
        input_data.certificateHash = $("#createCertificate_certificateHash").val();

        $.ajax({
            url : BizUrl + BizPort + '/signCreateCertificate',
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(input_data),
            success : function(result) {

                console.log("받아온 result : " + JSON.stringify(result));
                $("#createCertificate_result").val(JSON.stringify(result.result));

            },beforeSend:function(){
                //(이미지 보여주기 처리)
                $('.wrap-loading').removeClass('display-none');
            }
            ,complete:function(){
                //(이미지 감추기 처리)
                $('.wrap-loading').addClass('display-none');
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#certificateInfo").on('click', function(event) {

        var bID = $("#certificateInfo_bID").val();
        var cID = $("#certificateInfo_cID").val();

        $.ajax({
            url : BizUrl + BizPort + '/certificateInfo/bID/' + bID + '/cID/' + cID,
            crossDomain: true,
            cache: false,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success : function(result) {
                console.log("certificateInfo 결과 값: " + JSON.stringify(result));
                $("#certificateInfo_result").val(JSON.stringify(result.result));
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#checkLatestCertificate").on('click', function(event) {

        var bID = $("#checkLatestCertificate_bID").val();
        var cID = $("#checkLatestCertificate_cID").val();
        var certificateHash = $("#checkLatestCertificate_certificateHash").val();

        $.ajax({
            url : BizUrl + BizPort + '/checkLatestCertificate/bID/' + bID + '/cID/' + cID + '/certificateHash/' + certificateHash,
            crossDomain: true,
            cache: false,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success : function(result) {
                console.log("checkLatestCertificate 결과 값: " + JSON.stringify(result));
                $("#checkLatestCertificate_result").val(result.result);
            },
            error : function(xhr, status, error){
                console.log("xhr : " + xhr);
                console.log(error);
            }
        });

    });

    $("#createCertificate_clear").on('click', function(event) {

        $("#createCertificate_addressFrom").val('');
        $("#createCertificate_privateKey").val('');

        $("#createCertificate_bID").val('');
        $("#createCertificate_evID").val('');
        $("#createCertificate_soh").val('');
        $("#createCertificate_grade").val('');
        $("#createCertificate_expirationDate").val('');
        $("#createCertificate_certificateHash").val('');

        $("#createCertificate_result").val('');

    });


    $("#certificateInfo_clear").on('click', function(event) {

        $("#certificateInfo_bID").val('');
        $("#certificateInfo_cID").val('');

        $("#certificateInfo_result").val('');

    });

    $("#checkLatestCertificate_clear").on('click', function(event) {

        $("#checkLatestCertificate_bID").val('');
        $("#checkLatestCertificate_cID").val('');
        $("#checkLatestCertificate_certificateHash").val('');

        $("#checkLatestCertificate_result").val('');

    });
});
