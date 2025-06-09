// src/app/forum/page.js - Mobile-optimized business forum
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BusinessForum() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  // Mock forum data
  const categories = [
    { id: 'all', name: 'All Topics', count: 156, icon: '💬' },
    { id: 'funding', name: 'Funding & Loans', count: 42, icon: '💰' },
    { id: 'marketing', name: 'Marketing Tips', count: 38, icon: '📢' },
    { id: 'operations', name: 'Operations', count: 29, icon: '⚙️' },
    { id: 'success', name: 'Success Stories', count: 24, icon: '🏆' },
    { id: 'networking', name: 'Networking', count: 23, icon: '🤝' }
  ];

  const forumPosts = [
    {
      id: 1,
      title: 'How I increased my Visa credit score by 150 points',
      author: 'Maria G.',
      authorBusiness: 'Guatemala City Bakery',
      category: 'success',
      replies: 23,
      likes: 45,
      timeAgo: '2 hours ago',
      isPinned: true,
      preview: 'Started with a 580 credit score and now at 730! Here\'s exactly what I did...',
      tags: ['credit-score', 'visa', 'success-story']
    },
    {
      id: 2,
      title: 'Best mobile payment solutions for small restaurants?',
      author: 'Carlos R.',
      authorBusiness: 'Taco Corner',
      category: 'operations',
      replies: 18,
      likes: 32,
      timeAgo: '4 hours ago',
      isPinned: false,
      preview: 'Looking for recommendations on mobile payment systems that work well in Guatemala...',
      tags: ['payments', 'mobile', 'restaurant']
    },
    {
      id: 3,
      title: 'Free marketing strategies that actually work',
      author: 'Ana L.',
      authorBusiness: 'Handmade Crafts',
      category: 'marketing',
      replies: 31,
      likes: 67,
      timeAgo: '6 hours ago',
      isPinned: false,
      preview: 'Sharing 5 marketing tactics that cost me $0 but brought in 40% more customers...',
      tags: ['marketing', 'free', 'social-media']
    },
    {
      id: 4,
      title: 'Loan application rejected - what should I do next?',
      author: 'Pedro M.',
      authorBusiness: 'Auto Repair Shop',
      category: 'funding',
      replies: 15,
      likes: 28,
      timeAgo: '8 hours ago',
      isPinned: false,
      preview: 'Applied for a $5000 loan but got rejected. Credit score is 640. Any advice?',
      tags: ['loan', 'rejection', 'advice']
    },
    {
      id: 5,
      title: 'WhatsApp Business automation tips',
      author: 'Sofia V.',
      authorBusiness: 'Beauty Salon',
      category: 'operations',
      replies: 12,
      likes: 35,
      timeAgo: '12 hours ago',
      isPinned: false,
      preview: 'How I automated 80% of my customer service using WhatsApp Business tools...',
      tags: ['whatsapp', 'automation', 'customer-service']
    },
    {
      id: 6,
      title: 'Looking for business partners in Antigua',
      author: 'Roberto K.',
      authorBusiness: 'Tourism Services',
      category: 'networking',
      replies: 8,
      likes: 19,
      timeAgo: '1 day ago',
      isPinned: false,
      preview: 'Starting a new tourism venture and looking for local partners...',
      tags: ['partnership', 'antigua', 'tourism']
    }
  ];

  const featuredUsers = [
    { name: 'Elena R.', business: 'Coffee Shop', posts: 45, helpfulAnswers: 23, badge: 'Expert' },
    { name: 'Miguel S.', business: 'Tech Services', posts: 38, helpfulAnswers: 31, badge: 'Mentor' },
    { name: 'Lucia P.', business: 'Retail Store', posts: 29, helpfulAnswers: 18, badge: 'Helper' }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleNewPost = () => {
    // Simulate posting
    console.log('New post:', newPost);
    setShowNewPost(false);
    setNewPost({ title: '', content: '', category: 'general' });
    // In real app: API call to create post
  };

  const PostCard = ({ post }) => (
    <div className={`bg-white rounded-lg p-4 shadow-sm border ${post.isPinned ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}>
      {post.isPinned && (
        <div className="flex items-center mb-2">
          <svg className="w-4 h-4 text-blue-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
            <path fillRule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M8 11v6h4v-6H8z" />
          </svg>
          <span className="text-xs font-medium text-blue-600">Pinned</span>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight flex-1 mr-2">
          {post.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          categories.find(c => c.id === post.category)?.icon || '💬'
        }`}>
          {categories.find(c => c.id === post.category)?.icon}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.preview}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{post.replies}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{post.likes}</span>
          </div>
        </div>
        <span>{post.timeAgo}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-xs font-bold">{post.author[0]}</span>
          </div>
          <div>
            <div className="font-medium text-gray-900 text-xs">{post.author}</div>
            <div className="text-gray-500 text-xs">{post.authorBusiness}</div>
          </div>
        </div>
        
        <button className="text-blue-600 text-xs font-medium hover:text-blue-800">
          Join Discussion →
        </button>
      </div>
    </div>
  );

  const NewPostModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-4 z-50">
      <div className="bg-white rounded-t-xl sm:rounded-xl w-full sm:max-w-lg max-h-screen overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">New Discussion</h3>
            <button 
              onClick={() => setShowNewPost(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={newPost.category}
              onChange={(e) => setNewPost({...newPost, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.filter(c => c.id !== 'all').map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              placeholder="What's your question or topic?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              placeholder="Provide more details about your question..."
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleNewPost}
              disabled={!newPost.title.trim() || !newPost.content.trim()}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Post Discussion
            </button>
            <button
              onClick={() => setShowNewPost(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Business Community</h1>
              <p className="text-sm text-gray-600">Connect, learn, and grow together</p>
            </div>
            <button
              onClick={() => setShowNewPost(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              + New Post
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'discussions'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            💬 Discussions
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'members'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            👥 Members
          </button>
        </div>

        {activeTab === 'discussions' && (
          <>
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
                  <p className="text-gray-600 mb-4">Try changing your search or category filter</p>
                  <button
                    onClick={() => setShowNewPost(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    Start a Discussion
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Community Members</h2>
              <div className="space-y-4">
                {featuredUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">{user.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                        <div className="text-gray-500 text-xs">{user.business}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.badge === 'Expert' ? 'bg-purple-100 text-purple-800' :
                        user.badge === 'Mentor' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.badge}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {user.posts} posts • {user.helpfulAnswers} helpful
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
              <h3 className="text-lg font-semibold mb-2">Join Our Community</h3>
              <p className="text-blue-100 text-sm mb-4">
                Connect with fellow entrepreneurs, share experiences, and get help with your business challenges.
              </p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
                Create Account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button - Mobile */}
      <button
        onClick={() => setShowNewPost(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center sm:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* New Post Modal */}
      {showNewPost && <NewPostModal />}
    </div>
  );
}