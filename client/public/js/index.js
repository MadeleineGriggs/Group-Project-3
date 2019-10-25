
$(document).ready(function() {

    let $exampleText = $("#example-text");
    let $exampleDesc = $("#example-description");
    
    let $exampleSubmit = $(".example-submit");

    $exampleSubmit.on("submit", function(event) {
        event.preventDefault();
        var exampleData = {
            text: $exampleText.val(),
            description: $exampleDesc.val(),
        };
        //Need to check if all data is available.
        signUpExample(exampleData);
    });

    function signUpExample(exampleData) {
        $.post("/api/example", exampleData)
            .catch(function(err) {
                console.log(err);
            });
    }

});
