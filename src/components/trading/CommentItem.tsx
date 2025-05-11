import { Heart, User } from "lucide-react";
import React from "react";
import { base64toUrl, formatAddress } from "../../utils";

function CommentItem({ creator, creatorInfo, time, content, likes, onLove, onReply }) {
    return (
        <div className="group p-4 rounded-lg transition-colors bg-slate-800">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-700/30">
                    {creatorInfo.image.buffer ? <img src={base64toUrl(creatorInfo.image.buffer, creatorInfo.image.mimetype)} className="w-full h-full" />
                        : <User className="w-10 h-10 text-gray-500" />}
                </div>
                <div className="flex-1 items-start">
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-300">
                            {`${creatorInfo.name} (${formatAddress(creator)})` || formatAddress(creator)}
                        </span>
                        <span className="text-slate-500 text-sm">{time}</span>
                        <div
                            onClick={onLove}
                            className="flex items-center gap-1 text-slate-500 hover:text-fuchsia-400 transition-colors cursor-pointer"
                        >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{likes}</span>
                        </div>
                        <button
                            onClick={onReply}
                            className="text-textPrimary hover:text-purple-500 text-sm transition-colors"
                        >
                            [reply]
                        </button>
                    </div>
                    <p className="text-slate-300 mt-2 text-left">{content}</p>
                </div>
            </div>
        </div>
    )
}


export default CommentItem;