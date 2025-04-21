document.addEventListener('DOMContentLoaded', function() {
    const levelFilter = document.getElementById('level-filter');
    const priceFilter = document.getElementById('price-filter');
    const courseCards = document.querySelectorAll('.course-card');
    
    function filterCourses() {
        const selectedLevel = levelFilter.value;
        const selectedPrice = priceFilter.value;
        
        courseCards.forEach(card => {
            const cardLevel = card.getAttribute('data-level');
            const cardPrice = parseInt(card.getAttribute('data-price'));
            
            let levelMatch = selectedLevel === 'all' || cardLevel === selectedLevel;
            let priceMatch = selectedPrice === 'all' || 
                (selectedPrice === '0-200' && cardPrice < 200) ||
                (selectedPrice === '200-300' && cardPrice >= 200 && cardPrice <= 300) ||
                (selectedPrice === '300+' && cardPrice > 300);
            
            if (levelMatch && priceMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    levelFilter.addEventListener('change', filterCourses);
    priceFilter.addEventListener('change', filterCourses);
});