// Comments functionality
class CommentSystem {
    constructor() {
        this.comments = [];
        this.commentIdCounter = 1;
        this.init();
    }

    init() {
        this.commentInput = document.getElementById('commentInput');
        this.sendButton = document.getElementById('sendButton');
        this.commentsList = document.getElementById('commentsList');

        // Event listeners
        this.sendButton.addEventListener('click', () => this.addComment());
        this.commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addComment();
            }
        });

        // Load existing comments or add sample ones
        this.loadComments();
    }

    addComment() {
        const commentText = this.commentInput.value.trim();
        
        if (commentText === '') {
            alert('Please enter a comment');
            return;
        }

        const newComment = {
            id: this.commentIdCounter++,
            text: commentText,
            timestamp: new Date(),
            likes: 0,
            username: 'User' + Math.floor(Math.random() * 1000) // Random username for demo
        };

        this.comments.unshift(newComment); // Add to beginning of array
        this.commentInput.value = '';
        this.renderComments();
        this.saveComments();
    }

    deleteComment(commentId) {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
        this.renderComments();
        this.saveComments();
    }

    likeComment(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.likes++;
            this.renderComments();
            this.saveComments();
        }
    }

    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    renderComments() {
        this.commentsList.innerHTML = '';

        this.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.innerHTML = `
                <div class="comment-header">
                    <span class="comment-username">${comment.username}</span>
                    <span class="comment-time">${this.formatTime(comment.timestamp)}</span>
                    <button class="delete-btn" onclick="commentSystem.deleteComment(${comment.id})">×</button>
                </div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-actions">
                    <button class="like-btn" onclick="commentSystem.likeComment(${comment.id})">
                        👍 ${comment.likes}
                    </button>
                </div>
            `;
            this.commentsList.appendChild(commentElement);
        });
    }

    saveComments() {
        localStorage.setItem('comments', JSON.stringify(this.comments));
    }

    loadComments() {
        const savedComments = localStorage.getItem('comments');
        if (savedComments) {
            this.comments = JSON.parse(savedComments).map(comment => ({
                ...comment,
                timestamp: new Date(comment.timestamp)
            }));
            this.commentIdCounter = Math.max(...this.comments.map(c => c.id), 0) + 1;
        } else {
            // Add some sample comments
            this.addSampleComments();
        }
        this.renderComments();
    }

    addSampleComments() {
        const sampleComments = [
            { text: "Great video! Very helpful tips.", username: "FoodLover123" },
            { text: "Thanks for sharing this recipe!", username: "ChefMike" },
            { text: "Can't wait to try this at home 👨‍🍳", username: "CookingNewbie" }
        ];

        sampleComments.forEach((sample, index) => {
            const comment = {
                id: this.commentIdCounter++,
                text: sample.text,
                timestamp: new Date(Date.now() - (index + 1) * 300000), // 5 minutes apart
                likes: Math.floor(Math.random() * 10),
                username: sample.username
            };
            this.comments.push(comment);
        });
        this.saveComments();
    }
}

// Initialize the comment system when the page loads
let commentSystem;
document.addEventListener('DOMContentLoaded', () => {
    commentSystem = new CommentSystem();
});



// code.js
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('mainVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.querySelector('.progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const progressContainer = document.querySelector('.progress-container');
    
    // Play/Pause functionaliteit
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Update progress bar
    video.addEventListener('timeupdate', function() {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Update tijd display
        currentTimeEl.textContent = formatTime(video.currentTime);
    });
    
    // Set video duration
    video.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(video.duration);
    });
    
    // Klik op progress bar om te seeken
    progressContainer.addEventListener('click', function(e) {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });
    
    // Fullscreen functionaliteit
    fullscreenBtn.addEventListener('click', function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        }
    });
    
    // Hulp functie om tijd te formatteren
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
});