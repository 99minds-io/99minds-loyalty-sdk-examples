document.addEventListener('DOMContentLoaded', () => {

// Function to create HTML for list items
function createListItem(options, iconSvg) {
  if(localStorage.getItem("isLogin")) {
    return options.map(option => `
        <li class="item-box">
            <div class="content icon">${iconSvg}</div>
            <div class="content">
                <div class="card-title">${option.title}</div>
                <div class="card-description">${option.description}</div>
            </div>
            <button class="${option.title == 'Sign Up' ? 'disabled' : 'loginbtn'}" disabled></button>
        </li>
    `).join('');
  } else {
    return options.map(option => `
        <li class="item-box">
            <div class="content icon">${iconSvg}</div>
            <div class="content">
                <div class="card-title">${option.title}</div>
                <div class="card-description">${option.description}</div>
            </div>
            <button class="trigger-modal" data-context="join" id="myBtn"></button>
        </li>
    `).join('');
  }
}

function createbirthdayListItem(options, iconSvg) {
    return `
        <li class="item-box">
            <div class="content icon">${iconSvg}</div>
            <div class="content">
                <div class="card-title">${options.title}</div>
                <div class="card-description">${options.description}</div>
            </div>
        </li>
    `;
}

(async function() {
    try {
        const info = await window.myinfo;
        const data = info.data.settings;

        const starIconSvg = `
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" 
                class="svg-inline--fa fa-star" role="img" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 576 512" style="color: rgb(77, 111, 177);">
                <path fill="currentColor" 
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 
                    145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 
                    46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 
                    316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
        `;
        const cakeIconSvg = `<svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-birthday-cake">

<path d="M4.965,0.975 C5.065,1.381 4.907,1.848 4.528,1.89 C4.174,1.93 3.903,1.473 4.175,1.02 C4.454,0.56 4.528,0.06 4.528,0.06 C4.528,0.06 4.848,0.487 4.965,0.975 L4.965,0.975 Z" class="si-glyph-fill">
</path>
<path d="M7.938,1.021 C8.043,1.447 7.877,1.939 7.469,1.983 C7.088,2.025 6.797,1.544 7.091,1.069 C7.391,0.584 7.469,0.059 7.469,0.059 C7.469,0.059 7.811,0.509 7.938,1.021 L7.938,1.021 Z" class="si-glyph-fill">
</path>
<path d="M11.974,1.023 C12.086,1.449 11.908,1.939 11.476,1.983 C11.072,2.025 10.762,1.545 11.075,1.07 C11.394,0.587 11.476,0.062 11.476,0.062 C11.476,0.062 11.839,0.512 11.974,1.023 L11.974,1.023 Z" class="si-glyph-fill">
</path>
<g transform="translate(2.000000, 6.000000)">
<path d="M1.146,2.437 C1.561,2.437 2.162,2.043 2.339,1.905 C2.344,1.899 3.066,1.221 3.941,1.221 C4.812,1.221 5.564,1.893 5.595,1.922 C5.757,2.062 6.293,2.437 6.769,2.437 C7.331,2.437 7.877,1.932 7.877,1.932 C7.917,1.894 8.664,1.221 9.565,1.221 C10.47,1.221 11.191,1.899 11.221,1.928 C11.382,2.066 11.685,2.269 11.958,2.37 C11.927,1.069 11.329,0.03 9.782,0.03 L2.259,0.03 C0.868,0.03 0.241,0.867 0.105,1.979 C0.33,2.146 0.793,2.437 1.146,2.437 L1.146,2.437 Z" class="si-glyph-fill">
</path>
<path d="M10.717,3.469 C10.699,3.453 10.16,2.95 9.566,2.95 C8.967,2.95 8.401,3.457 8.394,3.463 C8.368,3.486 7.643,4.163 6.77,4.163 C5.905,4.163 5.129,3.496 5.096,3.467 C4.933,3.321 4.414,2.95 3.942,2.95 C3.38,2.95 2.838,3.453 2.831,3.457 C2.716,3.549 1.899,4.163 1.147,4.163 C0.761,4.163 0.375,4.004 0.077,3.838 L0.077,5.945 L11.966,5.945 L11.966,4.131 C11.355,4.004 10.789,3.53 10.717,3.469 L10.717,3.469 Z" class="si-glyph-fill">
</path>
</g>
</svg>`

        //ways to earn
        document.getElementById('ways_to_earn').innerHTML = 
            createListItem(data.points_card.ways_to_earn.options, starIconSvg);

        // birthday celebration
        const newItem = document.createElement('li');
        newItem.className = 'item-box';

        var optionday = '';
        for(var i=1; i<=31; i++){
          optionday += '<option>'+i+'</option>';
        }
        var optionmonth = '';
        for(var i=1; i<=12; i++){
          optionmonth += '<option>'+i+'</option>';
        }
       
        if(localStorage.getItem("isLogin")) {
          newItem.innerHTML = `
            <div class="content icon">${cakeIconSvg}</div>
            <div class="content">
                <div class="card-title">${data.birthday_reward.title}</div>
                <div class="card-description">${data.birthday_reward.description}</div>
            </div>
            <button class="trigger-modal" data-context="birthday" id="myBtn"></button>
            
        `;
        } else {
          newItem.innerHTML = `
            <div class="content icon">${cakeIconSvg}</div>
            <div class="content">
                <div class="card-title">${data.birthday_reward.title}</div>
                <div class="card-description">${data.birthday_reward.description}</div>
            </div>
            <button class="trigger-modal" data-context="join" id="myBtn"></button>
            
        `;
        }
        
          document.getElementById('ways_to_earn').appendChild(newItem);

      // Social Media Rewards
      // Get social media rewards from data
    const socialMediaRewards = data.social_media_rewards; // Directly use the object

    // Iterate over entries of the socialMediaRewards object
    Object.entries(socialMediaRewards).forEach(([key, socialReward]) => {

      const getSocialURLs = (type, data) => {
      if(localStorage.getItem("isLogin")) {
        switch (type) {
          case "twitter_follow": {
            return `https://twitter.com/intent/follow?region=follow_link&screen_name=${data.unique_id}`;
          }
          case "twitter_share": {
            const shareContent = encodeURIComponent(data.share_content);
            return `https://twitter.com/intent/tweet?text=${shareContent}&via=${data.unique_id}`;
          }
          case "facebook_like": {
            return `https://www.facebook.com/${data.unique_id}`;
          }
          case "facebook_share": {
            const shareContent = encodeURIComponent(data.share_content);
            return `https://www.facebook.com/sharer/sharer.php?u=${data.unique_id}&quote=${shareContent}`;
          }
          case "instagram_like": {
            return `https://www.instagram.com/${data.unique_id}`;
          }
          case "youtube_subscribe": {
            return `https://www.youtube.com/${data.unique_id}?sub_confirmation=1`;
          }
          case "tiktok_follow": {
            return `https://www.tiktok.com/${data.unique_id}?`;
          }
          default:
            return;
        }
      } else {
        return '/login';
      }
    };
      
      if(typeof socialReward == "object") {
        const newSocialItem = document.createElement('li');
        newSocialItem.className = 'item-box';
        
        if(localStorage.getItem("isLogin")) {
        newSocialItem.innerHTML = `
            <div class="content icon">${starIconSvg}</div>
            <div class="content">
                <div class="card-title">${socialReward.title}</div>
                <div class="card-description">${socialReward.description}</div>
            </div>
            <button class="social_rewards" data-type="${key}" data-url="${getSocialURLs(key,socialReward)}"></button>
            <p class="error_message"></p>
        `;
        } else {
          newSocialItem.innerHTML = `
            <div class="content icon">${starIconSvg}</div>
            <div class="content">
                <div class="card-title">${socialReward.title}</div>
                <div class="card-description">${socialReward.description}</div>
            </div>
            <button class="trigger-modal" data-context="join" id="myBtn"></button>
            <p class="error_message"></p>
        `;  
        }
        
        // Append the list to the target element
        document.getElementById('ways_to_earn').append(newSocialItem);
      }
    });

    function showToast(message,type) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      if(type == "success") {
        toast.classList.add('success');
      }
      toast.innerText = message;
      document.body.appendChild(toast);
  
      // Show the toast
      toast.classList.add('show');
  
      // Hide the toast after 3 seconds
      setTimeout(() => {
          toast.classList.remove('show');
          document.body.removeChild(toast);
      }, 3000);
  }

      //document.addEventListener('DOMContentLoaded', () => {
        // Attach the event listener to a parent element, such as the document or a specific container
        document.addEventListener('click', async (event) => {
            // Check if the clicked element is a "Redeem" button
            if (event.target.classList.contains('social_rewards')) {
                // Get data properties from the clicked button
                const customerId = '7695268872432';
                const socialType = event.target.getAttribute('data-type');
                if(localStorage.getItem("isLogin")) {
                  try {
                      // Make the POST request to redeem points
                      const response = await sdk.resource.postSocialMediaRewards({
                          client_customer_id: customerId,
                          type: socialType // Convert amount to an integer
                      });
      
                      if (response.code == 200) {
                         window.open(event.target.getAttribute('data-url'));
                      } else {
                          showToast(response.message);
                          // Handle error in redemption (e.g., show an error message)
                          console.log('Failed to post social media reward. Please try again.');
                      }
                  } catch (error) {
                      // Handle any other errors
                      console.error('Error social media reward:', error);
                  }
                } else {
                  window.open(event.target.getAttribute('data-url'));
                }
            }

        });


   
       document.addEventListener('click', async function(event) {
         if (event.target.classList.contains('birthdate_save')) {
        // Ensure event.target is an Element node
        const targetElement = event.target instanceof Element ? event.target : event.target.parentElement;
    
        // Get the selected day and month values
        const selectedDay = document.querySelector('#birthday-day').value;
        const selectedMonth = document.querySelector('#birthday-month').value;
        const birthstr = `${selectedMonth}/${selectedDay}`;
    
        try {
            const response = await sdk.resource.postUpdateCustomer({
                client_customer_id: '7695268872432',
                customer: {
                    birthday_str: birthstr
                }
            });
    
            if (response.code == 200) {
                // Ensure closest is working by checking parentElement chain
              showToast(response.message,'success');
            } else {
                console.log('Failed to update birthdate. Please try again.');
            }
        } catch (error) {
            console.error('Error updating birthdate:', error);
        }
  
      }   
       });

  
    

    } catch (error) {
        console.error('Error fetching rewards:', error);
    }
})();

function openModal(headerContent, bodyContent, footerContent) {
    // Get the modal and its components
    const modal = document.getElementById("dynamicModal");
    const modalHeader = document.getElementById("modal-header");
    const modalBody = document.getElementById("modal-body");
    const modalFooter = document.getElementById("modal-footer");
    
    // Set the content for each section of the modal
    modalHeader.innerHTML = headerContent;
    modalBody.innerHTML = bodyContent;
    modalFooter.innerHTML = footerContent;
    
    // Display the modal
    modal.style.display = "block";
}

if(document.getElementById("dynamicModal")){
// Function to close the modal
function closeModal() {
    const modal = document.getElementById("dynamicModal");
    modal.style.display = "none";
}

// Event listener for closing the modal when clicking the close button
document.querySelector("#dynamicModal .close").onclick = closeModal;

// Event listener for closing the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("dynamicModal");
    if (event.target === modal) {
        closeModal();
    }
};
}
  
// Example of triggering the modal with different content
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('trigger-modal')) {
        const context = event.target.getAttribute('data-context');
        
        switch (context) {
            case 'birthday':
                openModal(
                    "<h3>Celebrate your birthday</h3>",
                    `
                    <div>
                      <label>Day</label>
                      <select id="birthday-day">${generateDayOptions()}</select>
                    </div>
                    <div>
                      <label>Month</label>
                      <select id="birthday-month">${generateMonthOptions()}</select>
                    </div>
                    `,
                    "<button class='birthdate_save button'>Save Date</button>"
                );
                break;
            
            case 'join':
                openModal(
                    "<h3>Join and Earn Rewards</h3>",
                    "<span>Earn points and turn these into rewards!</span>",
                    `<div><a href="/login" class="button">Start Earning</a></div><div><p>Already a member? <a href="/login">Sign in</a></p></div>`
                );
                break;
            
            // Add more cases as needed
            default:
                openModal("Default Title", "Default Body Content", "Default Footer Content");
                break;
        }
    }
});

// Utility functions to generate day and month options
function generateDayOptions() {
    let options = '';
    for (let i = 1; i <= 31; i++) {
        options += `<option>${i}</option>`;
    }
    return options;
}

function generateMonthOptions() {
    let options = '';
    for (let i = 1; i <= 12; i++) {
        options += `<option>${i}</option>`;
    }
    return options;
}

});