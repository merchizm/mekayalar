// Bionik Okuyucu ve Çevrimdışı Kaydetme özellikleri
document.addEventListener('DOMContentLoaded', function() {
    // Bionik Okuyucu fonksiyonu
    const bionicReaderBtn = document.getElementById('bionicReaderBtn');
    
    if (bionicReaderBtn) {
        bionicReaderBtn.addEventListener('click', function() {
            // Makale içeriğini seç
            const articleContent = document.querySelector('article');
            
            if (articleContent) {
                // Bionik okuma için sınıf ekle/çıkar
                if (articleContent.classList.contains('bionic-reading')) {
                    articleContent.classList.remove('bionic-reading');
                    bionicReaderBtn.classList.remove('bg-menu-active');
                    bionicReaderBtn.classList.remove('dark:bg-menu-active-dark');
                    
                    // Orijinal içeriği geri yükle
                    const paragraphs = articleContent.querySelectorAll('[data-original]');
                    paragraphs.forEach(function(paragraph) {
                        if (paragraph.dataset.original) {
                            paragraph.innerHTML = paragraph.dataset.original;
                            delete paragraph.dataset.original;
                        }
                    });
                } else {
                    articleContent.classList.add('bionic-reading');
                    bionicReaderBtn.classList.add('bg-menu-active');
                    bionicReaderBtn.classList.add('dark:bg-menu-active-dark');
                    
                    // Bionik okuma uygulanması
                    applyBionicReading(articleContent);
                }
            }
        });
    }
    
    // Çevrimdışı Kaydetme fonksiyonu
    const saveOfflineBtn = document.getElementById('saveOfflineBtn');
    
    if (saveOfflineBtn) {
        saveOfflineBtn.addEventListener('click', function() {
            const article = document.querySelector('article');
            const title = document.querySelector('h1')?.innerText || 'Makale';
            
            if (article) {
                try {
                    // HTML içeriğini al
                    const content = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>${title}</title>
                        <style>
                            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
                            h1 { font-size: 2em; margin-bottom: 0.5em; }
                            img { max-width: 100%; height: auto; }
                            pre { background: #f5f5f5; padding: 1em; overflow: auto; border-radius: 4px; }
                            code { font-family: monospace; }
                            a { color: #0066cc; }
                        </style>
                    </head>
                    <body>
                        <h1>${title}</h1>
                        ${article.innerHTML}
                        <p><em>Bu makale <a href="${window.location.href}">${window.location.href}</a> adresinden kaydedilmiştir.</em></p>
                    </body>
                    </html>
                    `;
                    
                    // Veriyi blob olarak oluştur
                    const blob = new Blob([content], { type: 'text/html' });
                    
                    // İndirmek için link oluştur
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
                    a.style.display = 'none';
                    
                    // Linki ekle ve tıkla
                    document.body.appendChild(a);
                    a.click();
                    
                    // Temizlik
                    setTimeout(() => {
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }, 100);
                    
                    // Geri bildirim 
                    const notification = document.createElement('div');
                    notification.textContent = 'Makale başarıyla kaydedildi';
                    notification.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #48bb78; color: white; padding: 10px 20px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 9999; transition: opacity 0.5s;';
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.opacity = 0;
                        setTimeout(() => document.body.removeChild(notification), 500);
                    }, 3000);
                    
                } catch (error) {
                    console.error('Kaydetme hatası:', error);
                    alert('Makale kaydedilirken bir hata oluştu.');
                }
            } else {
                // Makale bulunamadıysa
                alert('Kaydetmek için bir makale bulunamadı. Bu özellik sadece makale sayfalarında çalışır.');
            }
        });
    }
    
    // Bionik Reading uygulama fonksiyonu
    function applyBionicReading(element) {
        const textContainers = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, a, span');
        
        textContainers.forEach(container => {
            if (!container.dataset.original) {
                container.dataset.original = container.innerHTML;
                processNode(container);
            }
        });
    }
    
    // Düğüm işleme
    function processNode(node) {
        const childNodes = Array.from(node.childNodes);
        
        childNodes.forEach(child => {
            // Eğer text düğümüyse
            if (child.nodeType === 3 && child.textContent.trim()) {
                const span = document.createElement('span');
                span.innerHTML = bionicifyText(child.textContent);
                node.replaceChild(span, child);
            } 
            // Eğer element düğümüyse ve içi birleşik değilse
            else if (child.nodeType === 1 && !isInlineElement(child) && child.childNodes.length > 0) {
                processNode(child);
            }
        });
    }
    
    // Inline elementleri kontrol et
    function isInlineElement(element) {
        const inlineElements = ['b', 'strong', 'i', 'em', 'mark', 'small', 'del', 'ins', 'sub', 'sup', 'code'];
        return inlineElements.includes(element.tagName.toLowerCase());
    }
    
    // Metni bionik hale getirme
    function bionicifyText(text) {
        return text.split(' ').map(word => {
            if (word.length <= 1) return word;
            
            // HTML etiketleri içeriyorsa işleme
            if (word.indexOf('<') >= 0 || word.indexOf('>') >= 0) return word;
            
            const mid = Math.ceil(word.length / 2);
            return `<b>${word.substring(0, mid)}</b>${word.substring(mid)}`;
        }).join(' ');
    }
    
    // Yardımcı fonksiyon - bir element içindeki tüm metin düğümlerini bulur
    function getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        return textNodes;
    }
}); 