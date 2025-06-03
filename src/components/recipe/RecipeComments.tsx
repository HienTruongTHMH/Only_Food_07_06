"use client";

import { useState } from "react";
import { Heart, MessageCircle, MoreHorizontal, User } from "lucide-react";

interface Comment {
  id: string;
  username: string;
  timeAgo: string;
  content: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

const initialComments: Comment[] = [
  {
    id: "1",
    username: "Don Tri",
    timeAgo: "10min ago",
    content:
      "Bánh ngon kinh khủng. Làm đi với chưa rõi 30 phút làm xong cái bánh. Quá là ok.",
    likes: 2,
    replies: 0,
    isLiked: false,
  },
  {
    id: "2",
    username: "Adududuuu",
    timeAgo: "18min ago",
    content: "Ngon thật ko dzậy bà.",
    likes: 0,
    replies: 2,
    isLiked: false,
  },
  {
    id: "3",
    username: "Hiền đầu bếp",
    timeAgo: "20min ago",
    content: "Ngon thật đó cùng thức của tao mà.",
    likes: 0,
    replies: 2,
    isLiked: false,
  },
  {
    id: "4",
    username: "Long Tomorrow",
    timeAgo: "52min ago",
    content: "Đã thử và làng 10kg. Chế rất yêu.",
    likes: 0,
    replies: 2,
    isLiked: false,
  },
  {
    id: "5",
    username: "Viethandsome",
    timeAgo: "1 hour ago",
    content: "Đang Việt đẹp trai nhất team.",
    likes: 0,
    replies: 2,
    isLiked: false,
  },
];

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showMore, setShowMore] = useState(false);

  const handleLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const displayedComments = showMore ? comments : comments.slice(0, 5);

  return (
    <div className="w-full bg-white mt-8 rounded-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Comments <span className="text-gray-500">(25)</span>
        </h2>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {displayedComments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
            </div>

            {/* Comment Content */}
            <div className="flex-1 min-w-0">
              {/* Username and Time */}
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 text-sm">
                  {comment.username}
                </span>
                <span className="text-gray-500 text-xs">{comment.timeAgo}</span>
              </div>

              {/* Comment Text */}
              <p className="text-gray-800 text-sm mb-3 leading-relaxed">
                {comment.content}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                {/* Reply Button */}
                <button className="h-auto p-0 text-gray-500 hover:text-gray-700 font-normal flex flex-row items-center gap-1">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">
                    Reply {comment.replies > 0 && `(${comment.replies})`}
                  </span>
                </button>

                {/* Like Button */}
                <button
                  className={`h-auto p-0 font-normal flex flex-row items-center gap-1 ${
                    comment.isLiked
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => handleLike(comment.id)}
                >
                  <Heart
                    className={`w-4 h-4 mr-1 ${
                      comment.isLiked ? "fill-current" : ""
                    }`}
                  />
                  <span className="text-xs">
                    {comment.likes > 0 ? comment.likes : ""}
                  </span>
                </button>

                {/* More Button */}
                <button className="h-auto p-0 text-gray-500 hover:text-gray-700 font-normal flex flex-row items-center gap-1">
                  <MoreHorizontal className="w-4 h-4 mr-1" />
                  <span className="text-xs">More</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {!showMore && comments.length > 5 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowMore(true)}
            className="px-6 py-2 text-sm"
          >
            Load 25 more comments
          </button>
        </div>
      )}
    </div>
  );
}
