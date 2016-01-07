<?php include( "header.php"); ?>
<section>
    <form id="applyEntryForm" name="applyEntryForm" action="">
        <h1> Administrative Details for Applicant</h1>
        <p>
            <input type="submit" value="Submit">
            <label for="adminDateCreated">Date Created:</label>
            <input type="date" name="adminDateCreated" value="2015-12-05" readonly>
        </p>
        <p>
            <label for='firstName'>Name - First, Last:</label>
            <!--<label for='lastName'>Last Name:</label>-->
            <input type="text" name="firstName" value="Bartlet">
            <input type="text" name="LastName" value="Banks">
            <!--<input type="text" name="LastName">-->
            <label for='birthDate'>Date of Birth:</label>
            <input type="date" name="birthDate" value="1959-09-29" readonly>
     
     
        </p>
        <p>
            <label for='adminAssignedTo'>Assigned To:</label>
            <input type="text" class="mSize" name="adminAssignedTo" value="">
            <label for='adminAssignedDate'>Assigned Date:</label>
            <input type="date" name="adminAssignedDate" value="">

        </p>
        <p>
            <label for='adminStatus'>Status:</label>
            <input type="text" name="adminStatus" value="Open">
            <label for='adminStatusDate'>Status Date:</label>
            <input type="date" name="adminStatusDate" value="">
        </p>
        <h1>Applicant Contact Information</h1>
        <p>
            <label for="city">City, State :</label>
            <input type="text" name="city" readonly>
            <input type="text" name="state" readonly>
        </p>
        <p>
            <label for="contactTime">Contact Time:</label>
            <input type="text" name="contactTime">
        </p>
        <p>
            <label for="cellPhone">Cell Phone:</label>
            <input type="text" name="cellPhone">
            <label for="homePhone">Home Phone:</label>
            <input type="text" name="homePhone">
            <label for="workPhone">Work Phone:</label>
            <input type="text" name="workPhone">
        </p>
        <p>
            <label for="emailAddress">Email Address:</label>
            <input type="email" name="emailAddress" size=35>
        </p>

        <p>
            <label for="gender">Gender:</label>
            <br>
            <input type="radio" name="gender" value="male" readonly> Male
            <br>
            <input type="radio" name="gender" value="female" readonly> Female
        </p>
        <p>
            <h1>Parent/Guardian Information</h1>
            <label for="parentGuardianFirstName">Name:</label>
            <input type="text" name="parentGuardianFirstName" readonly>
            <input type="text" name="parentGuardianLastName" readonly>
        </p>
        <p>
            <h1> Forum Information</h1>
            <label for="registeredForForum" class="lLabel">Registered for Landmark Forum:</label>
            <br>
            <input type="radio" name="registeredForForum" value="Yes"> Yes
            <br>
            <input type="radio" name="registeredForForum" value="No"> No
        </p>
        <p>
            <label for='forumDate'>Date Registered for Forum:</label>
            <input type="date" name="forumDate">
            <label for="locationOfForum">Location of the Forum:</label>
            <input type="text" name="locationOfForum" class="mSize">
        </p>
        <p>
            <label for='adminCompletedForum'>Completed Forum:</label>
            <input type="checkbox" name="adminCompletedForum" value="1">
        </p>
        <h2>One Month follow up</h2>
        <p>
            <label for='adminOneMonFollowDate'>Date for One Month Follow Up:</label>
            <input type="date" name="adminOneMonFollowDate" value="">
        </p>
        <p>
            <label for='adminOneFollowupBy'>Followed up by:</label>
            <input type="text" name="adminOneFollowupBy" value="">
            <label for='adminOneFollowupDate'>Follow up Date:</label>
            <input type="date" name="adminOneFollowupDate" value="">
        </p>

        <h2>Six Month follow up</h2>
        <p>
            <label for='adminSixMonFollowDate'>Date for Six Month Follow Up:</label>
            <input type="date" name="adminSixMonFollowDate" value="">
        </p>
        <p>
            <label for='adminSixFollowupBy'>Followed up by:</label>
            <input type="text" name="adminSixFollowupBy" value="">
            <label for='adminSixFollowupDate'>Follow up Date:</label>
            <input type="date" name="adminSixFollowupDate" value="">
        </p>

        <input type="submit" value="Submit">
    </form>
    <script>
        $("#applyEntryForm").submit(function(e) {
            e.preventDefault();
            var $this = $(this);
            var formarray = $this.serializeArray();
            var jsform = {};
            for (var i = formarray.length; i--;) {
                formarray[i];
                jsform[formarray[i].name] = formarray[i].value;
            };
            $.ajax({
                    method: "POST",
                    crossDomain: true,
                    url: "https://node-svankirk.c9users.io:8080/application",
                    data: jsform
                })
                .done(function(msg) {
                    alert("response: " + msg);
                });


            // console.log($this.serializeArray());
            console.log(jsform);
        });
        // $this->response->setHeader('Access-Control-Allow-Origin', '*');
    </script>
</section>
<?php include( "footer.php"); ?>