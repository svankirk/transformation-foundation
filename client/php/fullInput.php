<?php include( "header.php"); ?>
<section>
        <h1>Applicant Data</h1>
        <form  id="applyEntryForm" name="applyEntryForm" action="">
            <p>
                <label for='attendedIntroToForum' class="lLabel">Attended Introduction to Forum:</label>
                <br>
                    <input type="radio" name="attendedIntroToForum" value="Yes" checked> Yes<br>
                    <input type="radio" name="attendedIntroToForum" value="No"> No                
            </p>
            <p>
                <label for='todaysDate'>Today's Date:</label>
                <input type="date" name="todaysDate" value="2015-12-02">
            </p>
            <p>
                <label for='referredBy' >Referred By:</label>
                <input type="text" class="mSize" name="referredBy" value = "mike referal" >
            </p>
            <p>
                <label for='introToForumDate'>Date Attended Introduction:</label>
                <input type="date" name="introToForumDate" value="2015-08-15">
            </p>
            <p>
                <label for='firstName'>First Name:</label>
                <!--<label for='lastName'>Last Name:</label>-->
                <input type="text" name="firstName" value="Bartlet">
                <!--<input type="text" name="LastName">-->
            </p>
            <p>
                <label for='lastName' >Last Name:</label>
                <input type="text" name="LastName" value = "Banks">
            </p>
            <p>
                <label for='birthDate'>Date of Birth:</label>
                <input type="date" name="birthDate" value ="1959-09-29">
            </p>
            <h2> Street Address</h2>
            <p> 
                <label for="streetAddress">Address:</label>
                <input type="text" name="streetAddress" class="lSize">
            </p>
            <p> 
                <label for="streetAddressLine2">Address Line 2:</label>
                <input type="text" name="streetAddressLine2" class="lSize">
            </p>
            <p>    
                <label for="city">City:</label>
                <input type="text" name="city">
            </p>
            <p>
                <label for="state">State:</label>
                <input type="text" name="state">
            </p>
            <p>
                <label for="postalZip">Postal/Zip:</label>
                <input type="text" name="postalZip">
            </p>
            <p>
                <label for="country">Country:</label>
                <input type="text" name="country">
            </p>
            <p>
                <label for="cellPhone">Cell Phone:</label>
                <input type="text" name="cellPhone">
            </p>
            <p>
                <label for="homePhone">Home Phone:</label>
                <input type="text" name="homePhone">
            </p>
            <p>
                <label for="workPhone">Work Phone:</label>
                <input type="text" name="workPhone">
            </p>
            <p>
                <label for="emailAddress">Email Address:</label>
                <input type="email" name="emailAddress" size=35>
            </p>
            <p>
                <label for="contactTime">Contact Time:</label>
                <input type="text" name="contactTime">
            </p>
            <p>
                <label for="gender">Gender:</label>
                <br>
                <input type="radio" name="gender" value="male"> Male<br>
                <input type="radio" name="gender" value="female"> Female
            </p>
            <p>
                <label for="martialStatus">Martial Status:</label>
                <br>
                <input type="radio" name="martialStatus" value="single"> Single<br>
                <input type="radio" name="martialStatus" value="married"> Married<br>
                <input type="radio" name="martialStatus" value="other"> Other
                <input type="text" name="martialStatus">
            </p>
            <p>
                <br>
                <h1> Employment Information</h1>
                <label for="employmentStatus">Employment Status:</label>
                <input type="text" name="employmentStatus">
            </p>
            <p>
                <label for="employer">Employer:</label>
                <input type="text" name="employer" size = 35>
            </p>
            <p>
                <h2>Employer Address</h2>
                <label for="employerAddress">Address:</label>
                <input type="text" name="employerAddress" class=lSize>
            </p>
            <p>
                <label for="employerAddressLine2">Address Line 2:</label>
                <input type="text" name="employerAddressLine2" class=lSize>
            </p>
            <p>
                <label for="employerCity">City:</label>
                <input type="text" name="employerCity">
            </p>
            <p>
                <label for="employerState">State:</label>
                <input type="text" name="employerState">                
            </p>
            <p>
                <label for="employerCountry">Country:</label>
                <input type="text" name="employerCountry">
            </p>
            <p>
                <label for="employerPhone">Employer Phone:</label>
                <input type="text" name="employerPhone">
            </p>
            <p>
                <h1>Parent/Guardian Information</h1>
                <label for="parentGuardianFirstName">First Name:</label>
                <input type="text" name="parentGuardianFirstName">
            </p>
            <p>
                <label for="parentGuardianLastName">Last Name:</label>
                <input type="text" name="parentGuardianLastName">
            </p>
            <p>
                <label for="parentGuardianAddress">Address:</label>
                <input type="text" name="parentGuardiAddress" class=lSize>
            </p>
            <p>
                <label for="parentGuardiAddressLine2">Address Line 2:</label>
                <input type="text" name="parentGuardianAddressLine2" class=lSize>
            </p>
            <p>
                <label for="parentGuardianCity">City:</label>
                <input type="text" name="parentGuardianCity">
            </p>
            <p> 
                <label for="parentGuardianState">State:</label>
                <input type="text" name="parentGuardianState">                
            </p>
            <p>
                <label for="parentGuardianCountry">Country:</label>
                <input type="text" name="parentGuardianCountry">
            </p>
            <p>
                <label for="parentGuardianHomePhone">Home Phone:</label>
                <input type="text" name="parentGuardianHomePhone">
            </p>
            <p>
                <label for="parentGuardianCellPhone">Cell Phone:</label>
                <input type="text" name="parentGuardianCellPhone">
            </p>
            <p>
                <label for="parentGuardianEmailAddress">Email Address:</label>
                <input type="email" name="parentGuardianEmailAddress">
            </p>
            <p>
                <h1> Applicant Questionnaire</h1>
                <label for="registeredForForum" class="lLabel">Registered for Landmark Forum:</label>
                <br>
                <input type="radio" name="registeredForForum" value="Yes"> Yes<br>
                <input type="radio" name="registeredForForum" value="No"> No               
            </p>
            <p>
                <label for='forumDate'>Date Registered for Forum:</label>
                <input type="date" name="forumDate">
            </p>
            <p>
                <label for="locationOfForum">Location of the Forum:</label>
                <input type="text" name="locationOfForum" class="mSize">
            </p>
            <p>
                <label for="whyTakeTheForum" class="lLabel">Why are you taking The Forum:</label>
                <br>
                <textarea name="whyTakeTheForum"></textarea>
            </p>
            <p>
                <label for="whyTheFinancialNeed" class="lLabel">Why Is there a Financial Need:</label>
                <br>
                <textarea name="whyTheFinancialNeed"></textarea>
            </p>
            <p>
                <label for="whatDoYouWantToAccomplish" class="lLabel">What Do You Want to Accomplish:</label>
                <br>
                <textarea name="whatDoYouWantToAccomplish"></textarea>
            </p>
            <p>
                <label for="howDoYouPayItForward"class="lLabel">How Do You Pay It Forward:</label>
                <br>
                <textarea name="howDoYouPayItForward"></textarea>
            </p>
            <p>
                <label for="sendingTestimonial" class="lLabel">Are you willing to Send a  Testimonial:</label>
                <br>
                 <input type="radio" name="sendingTestimonial" value="Yes"> Yes<br>
                 <input type="radio" name="sendingTestimonial" value="No"> No               
            </p>
            <p>
                <label for="testimonialComments" class="lLabel">Testimonial Comments:</label>
                <br>
                <textarea name="testimonialComments"></textarea>
            </p>
            <h1> Personal References </h1>
            <p>
               <h2>Reference 1</h2>
                <label for='ref1FirstName'>First Name:</label>
                <input type="text" name="ref1FirstName">
            </p>
            <p>
                <label for='ref1LastName'>Last Name:</label>
                <input type="text" name="ref1LastName">
            </p>
            <p>
                <label for='ref1Phone'>Phone:</label>
                <input type="text" name="ref1Phone">
            </p>
            <p>
                <label for='ref1Relationship'>Relationship:</label>
                <input type="text" name="ref1Relationship">
            </p>
            <p>
                <h2>Reference 2</h2>
                <label for='ref2FirstName'>First Name:</label>
                <input type="text" name="ref2FirstName">
            </p>
            <p>
                <label for='ref2LastName'>Last Name:</label>
                <input type="text" name="ref2LastName">
            </p>
            <p>
                <label for='ref2Phone'>Phone:</label>
                <input type="text" name="ref2Phone">
            </p>
            <p>
                <label for='ref2Relationship'>Relationship:</label>
                <input type="text" name="ref2Relationship">
            </p>
            <p> 
             <h2> Administrative Section</h2>
               <label for="adminDateCreated">Date Created:</label>
               <input type="date" name="adminDateCreated">
             </p>
             <p>
                <label for='adminAssignedTo' >Assigned To:</label>
                <input type="text" class="mSize" name="adminAssignedTo" value = "" >
            </p>
            <p>
                <label for='adminAssignedDate'>Assigned Date:</label>
                <input type="date" name="adminAssignedDate" value="">
            </p>
            <p>
                <label for='adminStatus'>Status:</label>
                <input type="text" name="adminStatus" value="Open">
            </p>
            <p>
                <label for='adminRegisteredForForum'>Status:</label>
                <input type="date" name="adminRegisteredForForum" value="">
            </p>
            <p>
                <label for='adminCompletedForum'>Completed Forum:</label>
                <input type="checkbox" name="adminCompletedForum" value="1">
            </p>
            	<h2>One Month follow up</h2>
                 <label for='adminOneMonFollowDate' >Date for One Month Follow Up:</label>
                <input type="date" name="adminOneMonFollowDate" value = "" >
            </p>
            <p>
                <label for='adminOneFollowupBy' >Followed up by:</label>
                <input type="text" name="adminOneFollowupBy" value = "" >
            </p>
            <p>
                <label for='adminOneFollowupDate'>Follow up Date:</label>
                <input type="date" name="adminOneFollowupDate" value="">
            </p>
            <p>
                <label for="adminOneFollowupComments" class="lLabel">Applicant One Month Comments:</label>
                <br>
                <textarea name="adminOneFollowupComments"></textarea>
            </p>
            </p>
            	<h2>Six Month follow up</h2>
                 <label for='adminSixMonFollowDate' >Date for Six Month Follow Up:</label>
                <input type="date" name="adminSixMonFollowDate" value = "" >
            </p>
            <p>
                <label for='adminSixFollowupBy' >Followed up by:</label>
                <input type="text" name="adminSixFollowupBy" value = "" >
            </p>
            <p>
                <label for='adminSixFollowupDate'>Follow up Date:</label>
                <input type="date" name="adminSixFollowupDate" value="">
            </p>
            <p>
                <label for="adminSixFollowupComments" class="lLabel">Applicant Six Month Comments:</label>
                <br>
                <textarea name="adminSixFollowupComments"></textarea>
            </p> 
             
             
             
             
             
             
             
             
            <input type="submit" value="Submit">
        </form>
<script> 
$("#applyEntryForm").submit(function(e){
    e.preventDefault();
    var $this=$(this);
    var formarray=$this.serializeArray();
    var jsform={};
    for (var i = formarray.length; i--; ) {
        formarray[i];
        jsform[formarray[i].name]=formarray[i].value;  
    };
    $.ajax({
     method: "POST",
     crossDomain: true,
     url: "https://node-svankirk.c9users.io:8080/application",
     data: jsform
    })
    .done(function(msg){ 
        alert("response: " + msg);
    });
    
    
    // console.log($this.serializeArray());
    console.log(jsform);
});
// $this->response->setHeader('Access-Control-Allow-Origin', '*');

</script>
</section>
<?php include( "footer.php"); ?>