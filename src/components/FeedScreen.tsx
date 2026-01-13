import { useState } from 'react';
import { Heart, MessageCircle, User, Plus, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { ComposePostModal, NewPost } from './ComposePostModal';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  timestamp: Date;
}

interface FeedPost {
  id: string;
  author: string;
  role: string;
  title: string;
  situation: string;
  handling: string;
  learning: string;
  outcome: 'Converted' | 'Rescheduled' | 'Lost';
  likes: number;
  liked: boolean;
  comments: Comment[];
}

const mockComments: Record<string, Comment[]> = {
  '1': [
    { id: 'c1', author: 'Priya Kapoor', role: 'BD Lead', text: 'Great approach! I will try this next time.', timestamp: new Date(Date.now() - 3600000) },
    { id: 'c2', author: 'Rahul Sharma', role: 'BD Executive', text: 'The 24/7 support angle is really effective.', timestamp: new Date(Date.now() - 7200000) },
  ],
  '2': [
    { id: 'c3', author: 'Neha Gupta', role: 'Senior BD', text: 'Timing is everything. Smart move!', timestamp: new Date(Date.now() - 1800000) },
  ],
  '3': [
    { id: 'c4', author: 'Arjun Mehta', role: 'Senior BD', text: 'Discovery questions are key. Thanks for sharing this learning.', timestamp: new Date(Date.now() - 5400000) },
    { id: 'c5', author: 'Priya Kapoor', role: 'BD Lead', text: 'We have all been there. Great that you reflected on it.', timestamp: new Date(Date.now() - 9000000) },
  ],
  '4': [
    { id: 'c6', author: 'Rahul Sharma', role: 'BD Executive', text: 'Do you have the case study link? Would love to use it.', timestamp: new Date(Date.now() - 2700000) },
  ],
};

const mockPosts: FeedPost[] = [
  {
    id: '1',
    author: 'Arjun Mehta',
    role: 'Senior BD',
    title: 'How I handled a pricing objection from a CTO',
    situation: 'The CTO was comparing us directly to a cheaper competitor and seemed ready to end the call.',
    handling: 'Instead of defending our price, I asked what specific features they needed most. Turns out they wanted 24/7 support, which the competitor did not offer.',
    learning: 'Leading with value over price changed the conversation completely. The CTO scheduled a demo on the spot.',
    outcome: 'Converted',
    likes: 24,
    liked: false,
    comments: mockComments['1'] || [],
  },
  {
    id: '2',
    author: 'Priya Kapoor',
    role: 'BD Lead',
    title: 'When silence became my best tool',
    situation: 'A prospect kept interrupting me during the pitch, clearly distracted and rushed.',
    handling: 'I paused completely and asked if this was a good time. They admitted they had a meeting in 5 minutes.',
    learning: 'We rescheduled for the next day. The follow-up call was 30 minutes of focused conversation.',
    outcome: 'Rescheduled',
    likes: 18,
    liked: false,
    comments: mockComments['2'] || [],
  },
  {
    id: '3',
    author: 'Rahul Sharma',
    role: 'BD Executive',
    title: 'Learning from a lost deal with a startup founder',
    situation: 'Spent 45 minutes with a founder who seemed very interested, asked detailed questions.',
    handling: 'I got excited and talked too much about features instead of asking about their specific pain points.',
    learning: 'They went with a competitor who understood their problem better. Now I always start with discovery questions.',
    outcome: 'Lost',
    likes: 31,
    liked: false,
    comments: mockComments['3'] || [],
  },
  {
    id: '4',
    author: 'Neha Gupta',
    role: 'Senior BD',
    title: 'Using case studies to overcome hesitation',
    situation: 'Prospect was hesitant about switching from their current provider of 3 years.',
    handling: 'I shared a case study of a similar company that made the switch and saw 40% efficiency gains.',
    learning: 'Real numbers from similar companies build trust faster than feature lists.',
    outcome: 'Converted',
    likes: 27,
    liked: false,
    comments: mockComments['4'] || [],
  },
];

export function FeedScreen() {
  const [posts, setPosts] = useState<FeedPost[]>(mockPosts);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  const handleCommentInputChange = (postId: string, value: string) => {
    setCommentInputs(prev => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text || text.length === 0) return;
    if (text.length > 280) {
      toast({
        title: 'Comment too long',
        description: 'Comments must be 280 characters or less.',
        variant: 'destructive',
      });
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      role: 'BD Executive',
      text,
      timestamp: new Date(),
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    
    // Ensure comments are expanded after adding
    setExpandedComments(prev => {
      const next = new Set(prev);
      next.add(postId);
      return next;
    });
  };

  const handleNewPost = (newPost: NewPost) => {
    const post: FeedPost = {
      id: Date.now().toString(),
      author: 'You',
      role: 'BD Executive',
      title: newPost.title,
      situation: newPost.situation,
      handling: newPost.handling,
      learning: newPost.learning,
      outcome: newPost.outcome,
      likes: 0,
      liked: false,
      comments: [],
    };
    setPosts(prev => [post, ...prev]);
    toast({
      title: 'Post shared!',
      description: 'Your experience has been shared with the team.',
    });
  };

  const getOutcomeStyles = (outcome: FeedPost['outcome']) => {
    switch (outcome) {
      case 'Converted':
        return 'bg-primary/10 text-primary';
      case 'Rescheduled':
        return 'bg-ai-hint/10 text-ai-hint';
      case 'Lost':
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-end justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-light">Learn from peers</p>
          <h1 className="text-2xl font-semibold text-foreground mt-1">Team Feed</h1>
        </div>
        <button
          onClick={() => setIsComposeOpen(true)}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Feed Posts */}
      <div className="px-5 space-y-4">
        {posts.map((post) => {
          const isExpanded = expandedComments.has(post.id);
          const commentCount = post.comments.length;
          
          return (
            <article 
              key={post.id}
              className="bg-card rounded-2xl p-5 border border-border/50"
            >
              {/* Author Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{post.author}</p>
                  <p className="text-xs text-muted-foreground font-light">{post.role}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getOutcomeStyles(post.outcome)}`}>
                  {post.outcome}
                </span>
              </div>

              {/* Post Title */}
              <h3 className="font-medium text-foreground mb-3 leading-snug">
                {post.title}
              </h3>

              {/* Post Content */}
              <div className="space-y-3 text-sm text-muted-foreground font-light leading-relaxed">
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">Situation</p>
                  <p>{post.situation}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">How I handled it</p>
                  <p>{post.handling}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">Learning</p>
                  <p>{post.learning}</p>
                </div>
              </div>

              {/* Engagement Actions */}
              <div className="flex items-center gap-6 mt-5 pt-4 border-t border-border/50">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    post.liked 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.liked ? 'fill-primary' : ''}`} />
                  <span className="font-light">{post.likes}</span>
                </button>
                
                <button 
                  onClick={() => toggleComments(post.id)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isExpanded 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <MessageCircle className={`w-4 h-4 ${isExpanded ? 'fill-primary/20' : ''}`} />
                  <span className="font-light">{commentCount}</span>
                  {commentCount > 0 && (
                    isExpanded 
                      ? <ChevronUp className="w-3 h-3" /> 
                      : <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Comments Section */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                  {/* Existing Comments */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-muted/70 flex items-center justify-center flex-shrink-0">
                            <User className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs font-medium text-foreground">{comment.author}</span>
                              <span className="text-xs text-muted-foreground/60">{formatTimeAgo(comment.timestamp)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground font-light mt-0.5 leading-relaxed">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment Input */}
                  <div className="flex gap-2 items-center pt-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Add a comment..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddComment(post.id);
                          }
                        }}
                        maxLength={280}
                        className="bg-muted/30 border-border/50 pr-10 text-sm h-9"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-primary disabled:text-muted-foreground/40 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Compose Modal */}
      <ComposePostModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSubmit={handleNewPost}
      />
    </div>
  );
}
