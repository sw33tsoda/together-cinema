import React, { useState } from "react";
import Moment from "react-moment";

export default function MovieReview({data}) {
    const [hasExpanded,setHasExpanded] = useState(false);
    const contentMaxLength = 500;
    const handleImage = (url:string) => {
        if (url.indexOf('http') !== -1) return url.slice(1,url.length - 1);
        return 'http://image.tmdb.org/t/p/w185/' + url;
    }

    const handleContent = (content:string,maxLength) => {
        return (
            <p>
                {!hasExpanded ? `"${content.slice(0,maxLength)}${content.length > maxLength && '...'}"` : content}
                {content.length > maxLength && (
                    <span className="review__author-content__content__expand-btn" onClick={() => setHasExpanded(!hasExpanded)}>
                        <span>{hasExpanded ? 'Ẩn đi' : 'Xem hết'}</span>
                    </span>
                )}
            </p>
        );
    }

    return (
        <div className="review">
            <div className="review__author-profile">
                <div className="review__author-profile__image" style={{backgroundColor: data.author_details.avatar_path == null && 'orangered'}}>
                    {data.author_details.avatar_path !== null ? <img src={handleImage(data.author_details.avatar_path)}/> : data.author[0]}
                </div>
                <div className="review__author-profile__name">{data.author}<br/><span><Moment format="DD/MM/YYYY - h:mm:s A">{data.created_at}</Moment></span></div>
            </div>

            <div className="review__author-content">
                <div className="review__author-content__content">{handleContent(data.content,contentMaxLength)}</div>
            </div>
        </div>
    );
}