// ===== CHAT AGENT / CHATBOT =====
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
const quickReplies = document.querySelectorAll('.quick-reply');
const chatNotification = document.querySelector('.chat-notification');

// Chat Agent Knowledge Base
const agentResponses = {
    greeting: [
        "Halo! Selamat datang di Tenun Nusantara. Ada yang bisa saya bantu?",
        "Hai! Senang bisa membantu Anda. Silakan tanyakan apa saja tentang produk tenun kami.",
        "Selamat datang! Saya Agent Tenun, siap membantu Anda menemukan baju tenun yang sempurna."
    ],
    produk: "Kami memiliki berbagai koleksi baju tenun dari seluruh Indonesia:\n\n1. **Blouse Tenun** - Cocok untuk casual & semi-formal (Rp 750rb - 950rb)\n2. **Dress Tenun** - Elegan untuk acara formal (Rp 1jt - 1.5jt)\n3. **Kemeja Tenun** - Untuk pria & wanita (Rp 650rb - 900rb)\n4. **Outer/Blazer Tenun** - Stylish untuk layering (Rp 1.2jt - 2jt)\n\nSemua produk kami 100% handmade oleh pengrajin lokal. Mau lihat kategori yang mana?",
    pemesanan: "Cara pemesanan di Tenun Nusantara sangat mudah:\n\n1. Pilih produk yang Anda suka\n2. Klik 'Tambah ke Keranjang'\n3. Isi data pengiriman\n4. Pilih metode pembayaran (Transfer Bank, E-wallet, COD)\n5. Konfirmasi pesanan\n\nPesanan akan diproses dalam 1-2 hari kerja. Untuk custom order, waktu produksi sekitar 7-14 hari.",
    ongkir: "Kabar baik! Kami menyediakan:\n\n- **GRATIS ongkir** ke seluruh Pulau Jawa untuk pembelian di atas Rp 500.000\n- Ongkir flat Rp 15.000 untuk Jawa (di bawah Rp 500rb)\n- Ongkir Rp 25.000 - 50.000 untuk luar Jawa\n- Pengiriman via JNE, J&T, dan SiCepat\n- Estimasi 2-4 hari (Jawa) dan 4-7 hari (luar Jawa)\n\nAda yang lain yang bisa saya bantu?",
    custom: "Tentu! Kami menerima custom order:\n\n- **Custom ukuran** - Sesuai ukuran tubuh Anda\n- **Custom motif** - Pilih motif dari daerah tertentu\n- **Custom warna** - Sesuaikan dengan preferensi Anda\n- **Custom desain** - Kolaborasi dengan desainer kami\n\nWaktu produksi custom order: 7-14 hari kerja\nMinimal order: 1 pcs\n\nSilakan hubungi kami via WhatsApp di +62 812 3456 7890 untuk diskusi custom order.",
    ukuran: "Panduan ukuran kami:\n\n- **S** : Lingkar dada 84-88cm, Panjang 60cm\n- **M** : Lingkar dada 88-92cm, Panjang 62cm\n- **L** : Lingkar dada 92-96cm, Panjang 64cm\n- **XL** : Lingkar dada 96-100cm, Panjang 66cm\n- **XXL** : Lingkar dada 100-104cm, Panjang 68cm\n\nJika ragu, kami sarankan ambil 1 size lebih besar. Atau Anda bisa custom ukuran sesuai tubuh!",
    bahan: "Bahan tenun kami menggunakan:\n\n- **Katun premium** - Lembut dan breathable\n- **Sutra alam** - Mewah dan mengkilap\n- **Tencel blend** - Modern dan anti kusut\n\nSemua pewarna yang digunakan adalah pewarna alami dari tumbuhan lokal (indigo, kunyit, mengkudu). Aman untuk kulit sensitif!",
    retur: "Kebijakan pengembalian kami:\n\n- Retur gratis dalam 7 hari setelah barang diterima\n- Produk harus dalam kondisi belum dipakai/dicuci\n- Tag masih terpasang\n- Tukar ukuran gratis (1x)\n- Refund diproses dalam 3-5 hari kerja\n\nHubungi customer service kami untuk proses retur.",
    promo: "Promo spesial bulan ini:\n\n- Diskon 20% untuk pembelian pertama (kode: TENUNFIRST)\n- Buy 2 Get 10% Off\n- Gratis pouch tenun untuk pembelian di atas Rp 1.500.000\n- Flash sale setiap Jumat jam 12.00!\n\nJangan lupa follow Instagram kami @tenunnusantara untuk info promo terbaru!",
    pembayaran: "Metode pembayaran yang kami terima:\n\n- Transfer Bank (BCA, BNI, BRI, Mandiri)\n- E-wallet (GoPay, OVO, DANA, ShopeePay)\n- Virtual Account\n- Kartu Kredit/Debit\n- COD (Cash on Delivery) - khusus Jabodetabek\n\nSemua transaksi dijamin aman dan terenkripsi.",
    default: "Terima kasih atas pertanyaannya! Untuk informasi lebih detail, Anda bisa:\n\n1. Chat langsung dengan tim kami via WhatsApp: +62 812 3456 7890\n2. Email: info@tenunnusantara.id\n3. Atau tanyakan hal lain kepada saya!\n\nSaya siap membantu Anda menemukan baju tenun yang sempurna."
};

// Keyword matching for intelligent responses
function getAgentResponse(message) {
    const msg = message.toLowerCase();

    if (msg.match(/\b(halo|hai|hi|hey|selamat|pagi|siang|sore|malam)\b/)) {
        const greetings = agentResponses.greeting;
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    if (msg.match(/\b(produk|koleksi|jual|barang|katalog|tersedia|ada apa)\b/)) {
        return agentResponses.produk;
    }
    if (msg.match(/\b(pesan|order|beli|cara|pemesanan|checkout)\b/)) {
        return agentResponses.pemesanan;
    }
    if (msg.match(/\b(ongkir|kirim|pengiriman|ekspedisi|gratis ongkir)\b/)) {
        return agentResponses.ongkir;
    }
    if (msg.match(/\b(custom|khusus|request|pesan khusus|bikin)\b/)) {
        return agentResponses.custom;
    }
    if (msg.match(/\b(ukuran|size|besar|kecil|pas|lingkar)\b/)) {
        return agentResponses.ukuran;
    }
    if (msg.match(/\b(bahan|kain|material|katun|sutra|kualitas)\b/)) {
        return agentResponses.bahan;
    }
    if (msg.match(/\b(retur|tukar|kembalikan|return|refund|garansi)\b/)) {
        return agentResponses.retur;
    }
    if (msg.match(/\b(promo|diskon|sale|murah|potongan|voucher|kode)\b/)) {
        return agentResponses.promo;
    }
    if (msg.match(/\b(bayar|pembayaran|transfer|ewallet|cod|kredit)\b/)) {
        return agentResponses.pembayaran;
    }
    if (msg.match(/\b(terima kasih|makasih|thanks|thank you)\b/)) {
        return "Sama-sama! Senang bisa membantu Anda. Jangan ragu untuk bertanya lagi ya. Selamat berbelanja di Tenun Nusantara! 😊";
    }

    return agentResponses.default;
}

// Format message text (support basic markdown-like formatting)
function formatMessage(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    if (sender === 'agent') {
        messageDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-headset"></i></div>
            <div class="message-content">
                <p>${formatMessage(text)}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-user"></i></div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message agent typing-msg';
    typingDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-headset"></i></div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

// Send message handler
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Show typing then respond
    const typingEl = showTyping();
    const delay = Math.random() * 1000 + 800; // 0.8 - 1.8s delay

    setTimeout(() => {
        typingEl.remove();
        const response = getAgentResponse(message);
        addMessage(response, 'agent');
    }, delay);
}

// Event Listeners
chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('active');
    chatNotification.style.display = 'none';
});

chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
});

chatSend.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Quick replies
quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
        const message = btn.dataset.message;
        chatInput.value = message;
        sendMessage();
    });
});

// ===== PRODUCT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ADD TO CART (Demo) =====
const addToCartBtns = document.querySelectorAll('.btn-add-cart');
const cartCount = document.querySelector('.cart-count');
let cartItems = 0;

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cartItems++;
        cartCount.textContent = cartItems;

        // Button animation
        btn.textContent = 'Ditambahkan!';
        btn.style.background = '#2ecc71';

        setTimeout(() => {
            btn.textContent = 'Tambah ke Keranjang';
            btn.style.background = '';
        }, 1500);
    });
});

// ===== CONTACT FORM =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera merespons.');
        contactForm.reset();
    });
}

// ===== AUTO OPEN CHAT AFTER 5 SECONDS =====
setTimeout(() => {
    if (!chatBox.classList.contains('active')) {
        chatNotification.style.display = 'flex';
    }
}, 5000);
