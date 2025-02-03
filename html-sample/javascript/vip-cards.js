 // Function to create VIP card items
        function createVipCardItems(vipOptions) {
            return vipOptions.map(option => `
                <li class="vip-tier-container">
                    <div class="vip-tier-header is-background-blue">
                        <div class="vip-tier-threshold">${option.description}</div>
                        <div class="vip-tier-name">${option.title}</div>
                    </div>
                    <div class="vip-tier-benefits">
                        <ul class="vip-tier-benefits-list">
                            ${option.benefits.map(benefit => `
                                <li class="vip-tier-benefits-list-item">${benefit.title}</li>
                            `).join('')}
                        </ul>
                    </div>
                </li>
            `).join('');
        }



        (async function() {
            try {
                const info = await window.myinfo;
                const data = info.data.settings;

                document.getElementById('vip_cards').innerHTML = 
                    createVipCardItems(data.vip_card.options);

            } catch (error) {
                console.error('Error fetching rewards:', error);
            }
        })();