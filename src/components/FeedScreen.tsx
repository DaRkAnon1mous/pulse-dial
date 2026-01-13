import { useState } from 'react';
import { Heart, MessageCircle, User } from 'lucide-react';

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
  comments: number;
  liked: boolean;
}

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
    comments: 8,
    liked: false,
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
    comments: 5,
    liked: false,
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
    comments: 12,
    liked: false,
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
    comments: 9,
    liked: false,
  },
];

export function FeedScreen() {
  const [posts, setPosts] = useState<FeedPost[]>(mockPosts);

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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <p className="text-muted-foreground text-sm font-light">Learn from peers</p>
        <h1 className="text-2xl font-semibold text-foreground mt-1">Team Feed</h1>
      </div>

      {/* Feed Posts */}
      <div className="px-5 space-y-4">
        {posts.map((post) => (
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
              
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="font-light">{post.comments}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
