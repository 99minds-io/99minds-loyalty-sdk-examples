 // Function to create rewards
    function rewardsItems(rewardsOptions, iconSvg) {
        return rewardsOptions.map(option => `
            <li class="item-box">
                <div class="content icon">${iconSvg}</div>
                <div class="content">
                    <div class="card-title">${option.currency_symbol} ${option.value} OFF Coupon</div>
                    <div class="card-description">${option.formatted_expiration_date}</div>
                    <div>Use this discount code on your next order!</div>
                    <div class="copy_coupon"><span class="coupon-code">${option.code}</span> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" data-google-analytics-opt-out="" class="copy-icon">
                      <g id="Text-files">
                        <path d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228   C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999   c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64   h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002   C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228   c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999   c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z    M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699   c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946   c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999   h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"/>
                        <path d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005   c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997   C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"/>
                        <path d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986   c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016   C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"/>
                        <path d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997   s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997   S39.16465,29.4603004,38.6031494,29.4603004z"/>
                        <path d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997   s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997   S29.0059509,37.5872993,28.4444485,37.5872993z"/>
                      </g>
                      </svg>
                    </div>
                </div>
            </li>
        `).join('');
    }

    function pointsActivity(options) {
      return options.map(option => {
            const formattedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
                // hour: '2-digit',
                // minute: '2-digit',
                // second: '2-digit',
                // timeZoneName: 'short'
            }).format(new Date(option.transaction_date));
        return `
          <tr>
            <td>${option.transaction_type === "REDEMPTION" ? "Redeemed a Reward" : "Credit"}</td>
            <td>${option.transaction_type === "REDEMPTION" ? "-"+option.amount+" Points" : "+"+option.amount+" Points"}</td>
            <td>${formattedDate}</td>
          </tr>
      `;
      }).join('');
    }

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

    // Function to display point balance activity

    (async function() {
        try {
            const rewards = await sdk.resource.getRewards();
            const data = rewards.data;

            const pointsBalance = await window.pointsBalance;
            const pointsTransactions = await sdk.resource.getPointsTransactions();

            if(pointsTransactions.code == 200) {
              document.getElementById('activity_table').innerHTML = 
                pointsActivity(pointsTransactions.data.points_transactions);
            }

            if(pointsBalance.code == 200) {
              document.getElementById('customer_rewards').innerHTML = "Hi "+pointsBalance.data.customer.name+", you have "+pointsBalance.data.point_balance+" Points";
            }

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

            if(rewards.code == 200) {
              document.getElementById('my_rewards').innerHTML = 
                rewardsItems(data.rewards, starIconSvg);
            }

          // Select all copy icons for coupon codes
          const copyCoupons = document.querySelectorAll('.copy_coupon .copy-icon');
          
          if (copyCoupons) {
              document.addEventListener('click', async (event) => {
                  // Check if the clicked element is a copy icon
                  if (event.target.classList.contains('copy-icon')) {
                      
                      // Log the click for debugging
                      console.log('clicked');
          
                      // Get the closest coupon code container
                      const couponContainer = event.target.closest('.copy_coupon');
          
                      // Find the coupon code text within that container
                      const couponCode = couponContainer.querySelector('.coupon-code').textContent;
          
                      // Create a temporary input element to hold the text
                      const tempInput = document.createElement('input');
                      tempInput.value = couponCode;
                      document.body.appendChild(tempInput);
          
                      // Select the text inside the input element
                      tempInput.select();
                      tempInput.setSelectionRange(0, 99999); // For mobile devices
          
                      // Copy the text to the clipboard
                      document.execCommand('copy');
          
                      // Remove the temporary input element
                      document.body.removeChild(tempInput);
          
                      // Optionally, show a confirmation message
                    showToast('Coupon code copied to clipboard: '+couponCode,'success');
                      //alert('Coupon code copied to clipboard: ' + couponCode);
                  }
              });
          }


        } catch (error) {
            console.error('Error fetching rewards:', error);
        }
    })();