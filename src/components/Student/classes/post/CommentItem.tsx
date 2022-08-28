import { relativeDate } from "../../../../utils/date"

export interface ICommentItem {
  id: string
  author: string
  avatar_url?: string
  created_at: string
  text: string
}

export const CommentItem = (props: ICommentItem) => {
  return (
    <div className="d-flex mt-3">
      <div
        className="rounded-circle mr-3"
        style={{ width: "32px", height: "32px", overflow: "hidden" }}
      >
        <img
          src={props.avatar_url || "/assets/images/blank-profile.png"}
          alt={props.author}
        />
      </div>
      <div>
        <h5 style={{ color: "#3c4043", fontWeight: 600 }}>
          {props.author}
          <span> &bull; </span>
          <small>{relativeDate(props.created_at)}</small>
        </h5>
        <div className="mt-1" style={{ fontSize: ".9rem" }}>
          {props.text}
        </div>
      </div>
      <div className="ml-auto d-none">Remove</div>
    </div>
  )
}
