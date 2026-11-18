// AI Team Premium — Blog Functionality
// Handles post rendering, filtering, and pagination

const POSTS_PER_PAGE = 12;
let currentPage = 1;
let currentFilter = 'all';
let filteredPosts = [...blogPosts];

function renderPosts(page = 1, filter = 'all') {
    const grid = document.getElementById('posts-grid');
    if (!grid) return;

    // Filter
    if (filter === 'all') {
        filteredPosts = [...blogPosts];
    } else {
        filteredPosts = blogPosts.filter(p => p.pillar === parseInt(filter));
    }

    // Paginate
    const start = 0;
    const end = page * POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(start, end);
    const hasMore = end < filteredPosts.length;

    // Render
    grid.innerHTML = '';
    postsToShow.forEach(post => {
        const card = createPostCard(post);
        grid.appendChild(card);
    });

    // Show/hide load more
    const loadBtn = document.getElementById('load-more-btn');
    if (loadBtn) {
        loadBtn.style.display = hasMore ? 'inline-block' : 'none';
    }
}

function createPostCard(post) {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.setAttribute('data-pillar', post.pillar);

    // Gradient class for image
    const gradNum = (parseInt(post.id.replace('AITP-', '')) % 10) + 1;

    card.innerHTML = `
        <div class="post-card-image gradient-${gradNum}" style="background-image: url('/blog/images/${post.image}');">
            <span class="category-tag" style="background: ${categories[post.pillar]?.color || '#6366f1'}; color: white;">
                ${categories[post.pillar]?.name || 'AI'}
            </span>
            ${post.conversion ? '<span class="conversion-badge">🔥 Special Offer</span>' : ''}
        </div>
        <div class="post-card-body">
            <h3><a href="/blog/${getSlugPrefix(post.pillar)}/${post.slug}/">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <div class="post-card-footer">
                <span>${formatDate(post.date)}</span>
                <span>${post.readTime} min read</span>
            </div>
        </div>
    `;

    return card;
}

function getSlugPrefix(pillar) {
    const prefixes = {
        1: 'beginner',
        2: 'chatgpt',
        3: 'comparisons',
        4: 'prompts',
        5: 'freelancing',
        6: 'students',
        7: 'business',
        8: 'image-video',
        9: 'advanced',
        10: 'productivity'
    };
    return prefixes[pillar] || 'ai';
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Filter buttons
document.querySelectorAll('.cat-filter').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.cat-filter').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.cat;
        currentPage = 1;
        renderPosts(currentPage, currentFilter);
    });
});

// Load more
const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        renderPosts(currentPage, currentFilter);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts(1, 'all');
});