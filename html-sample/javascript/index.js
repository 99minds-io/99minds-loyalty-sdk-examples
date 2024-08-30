
    // Simulated state: Change this to true if the user is logged in
    let isLogin = localStorage.getItem("isLogin") || false;

    // Select the buttons
    const earnButton = document.getElementById('earnButton');
    const redeemButton = document.getElementById('redeemButton');
    const logoutButton = document.getElementById('logout-button');

    if (isLogin) {
       document.getElementById('logout-container').style.display = "block"; 
       document.getElementById('loyalty_rewards').style.display = "block";
    }

    // Update the buttons based on the login state
    function updateButtons() {
        if (isLogin) {
            earnButton.textContent = "Earn Points";
            redeemButton.textContent = "Redeem Rewards";

            // Assign functions when logged in
            earnButton.onclick = scrollToEarn;
            redeemButton.onclick = scrollToRedeem;
            logoutButton.onclick = handleLogout;
        } else {
            earnButton.textContent = "Join Now";
            redeemButton.textContent = "Sign In";

            // Assign the sign-in function when not logged in
            earnButton.onclick = handleSignIn;
            redeemButton.onclick = handleSignIn;
        }
    }

    // Functions to simulate behavior
    function scrollToEarn() {
        var elmnt = document.getElementById('loyalty_ways_to_earn');
        elmnt.scrollIntoView({
              behavior: "smooth", 
              block: "start",
              inline: "nearest"
          });
    }

    function scrollToRedeem() {
        var elmnt = document.getElementById('loyalty_ways_to_redeem');
        elmnt.scrollIntoView({
              behavior: "smooth", 
              block: "start",
              inline: "nearest"
          });
    }

    function handleSignIn() {
        localStorage.setItem("isLogin", true);
        location.reload();
    }

    function handleLogout() {
         localStorage.clear();
         location.reload();
    }

    // Call the updateButtons function on page load
    updateButtons();
