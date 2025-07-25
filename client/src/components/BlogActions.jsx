import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flag, MessageSquare, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LikeCount from '@/components/LikeCount';
import CommentCount from '@/components/CommentCount';

const BlogActions = ({ blogid }) => {
  const navigate = useNavigate();

  if (!blogid) return null; // prevent rendering if blogid is undefined
 console.log("Navigating to report page with blogId:", blogid);
  return (
    <div className="flex items-center gap-3">
    
      <Button
  variant="ghost"
  size="icon"
  title="Report blog"
  onClick={() => {
    console.log("Navigating to report page with blogId:", blogid);
    navigate(`/report/${blogid}`);
  }}
  className="group transition"
>
  <Flag className="text-black group-hover:text-red-600 transition-colors" />
</Button>

      {/* <Button
        variant="ghost"
        size="icon"
        title="Report blog"
        
        onClick={() => navigate(/report/${blogid})}
        className="group transition"
      >
        <Flag className="text-black group-hover:text-red-600 transition-colors" />
      </Button> */}
    </div>
  );
};

export default BlogActions;